<template>
  <!--
    设计: 悬浮的时候颜色应该变浅  在点击的时候颜色再变深

  -->
  <button id="ssButton" class="ss-button" :class="[`ss-button--${type}`, {
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled
  }]" @click="clickEvent" :disabled="disabled">
    <i v-if="icon" :class="icon"></i>
    <span v-if="$slots.default" class="size">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ssButton',
  props: {
    // 传入按钮类型 primary | plain | success | danger
    type: {
      type: String,
      default: 'plain'
    },
    // 是否需要圆角 true | false
    round: {
      type: Boolean,
      default: false
    },
    // 是否为圆形图标按钮
    circle: {
      type: Boolean,
      default: false
    },
    // 禁用样式
    disabled: {
      type: Boolean,
      default: false
    },
    // 图标
    icon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    clickEvent (e) {
      document.getElementById('ssButton').blur()
      this.$emit('click', e)
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
  padding: 4px 10px;
  border-radius: 2px;
  box-sizing: border-box;
  white-space: nowrap;
  text-align: center;
  transition: .1s;
  // 禁止元素文字被选中
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  // &:hover {
  //   filter: brightness(1.05);
  // }
  &:active {
    box-shadow: 0 0 4px #6cf;
    filter: brightness(0.98);
  }
}

.ss-button--plain {
  border-color: rgb(187, 187, 187);
  background-color: #fff;
  color: black;
  &:hover {
    background-color: rgba(102, 204, 255, 0.2);
    border-color: #a6d4ff;
  }
}
.ss-button--primary {
  &:hover {
    background-color: rgb(66, 161, 255, 0.8);
  }
  background-color: #409eff;
  color: white;
}
.ss-button--success {
  &:hover {
    background-color: rgb(57, 197, 187, 0.8);
  }
  &:active {
    box-shadow: 0 0 4px #39c5bb;
  }
  background-color: #39c5bb;
  color: white;
}
.ss-button--danger {
  &:hover {
    background-color: rgb(255, 0, 0, 0.8);
  }
  &:active {
    box-shadow: 0 0 4px #ff2727;
  }
  background-color: #ff2727;
  color: white;
}

.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  &:hover {
    filter: none !important;
    background-color: none !important;
  }
  &:active {
    filter: none !important;
    background-color: none !important;
    box-shadow: none !important;
  }
}
.is-round {
  border-radius: 16px;
}

.size {
  font-size: 18px;
  font-family: serif, cursive;
}

// 加上icon和文本的距离
.ss-button [class*=ss-icon-]+span {
  margin-left: 8px;
}

</style>
