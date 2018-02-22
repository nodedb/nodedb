<template lang="pug">
  #app
    .loader(
      v-show="loading"
      v-loading.fullscreen.lock="loading",
      :element-loading-text="$t('misc:LOADING') + '...'",
      element-loading-background="rgba(0, 0, 0, 0.8)"
    )

    component(
      v-show="!loading",
      :is="layout"
    )
</template>

<script>
  /**
   * app
   */

  /* Node modules */

  /* Third-party modules */
  import { _ } from 'lodash';

  /* Files */
  import defaultLayout from '../layouts/default';

  export default {
    name: 'app',

    components: {
      defaultLayout,
    },

    created() {
      this.loadStores();
      this.setLayout();
    },

    data() {
      return {
        layout: 'defaultLayout',
        loading: true,
      };
    },

    methods: {
      /**
       * Load Stores
       *
       * This loads all the stores that are
       * backed by an asynchronous location.
       * Once they are all loaded, the app can
       * be considered loaded.
       *
       * @todo handle loading errors
       * @return {Promise<void>}
       */
      loadStores() {
        return Promise.all([
          this.$store.dispatch('app/loadState'),
          this.$store.dispatch('drivers/loadState'),
          this.$store.dispatch('tabs/loadState'),
        ]).then(() => {
          this.loading = false;
        });
      },

      setLayout() {
        let layout = `${this.$route.meta.layout}Layout`;

        if (_.has(this.$options.components, layout) === false) {
          /* Unknown - use the default layout */
          layout = 'defaultLayout';
        }

        this.layout = layout;
      },
    },

    watch: {
      $route: 'setLayout',
    },
  };
</script>

<style lang="scss">
  * {
    user-select: none;
  }

  a {
    outline: none !important;
  }
</style>
