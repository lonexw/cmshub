<template>
  <div :class="(active ? 'active ' : '') + 'bg-tag pointer radius  flex align-center'" onselectstart="return false;">
    <slot></slot>
    <a-icon v-if="toggle && toggleDirection === 'down'" type="caret-down" class="text-sm tag-toggle" />
    <a-icon v-if="toggle && toggleDirection === 'right'" type="caret-right" class="text-sm tag-toggle" />
  </div>
</template>

<script>
export default {
  name: 'BgTag',
  components: {},
  props: {
    active: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Boolean,
      default: false
    },
    toggleDirection: {
      type: String,
      default: 'down'
    }
  }
}
</script>

<style lang="less" scoped>
.bg-tag {
  padding: 3px 10px;
  .tag-toggle {
    margin-left: 5px;
    display: none;
  }

  &:hover {
    background-color: var(--ghostWhite);
    .tag-toggle {
      display: inline;
    }
  }

  &.active {
    background-color: var(--ghostWhite);
  }
}
</style>
