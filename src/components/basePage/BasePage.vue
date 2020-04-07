<template>
  <a-layout class="layout">
    <a-layout-sider class="base-page-sider sider light">
      <div class="flex align-center justify-between margin-bottom">
        <span class="text-xxxl text-black">{{ title }}</span>
        <!-- <div class="round solid line-gray toggle pointer"><a-icon type="left" /></div> -->
      </div>
      <slot name="sider"></slot>
    </a-layout-sider>
    <a-layout style="background-color: white;">
      <a-layout-content>
        <slot name="content"></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'BasePage',
  components: {},
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less">
.layout .base-page-sider {
  width: 260px !important;
  min-width: 260px !important;
  max-width: 260px !important;
  text-align: left;
  padding: 20px;
  .toggle {
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: black;
    font-size: 12px;
    font-weight: 600;
    margin-right: 3px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  }
}
</style>
<style lang="less" scoped></style>
