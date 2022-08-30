<template>
  <button id="ssButton" class="ss-button" :class="[`ss-button--${type}`]" @click="clickEvent">
    <span class="fontStyle">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ssButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    clickEvent () {
      console.log('shijiaole ')
      document.getElementById('ssButton').blur()
    }
  }
}
</script>

<style lang="scss" scoped>
.ss-button {
  outline: none;
  background-color: #409eff;
  border: transparent 1px solid;
  cursor: pointer;
  padding: 4px 6px;
  box-sizing: border-box;
  white-space: nowrap;
  text-align: center;
  transition: .1s;
  // 禁止元素文字被选中
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  &:hover,
  &:focus {
    // color: rgb(64, 158, 255);
    border: #409eff 1px solid;
    background-color: rgba(64, 158, 255, 0.8);
  }
}

.fontStyle {
  color: white;
  font-size: 18px;
}

</style>
