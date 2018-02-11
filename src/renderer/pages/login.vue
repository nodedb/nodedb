<template lang="pug">
  div login
</template>

<script>
  /**
   * login
   */

  /* Node modules */

  /* Third-party modules */
  import { ipcRenderer } from 'electron'; // eslint-disable-line

  /* Files */

  export default {
    name: 'login',

    methods: {
      save() {
        ipcRenderer.send('new-connection-save', {
          connection: 'data',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
