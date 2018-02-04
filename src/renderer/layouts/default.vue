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
            v-model="activeConnection",
            :addable="true",
            :closable="true",
            type="card",
            @tab-click="changeTab"
          )
            el-tab-pane(
              v-for="item in connections",
              :key="item.id",
              :label="item.name",
              :name="item.id"
            )

        el-main
          router-view
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
      connections: {
        get: vm => vm.$store.state.connections,
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
        activeConnection: '',
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
            id: this.activeConnection,
          },
        });
      },

      fetchData() {
        this.activeConnection = this.$route.query.id;
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
  $tab-bar-height: 60px;

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
