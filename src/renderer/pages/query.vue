<template lang="pug">
  div query page {{ id }}
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
        id: '',
      };
    },

    methods: {
      fetchData() {
        this.id = this.$route.query.id;
      },
    },

    watch: {
      $route: 'fetchData',
    },
  };
</script>

<style lang="scss" scoped>

</style>
