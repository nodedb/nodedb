<template lang="pug">
  div
    el-form(
      ref="form",
      :model="formData",
      :label-width="labelWidth + 'px'",
      :rules="rules"
    )

      el-form-item( :label="$t('drivers:SELECT_DRIVER')" )
        el-select(
          v-model="formData.driver",
          :placeholder="$t('drivers:SELECT_DRIVER')"
        )
          el-option(
            v-for="item in drivers",
            :label="item.name",
            :key="item.id",
            :value="item.id"
          )

      login-form(
        :enter="submit",
        :form="loginForm",
        keyPrepend="connection.",
        :model="formData.connection",
        :update="(key, value) => updateForm('connection.' + key, value)"
      )

      el-form-item
        el-button(
          type="primary",
          @click="submit",
          :loading="loggingIn"
          round
        ) @todo

        el-button(
          @click="reset"
          round
        ) @todo - reset
</template>

<script>
  /**
   * login
   */

  /* Node modules */

  /* Third-party modules */
  // import { _ } from 'lodash';
  // import { mapState } from 'vuex';

  /* Files */
  import loginForm from '../components/login';

  export default {
    name: 'login',

    components: {
      loginForm,
    },

    computed: {
      // ...mapState({
      //   formData(state, getters) {
      //     const { tab } = getters['tabs/findById'](this.tabId);
      //
      //     const data = _.isObject(tab) ? tab.data : {};
      //
      //     const connection = _.has(data, 'connection') ? data.connection : {};
      //     const driver = _.has(data, 'driver') ? data.driver : null;
      //
      //     return {
      //       connection,
      //       driver,
      //     };
      //   },
      // }),

      // activeDriver: vm => vm.$store.getters['drivers/getDriverById'](vm.formData.driver),
      activeDriver: () => null,

      drivers: (vm) => {
        const { drivers } = vm.$store.state.drivers;

        console.log(vm.formData.driver);
        console.log(drivers);

        if (!vm.formData.driver && drivers.length > 0) {
          // vm.updateForm('driver', drivers[0].id);
        }

        return drivers;
      },

      loginForm: (vm) => {
        const form = [];

        const { driver } = vm.formData;

        if (driver) {
          /* Merge into the form array */
          form.push(...driver.getLoginForm());

          // form.forEach((item) => {
          //   const key = `connection.${item.key}`;
          //
          //   /* Set the form value */
          //   let value = vm.formData.connection[item.key];
          //   if (value === undefined) { value = item.default; }
          //
          //   vm.formData.connection[item.key] = value;
          //
          //   /* Set the validation rules */
          //   if (!Array.isArray(vm.rules[key])) { vm.rules[key] = []; }
          //
          //   if (item.required) {
          //     vm.rules[key].push({
          //       required: true,
          //       message: vm.$i18n.t('error:FORM_REQUIRED'),
          //       trigger: 'blur',
          //     });
          //   }
          // });
        }

        return form;
      },

      tabId: vm => vm.$route.params.tabId,
    },

    data() {
      return {
        error: null,
        formData: {
          connection: {},
          driver: null,
        },
        labelWidth: 120,
        loggingIn: false,
        rules: {},
      };
    },

    methods: {
      reset() {
        return this.loginForm.reduce((thenable, item) => thenable
          .then(() => this.updateForm(`connection.${item.key}`, undefined)), Promise.resolve());
      },

      submit(...args) {
        console.log('submitted', {
          args,
        });
      },

      updateForm(item, value) {
        return this.$store.dispatch('tabs/updateTabData', {
          id: this.tabId,
          item,
          value,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>

  .el-select, .el-input {
    width: 100%;
  }

  .el-alert {
    margin: {
      bottom: 15px;
      // replace with $--msgbox-padding-primary
    }
  }

</style>
