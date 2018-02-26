<template lang="pug">
  div
    div(
      v-for="item in form"
    )

      el-form-item(
        v-if="item.label"
        :label="$t('form:' + item.label)"
        :prop="keyPrepend + item.key"
      )

        component(
          :is="getComponent(item.type)"
          :config="item"
          :model="model"
          :update="update"
        )
</template>

<script>
  /**
   * login
   */

  /* Node modules */

  /* Third-party modules */
  import { _ } from 'lodash';

  /* Files */
  import formText from './form/text';
  import formUnknown from './form/unknown';

  export default {
    name: 'login-form',

    components: {
      formText,
      formUnknown,
    },

    data() {
      return {
        types: {
          text: [
            'number',
            'password',
          ],
        },
      };
    },

    methods: {

      getComponent(type) {
        if (_.has(this.types, type)) {
          return `form-${type}`;
        }

        const formType = _.findKey(this.types, types => types.includes(type));

        if (formType) {
          return `form-${formType}`;
        }

        return 'form-unknown';
      },

    },

    props: {
      enter: {
        required: true,
        type: Function,
      },

      form: {
        required: true,
        type: Array,
      },

      keyPrepend: {
        type: String,
        default: '',
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
