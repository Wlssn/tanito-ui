<template>
  <!-- 打开附件预览 -->
  <el-dialog :title="title" :visible.sync="visible" width="800px" append-to-body :before-close="cancel"
    custom-class="imagesDialog" :close-on-click-modal="true">
    <div>
      <img style="width:100%;height:400px;text-align: center;" :src="selectItem.url" />
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      title: '预览',
      selectItem: {
        url: ''
      },
    }
  },
  methods: {
    init(item) {
      this.selectItem = item
      this.visible = true
    },
    cancel() {
      this.visible = false
    }
  }
}
</script>
