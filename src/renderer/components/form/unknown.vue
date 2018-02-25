<template lang="pug">
  div Unknown form type: "{{ config.type }}"
</template>

<script>
  /**
   * unknown
   *
   * This exists to make debugging easier. It
   * doesn't actually do anything.
   */

  /* Node modules */

  /* Third-party modules */

  /* Files */

  export default {
    name: 'form-unknown',

    props: {
      config: {
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
