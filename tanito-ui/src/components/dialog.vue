<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :center="isCenter"
    :close-on-click-modal="clickModalClose"
    :before-close="beforeClose"
    :show-close="showCloseIcon"
    :destroy-on-close="destroyOnClose"
    :append-to-body="appendToBody"
    :modal="needModal"
    :close="closeEvent"
    :open="openEvent"
    :custom-class="dialogClassName"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <ss-button :size="buttonSize" @click="beforeClose">{{cancelText}}</ss-button>
      <ss-button :size="buttonSize" type="main" @click="confirm">
        {{confirmText}}
      </ss-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ssDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true,
      default: false
    },

    width: {
      type: String,
      default: '40%'
    },
    buttonSize: {
      type: String,
      default: 'small'
    },
    isCenter: {
      type: Boolean,
      default: false
    },
    clickModalClose: {
      type: Boolean,
      default: true
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    },
    needModal: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    dialogClassName: {
      type: String,
      default: 'customClassName'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    }
  },
  data () {
    return {}
  },
  methods: {
    // 确认 | 提交
    confirm () {
      this.$emit('confirm')
    },
    // 关闭前
    beforeClose () {
      this.$emit('beforeClose')
    },
    closeEvent () {
      this.$emit('close')
    },
    openEvent () {
      this.$emit('open')
    }
  }
}
</script>

<style>
.customClassName {
  border-radius: 0;
}
</style>
