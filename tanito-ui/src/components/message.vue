<template>
  <!-- <button id="ssButton" class="ss-button" :class="[`ss-button--${type}`, {
    'is-round': round,
  }]" @click="clickEvent" :disabled="disabled">
  </button> -->
  <div class="ss-divider" :style="`height: ${height}; background-color: ${color}; margin: ${margin} 0;`"></div>
</template>

<script>
export default {
  name: 'ssDivider',
  props: {
    // 传入分割线颜色 main | plain | success | danger
    color: {
      type: String,
      default: '#dadada'
    },
    margin: {
      type: Number,
      default: 13,
    },
    height: {
      type: Number,
      default: 2,
    }
  },
  data () {
    return {

    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.ss-divider {
  width: 100%;
  // 禁止元素文字被选中
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}


</style>
