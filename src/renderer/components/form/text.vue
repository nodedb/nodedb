<template lang="pug">
  div
    el-input(
      :type="config.type"
      :value="model[config.key]"
      @input="update(config.key, $event)"
    )

</template>

<script>
  /**
   * text
   */

  /* Node modules */

  /* Third-party modules */

  /* Files */

  export default {
    name: 'form-text',

    props: {
      config: {
        required: true,
        type: Object,
      },

      model: {
        required: true,
        type: Object,
      },

      update: {
        required: true,
        type: Function,
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
