<template lang="pug">
  div query page {{ tabId }}
</template>

<script>
  /**
   * query
   */

  /* Node modules */

  /* Third-party modules */

  /* Files */

  export default {
    name: 'query',

    created() {
      this.fetchData();
    },

    data() {
      return {
        tabId: '',
      };
    },

    methods: {
      fetchData() {
        this.tabId = this.$route.query.tabId;
      },
    },

    watch: {
      $route: 'fetchData',
    },
  };
</script>

<style lang="scss" scoped>

</style>
