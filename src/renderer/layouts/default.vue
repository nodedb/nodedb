<template lang="pug">
  el-container.default-layout
    el-header.icon-bar( :height="iconBar + 'px'" )
      el-button(
        type="text"
        @click="newConnection"
      )
        i.fa.fa-plug.fa-lg

    el-header.tab-bar( :height="tabBarHeight + 'px'" )
      el-tabs(
        v-model="activeTab",
        :closable="true",
        type="card",
        @tab-click="changeTab",
        @tab-remove="removeTab"
      )
        el-tab-pane(
          v-for="item in tabs",
          :key="item.id",
          :label="$t(item.name)",
          :name="item.id"
        )

    el-container.body-wrapper
      my-sidebar(
        :defaultWidth="sidebarWidthDefault",
        :max="sidebarMax",
        :min="sidebarMin",
        resizable,
        v-model="sidebarWidthCurrent"
      )
        router-view(
          slot="content"
          name="sidebar"
        )

      el-container
        el-main
          router-view(
            v-show="tabs.length > 0"
            name="default"
          )
        el-footer( :height="footerHeight + 'px'" ) @todo
</template>

<script>
  /**
   * default
   */

  /* Node modules */

  /* Third-party modules */
  import Mousetrap from 'mousetrap';
  import Vue from 'vue';
  import { mapState } from 'vuex';

  /* Files */
  import draggable from 'vuedraggable';
  import mySidebar from '../components/sidebar';
  import pkg from '../../../package.json';

  export default Vue.extend({
    name: 'default',

    components: {
      draggable,
      mySidebar,
    },

    computed: {
      sidebarWidthCurrent: vm => vm.$store.state.app.sidebarWidth,
      tabs: {
        get: vm => vm.$store.state.tabs.tabs,
        set(value) {
          this.$store.commit('tabs/update', value);
        },
      },

      ...mapState({
        sidebarWidth: state => state.app.sidebarWidth,
      }),
    },

    created() {
      this.fetchData();

      this.$electron.ipcRenderer
        .on('new-db-connection', () => this.newConnection());

      Mousetrap.bind(['command+w', 'ctrl+w'], () => this.closeActiveTab());
      Mousetrap.bind(['command+tab', 'ctrl+tab'], () => this.cycleTabs());
      Mousetrap.bind(['command+shift+tab', 'ctrl+shift+tab'], () => this.cycleTabs(false));
    },

    data() {
      return {
        activeTab: '',
        drag: false,
        footerHeight: 30,
        iconBar: 40,
        sidebarMin: 100,
        sidebarMax: 500,
        sidebarResizeWidth: 5,
        sidebarWidthDefault: 300,
        tabBarHeight: 40,
      };
    },

    methods: {
      addTab(route, name, data = {}) {
        const tab = {
          name,
          route,
          data,
        };

        return this.$store.dispatch('tabs/add', tab)
          .then((tabId) => {
            this.activeTab = tabId;

            return this.changeTab();
          })
          .catch(err => this.showError(err));
      },

      changeTab() {
        return this.$store.dispatch('tabs/findById', this.activeTab)
          .then(({ tab } = {}) => {
            this.$router.push({
              name: tab.route,
              params: {
                tabId: this.activeTab,
              },
            });

            this.changeTitle(tab.name);
          })
          .catch(err => this.showError(err));
      },

      changeTitle(title = null) {
        const appTitle = pkg.productName || pkg.name;
        const tabTitle = title ? this.$i18n.t(title) : null;

        document.title = tabTitle ? `${appTitle} - ${tabTitle}` : appTitle;
      },

      closeActiveTab() {
        return this.removeTab(this.activeTab, false);
      },

      cycleTabs(forwards = true) {
        return this.$store.dispatch('tabs/findById', this.activeTab)
          .then(({ index }) => {
            let nextIndex = forwards ? index + 1 : index - 1;
            const highestIndex = this.tabs.length - 1;

            if (nextIndex < 0) {
              /* Go to end */
              nextIndex = highestIndex;
            } else if (nextIndex > highestIndex) {
              /* Go to start */
              nextIndex = 0;
            }

            return this.selectTab(nextIndex);
          })
          .catch(err => this.showError(err));
      },

      fetchData() {
        this.activeTab = this.$route.params.tabId;
      },

      newConnection() {
        return this.addTab('login', 'tabs:LOGIN');
      },

      removeTab(tabId, displayError = true) {
        return this.$store.dispatch('tabs/findById', tabId)
          .then(({ index, tab }) => {
            if (index === -1) {
              return Promise.reject(new Error('UNKNOWN_TAB'));
            }

            return Promise.resolve()
              .then(() => {
                if (tab.route !== 'query') {
                  return undefined;
                }

                return this.$confirm(
                  this.$i18n.t('connections:DISCONNECT_BODY', { name: tab.name }),
                  this.$i18n.t('connections:DISCONNECT_TITLE'),
                  {
                    confirmButtonText: this.$i18n.t('buttons:OK'),
                    cancelButtonText: this.$i18n.t('buttons:CANCEL'),
                    type: 'warning',
                  },
                );
              })
              .then(() => this.$store.dispatch('tabs/remove', tabId))
              .then(() => {
                if (this.activeTab !== tabId) {
                  /* Deleted tab not currently active - do nothing */
                  return undefined;
                } else if (this.tabs.length === 0) {
                  /* Deleted tab not currently active - change title */
                  return this.changeTitle();
                }

                index -= 1;
                if (index < 0) {
                  index = 0;
                }

                const newTab = this.tabs[index];

                this.activeTab = newTab.id;

                return this.changeTab();
              });
          })
          .catch((err) => {
            if (err === 'cancel') {
              /* The confirm was cancelled - it's fine */
              return;
            }

            if (displayError) {
              this.showError(err);
            }
          });
      },

      selectTab(index) {
        this.activeTab = this.tabs[index].id;

        return this.changeTab();
      },

      showError(err) {
        this.$log('error', 'DEFAULT_PAGE_GENERAL_ERROR', {
          err,
        });

        const code = err.message || err;

        this.$message({
          duration: 0,
          message: this.$i18n.t(`error:${code}`),
          showClose: true,
          type: 'error',
        });
      },
    },

    watch: {
      $route: 'fetchData',

      sidebarWidth(width) {
        this.sidebarWidthCurrent = width;
      },

      sidebarWidthCurrent(width) {
        return this.$store.dispatch('app/sidebarWidth', width);
      },

      tabs(newTabs, oldTabs) {
        const newTabsLength = newTabs.length;
        const oldTabsLength = oldTabs.length;

        if (newTabsLength > oldTabsLength) {
          /* Add new listener */
          for (let i = oldTabsLength; i < newTabsLength; i += 1) {
            const keyPress = `alt+${i + 1}`;

            Mousetrap.bind(keyPress, () => this.selectTab(i));
          }
        } else {
          /* Remove listener */
          Mousetrap.unbind(`alt+${oldTabsLength}`);
        }
      },
    },
  });
</script>

<style lang="scss">
</style>
