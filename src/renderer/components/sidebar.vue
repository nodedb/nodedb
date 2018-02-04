<template lang="pug">
  .sidebar
    el-aside.content( :width="value + 'px'" )
      slot( name="content" )

    el-aside.resize(
      v-if="resizable",
      @dblclick.native="reset",
      @mousedown.native="isResizing = true",
      :width="resizeWidth + 'px'"
    )
</template>

<script>
  /**
   * sidebar
   */

  /* Node modules */

  /* Third-party modules */

  /* Files */

  export default {
    name: 'sidebar',

    data() {
      return {
        isResizing: false,
      };
    },

    methods: {
      reset() {
        if (this.defaultWidth === undefined) {
          /* No default width - ignore */
          return;
        }

        this.setWidth(this.defaultWidth);
      },

      resizeSidebar($event) {
        if (this.isResizing) {
          this.setWidth($event.clientX);
        }
      },

      resizeStop() {
        this.isResizing = false;
      },

      setWidth(width) {
        if (width < this.min) {
          width = this.min;
        } else if (width > this.max) {
          width = this.max;
        }

        this.$emit('input', width);
      },
    },

    mounted() {
      this.$root.$el.onmousemove = $event => this.resizeSidebar($event);
      this.$root.$el.onmouseup = () => this.resizeStop();
    },

    props: {
      defaultWidth: {
        type: Number,
        default: undefined,
      },
      max: {
        type: Number,
        default: 500,
      },
      min: {
        type: Number,
        default: 0,
      },
      resizable: {
        type: Boolean,
        default: false,
      },
      resizeWidth: {
        type: Number,
        default: 5,
      },
      value: Number,
    },
  };
</script>

<style lang="scss" scoped>
  .sidebar {
    display: flex;

    .el-aside {
      &.resize {
        cursor: col-resize;
      }
    }
  }

</style>
