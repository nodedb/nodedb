<template lang="pug">
  div
    el-alert(
      v-if="drivers.length === 0"
      :title="$t('drivers:NO_DRIVERS_INSTALLED_TITLE')"
      type="warning"
      show-icon
      :closable="false"
    )
      p.el-alert__description {{ $t('drivers:NO_DRIVERS_INSTALLED_DESC') }}

    el-form(
      v-else
      ref="form"
      :model="form"
      :label-width="labelWidth + 'px'"
    )

      el-form-item( :label="$t('drivers:SELECT_DRIVER')" )
        el-select(
          :value="form.driver"
          @input="updateForm('driver', $event)"
          :placeholder="$t('drivers:SELECT_DRIVER')"
        )
          el-option(
            v-for="item in drivers"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          )

      login-form(
        :enter="onSubmit"
        :form="loginForm"
        :model="form.connection"
        :update="(key, value) => updateForm('connection.' + key, value)"
      )

      el-form-item
        el-button(
          type="primary"
          @click="onSubmit"
        ) @todo

        el-button Cancel
</template>

<script>
  /**
   * login
   */

  /* Node modules */

  /* Third-party modules */
  import { _ } from 'lodash';
  import { mapState } from 'vuex';

  /* Files */
  import loginForm from '../components/login';

  export default {
    name: 'login',

    components: {
      loginForm,
    },

    computed: {
      ...mapState({
        form(state, getters) {
          const { tab } = getters['tabs/findById'](this.tabId);

          const data = _.isObject(tab) ? tab.data : {};

          const connection = _.has(data, 'connection') ? data.connection : {};
          const driver = _.has(data, 'driver') ? data.driver : null;

          return {
            connection,
            driver,
          };
        },
      }),
      activeDriver: vm => vm.$store.getters['drivers/getDriverById'](vm.form.driver),
      drivers: (vm) => {
        const { drivers } = vm.$store.state.drivers;

        if (!vm.form.driver && drivers.length > 0) {
          vm.updateForm('driver', drivers[0].id);
        }

        return drivers;
      },
      loginForm: (vm) => {
        if (vm.activeDriver) {
          const form = vm.activeDriver.getLoginForm();

          vm.form.connection = form.reduce((result, item) => {
            result[item.key] = vm.form.connection[item.key] || item.default || null;
            return result;
          }, {});

          return form;
        }

        return [];
      },
      tabId: vm => vm.$route.params.tabId,
    },

    data() {
      return {
        active: null,
        labelWidth: 120,
      };
    },

    methods: {
      onSubmit() {
        // console.log('submit');
        // console.log(this.form);
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

</style>
