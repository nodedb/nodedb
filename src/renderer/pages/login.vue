<template lang="pug">
  div
    div {{ form }}
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
            :value="item.id"
          )

      login-form

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
          return getters['tabs/findById'](this.tabId).tab.data;
        },
      }),
      drivers: vm => vm.$store.state.drivers.drivers,
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
        console.log('submit');
        console.log(this.form);
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
