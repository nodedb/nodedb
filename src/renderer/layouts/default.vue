<template lang="pug">
  el-container.default-layout
    el-header.icon-bar( :height="iconBar + 'px'" ) icon-bar
    el-header.breadcrumb-bar( height="breadcrumbHeight + 'px'" )
      el-breadcrumb( separator-class="fa fa-angle-right" )
        el-breadcrumb-item part 1
        el-breadcrumb-item part 2
        el-breadcrumb-item part 3

    el-container
      my-sidebar(
        :defaultWidth="sidebarWidthDefault",
        :max="sidebarMax",
        :min="sidebarMin",
        resizable,
        v-model="sidebarWidthCurrent"
      )
        span(
          v-for="item in 100"
          slot="content"
        ) aside {{ item }}<br />

      el-container
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
              :label="item.name",
              :name="item.id"
            )

        el-main
          router-view( v-show="tabs.length > 0" )
        el-footer( :height="footerHeight + 'px'" ) footer
</template>

<script>
  /**
   * default
   */

  /* Node modules */

  /* Third-party modules */
  import Vue from 'vue';
  import { mapState } from 'vuex';

  /* Files */
  import draggable from 'vuedraggable';
  import mySidebar from '../components/sidebar.vue';

  export default Vue.extend({
    name: 'default',

    components: {
      draggable,
      mySidebar,
    },

    computed: {
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
    },

    data() {
      return {
        activeTab: '',
        breadcrumbHeight: 30,
        drag: false,
        footerHeight: 30,
        iconBar: 30,
        sidebarMin: 100,
        sidebarMax: 500,
        sidebarResizeWidth: 5,
        sidebarWidthCurrent: this.$store.state.app.sidebarWidth,
        sidebarWidthDefault: 300,
        tabBarHeight: 40,
      };
    },

    methods: {
      changeTab() {
        return this.$router.push({
          name: 'query',
          query: {
            tabId: this.activeTab,
          },
        });
      },

      fetchData() {
        this.activeTab = this.$route.query.tabId;
      },

      removeTab(tabId) {
        return this.$store.dispatch('tabs/findById', tabId)
          .then(({ index, tab }) => {
            if (index === -1) {
              return Promise.reject(new Error('UNKNOWN_TAB'));
            }

            return Promise.resolve()
              .then(() => {
                if (tab.type !== 'query') {
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
                if (this.activeTab !== tabId || this.tabs.length === 0) {
                  /* No tabs or deleted tab not currently active - do nothing */
                  return undefined;
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

            this.showError(err);
          });
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
    },
  });
</script>

<style lang="scss">
  $breadcrumb-bar-height: 30px;
  $footer-bar-height: 30px;
  $icon-bar-height: 30px;
  $tab-bar-height: 40px;

  .el-container.default-layout {
    .el-header.icon-bar {
      line: {
        height: $icon-bar-height;
      }
    }

    .el-header.breadcrumb-bar {
      .el-breadcrumb {
        line: {
          height: $breadcrumb-bar-height;
        }
      }
    }

    .el-container {
      height: calc(100vh - #{$icon-bar-height} - #{$breadcrumb-bar-height});

      .sidebar {
        .content {
          background: blue;
        }
        .resize {
          background: purple;
        }
      }

      .el-container {
        .el-header.tab-bar {
          padding: 0;
          background: orange;

          .el-tabs__new-tab {
            margin: {
              right: 10px;
            }
          }

          .el-tabs__header {
            .el-tabs__item {
              box: {
                /* Puts a weird box when app loses focus */
                shadow: none;
              }
            }
          }

          .el-tabs__content {
            display: none;
          }
        }

        .el-main {
          background: green;
        }

        .el-footer {
          line: {
            height: $footer-bar-height;
          }
          background: red;
        }
      }
    }

  }
</style>
