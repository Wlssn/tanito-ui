<template>
  <div>
    <!-- 新建时上传附件公共组件 -->
    <el-upload
      v-if="!isLook"
      :accept.sync="fileType"
      :action="action"
      list-type="picture-card"
      multiple
      :headers="headers"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-error="handleError"
      :on-change="onChange"
      :limit="limit"
      :file-list="fileList"
      :disabled.sync="disabled"
      :class="{ hide: hideUpload }"
    >
      <span style="font-size: 30px;">+</span>
    </el-upload>
    <!-- 查看页面 -->
    <div v-if="isLook">
      <div
        v-for="(fileItem, index) in fileList"
        :key="'fileList' + index"
        class="look_img_div"
      >
        <img
          :src="fileItem.url"
          class="look_img"
          @click="openImages(fileItem)"
        />
      </div>
    </div>
    <!-- 查看附件 -->
    <OpenImages ref="OpenImagesDialog" />
  </div>
</template>
<script>
import OpenImages from './openImages'
export default {
  components: {
    OpenImages,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    fileTypeList: {
      type: String,
      default: '.jpg,.jpeg,.png,.JPG,.JPEG',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 9,
    },
    sortNum: {
      type: Number,
      default: 0,
    },
    propName: {
      type: String,
      default: '',
    },
    isLook: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '',
    },
    acceptFileList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      // 默认上传的图片服务器地址
      action: 'http://tanito.xyz:81/uploadImage',
      headers: {
        // Authorization:
        //   getToken() !== undefined ? 'Bearer ' + getToken() : 'Bearer',
      },
      hideUpload: false,
      fileType: '', // 文件类型
      fileList: [],
    }
  },
  mounted() {
    this.fileList = this.acceptFileList.length > 0 ? this.acceptFileList : []
    this.hideUpload = this.fileList.length >= this.limit
    this.fileType = this.fileTypeList
    // 处理上传地址
    if (this.url) {
      this.action = this.url
    }
  },
  watch: {
    acceptFileList() {
      this.fileList = this.acceptFileList.length > 0 ? this.acceptFileList : []
      this.hideUpload = this.fileList.length >= this.limit
    },
    fileTypeList(val) {
      this.fileType = val
    },
  },
  methods: {
    onChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limit
    },
    /**
     * 上传之前的回调函数
     * 对上传文件做出限制 校验是否通过
     */
    beforeUpload(file) {
      // // // // // // // console.log('目前上传的文件', file, this.fileTypeList)
      let type = file.name.substring(file.name.lastIndexOf('.'))
      if (this.fileTypeList.indexOf(type) === -1) {
        this.$message.error('只能上传' + this.fileTypeList + '格式的文件')
        return false
      }
      if (['.jpg', '.jpeg', '.png', '.JPG', '.JPEG'].indexOf(type) > -1) {
        // 图片
        let _size = 440 * 1024 * 1024
        if (file.size > _size) {
          this.$message.error('上传图片最大为44M')
          return false
        }
      }
    },
    /**
     * 下载
     */
    download(item) {
      const a = document.createElement('a')
      a.setAttribute('download', item.name)
      a.setAttribute('title', item.fileName || item.name)
      a.setAttribute('target', '_blank')
      a.setAttribute(
        'href',
        process.env.VUE_APP_TARGET_URL + '/downloadFile?fileId=' + item.fileId,
      )
      a.click()
    },
    /**
     * 查看附件
     */
    openImages(file) {
      this.$refs.OpenImagesDialog.init(file)
    },
    //上传成功
    handleSuccess(response, file, fileList) {
      // // // // // // // console.log('上传成功;', response, file, this.name)
      if (response.code === 200) {
        this.$emit('handleSuccess', response, file, fileList)
      } else {
        // 如果没有返回200状态码 判断为上传失败调用处理失败的回调
        this.handleError(response.msg, file, fileList)
      }
    },
    // 处理上传失败回调
    handleError(errorMessage, file, fileList) {
      // 如果只有一个文件那就直接清空
      if (fileList.length === 1) {
        this.fileList = []
      } else {
        // 如果有多个文件 从列表中清除上传失败的文件 并赋值给fileList
        this.fileList = fileList.filter((fileItem) => {
          return fileItem.uid !== file.uid
        })
      }
      this.$message({ message: errorMessage, type: 'error', duration: 1000 })
    },
    // 附件上传
    handleRemove(file, fileList) {
      console.log('文件列表移除文件时的钩子', file, fileList)
      let _processedFileList = []
      fileList.forEach((fileItem) => {
        let _res = fileItem.response || {}
        _processedFileList.push(_res.data || fileItem.fileId)
      })
      this.hideUpload = fileList.length >= this.limit
      this.$emit(
        'handleRemove',
        _processedFileList,
        fileList,
      )
    },
  },
}
</script>
<style>
.el-upload-list {
  width: 80%;
}
/* .limit_displayNone .el-upload--picture-card {
  display: none;
} */
.look_img_div {
  width: 178px;
  height: 178px;
  padding-bottom: 10px;
  display: inline-block;
  margin-right: 10px;
}
.look_img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  cursor: pointer;
}
.upload_ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
}
.hide .el-upload--picture-card {
  display: none;
}
.el-upload--picture-card i {
  color: skyblue;
  font-size: inherit;
}
</style>
