<template>
  <!-- 
    设计: 悬浮的时候颜色应该变浅  在点击的时候颜色再变深

  -->
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
    // 传入按钮类型 primary | warning | plain | success | 
    type: {
      type: String,
      default: 'plain'
    },
    // 是否需要圆角 true | false 
    roundCorner: {
      type: Boolean,
      default: false
    },
    // 是否为圆形图标按钮
    circle: {
      type: Boolean,
      default: false
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
  &:hover {
    // border: #409eff 1px solid;
    background-color: rgba(64, 158, 255, 0.8);
  }
  &:active {
    // border: #409eff 1px solid;
    background-color: rgb(56, 140, 224);    
  }
}

.fontStyle {
  color: white;
  font-size: 18px;
}

</style>
