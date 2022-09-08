<!--
    /**
     * 下拉选择树形组件，下拉框展示树形结构，提供选择某节点功能，方便其他模块调用
     * @author ljn
     * @date 2019-02-23
     * 调用示例：
     * <tree-select :height="400" // 下拉框中树形高度
     *              :width="200" // 下拉框中树形宽度
     *              :data="data" // 树结构的数据
     *              :defaultProps="defaultProps" // 树结构的props
     *              multiple   // 多选
     *              checkStrictly // 多选时，严格遵循父子不互相关联
     *              :nodeKey="nodeKey"   // 绑定nodeKey，默认绑定'id'
     *              :checkedKeys="defaultCheckedKeys"  // 传递默认选中的节点key组成的数组
     *              @popoverHide="popoverHide"> // 事件有两个参数：第一个是所有选中的节点ID，第二个是所有选中的节点数据
     *              </tree-select>
     */
-->
<template>
  <div>
    <div class="mask" v-show="isShowSelect" @click="openFunc"></div>
    <el-popover placement="bottom-start" trigger="manual" v-model="isShowSelect" @hide="popoverHide">
      <div>
        <el-input placeholder="输入关键字进行过滤" v-model="searchName" style="padding-bottom:10px">
        </el-input>
        <el-tree class="common-tree" :style="style" ref="tree" :data="data" :props="defaultProps"
          :filter-node-method="filterNode" :show-checkbox="multiple" :node-key="nodeKey" :check-strictly="checkStrictly"
          default-expand-all :expand-on-click-node="false" :default-checked-keys="defaultCheckedKeys"
          :highlight-current="true" @check-change="handleCheckChange">
        </el-tree>
      </div>
      <el-select :style="selectStyle" slot="reference" ref="select" v-model="selectedData" :multiple="multiple"
        :placeholder="placeholder" :disabled="disabled" @click.native="openFunc" class="tree-select">
        <el-option v-for="(item, index) in options" :key="item.userId+'_'+new Date().getTime()+'_'+index"
          :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'ssTreeSelect',
  props: {
    // 树结构数据
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    placeholder: String,
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    defaultProps: {
      type: Object,
      default() {
        return {};
      }
    },
    // 配置是否可多选
    multiple: {
      type: Boolean,
      default() {
        return false;
      }
    },
    nodeKey: {
      type: String,
      default() {
        return 'id';
      }
    },
    // 显示复选框情况下，是否严格遵循父子不互相关联
    checkStrictly: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 默认选中的节点key数组
    checkedKeys: {
      type: Array,
      default() {
        return [];
      }
    },
    width: {
      type: Number,
      default() {
        return 250;
      }
    },
    height: {
      type: Number,
      default() {
        return 300;
      }
    }
  },
  data() {
    return {
      searchName: null,
      defaultCheckedKeys: [],
      isShowSelect: false, // 是否显示树状选择器
      options: [],
      selectedData: [], // 选中的节点
      style: 'width:100%' + this.width + 'px;' + 'height:' + this.height + 'px;',
      selectStyle: 'width:' + (this.width + 24) + 'px;',
      checkedIds: [],
      checkedData: []
    };
  },
  mounted() {
    this.initCheckedData()
  },
  methods: {
    // 树形节点过滤
    filterNode(value, data, node) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    openFunc() {
      if (!this.disabled) {
        this.isShowSelect = !this.isShowSelect
      }
    },
    popoverHide() {
      let _this = this
      if (this.multiple) {
        let checkedKeys = this.$refs.tree.getCheckedKeys(true); // 所有被选中的节点的 key 所组成的数组数据
        let checkedKeys1 = checkedKeys.filter((item) => {
          var node = this.$refs.tree.getNode(item);
          return node.visible
        })
        let checkedData = this.$refs.tree.getCheckedNodes(true); // 所有被选中的节点所组成的数组数据
        let checkedData1 = checkedData.filter((node) => {
          return node.visible
        })
        this.checkedIds = checkedKeys1
        this.checkedData = checkedData1
        this.$emit('popoverHide', this.checkedIds, this.checkedData);
      } else {
        this.checkedIds = this.$refs.tree.getCurrentKey();
        this.checkedData = this.$refs.tree.getCurrentNode();
        this.$emit('popoverHide', this.checkedIds, this.checkedData);
      }
    },
    // 节点被点击时的回调,返回被点击的节点数据
    handleNodeClick(data, node) {
      // console.log('data, node__节点被点击时的回调,返回被点击的节点数据', data, node)
      if (!this.multiple) {
        let tmpMap = {};
        tmpMap.value = node.key;
        tmpMap.label = node.label;
        this.options = [];
        this.options.push(tmpMap);
        this.selectedData = node.label;
        this.isShowSelect = !this.isShowSelect;
      }
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange() {
      var checkedKeys = this.$refs.tree.getCheckedKeys(true); // 所有被选中的节点的 key 所组成的数组数据
      let checkedKeys1 = checkedKeys.filter((item) => {
        var node = this.$refs.tree.getNode(item);
        return node.visible
      })
      this.options = checkedKeys1.map((item) => {
        var node = this.$refs.tree.getNode(item); // 所有被选中的节点对应的node
        if (node.visible) {
          let tmpMap = {};
          tmpMap.value = node.key;
          tmpMap.label = node.label;
          return tmpMap;
        }
      });
      console.log('this.options---', this.options)
      this.selectedData = this.options.map((item) => {
        return item.label;
      });
    },
    initCheckedData() {
      let _this = this
      if (this.multiple) {
        //   多选
        if (this.checkedKeys.length > 0) {
          // 勾选上传进来的节点
          this.$nextTick(function () {
            _this.$refs.tree.setCheckedKeys(_this.checkedKeys);
            _this.selectedData = _this.checkedKeys.map(function (x) {
              let node = _this.$refs.tree.getNode(x);
              return node && node.label ? node.label : ''
            })
            // console.log('selectedData', _this.$refs.tree.getCheckedNodes(true))
          })

        } else {
          // 清空所有勾选
          var checkedKeys = this.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
          for (let i = 0; i < checkedKeys.length; i++) {
            this.$refs.tree.setChecked(checkedKeys[i], false);
          }
        }
      } else {
        if (this.checkedKeys.length > 0) {
          // 选中传进来的节点
          var item = this.checkedKeys[0];
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(item);
            var node = this.$refs.tree.getNode(item);
            this.selectedData = node.label;
          })
        } else {
          // 清空选中
          this.selectedData = '';
          this.$refs.tree.setCurrentKey(null);
        }
      }
    }
  },
  watch: {
    isShowSelect(val) {
      // 隐藏select自带的下拉框
      this.$refs.select.blur();
    },
    checkedKeys(val) {
      if (!val) return;
      this.checkedKeys = val;
      this.initCheckedData();
    },
    searchName(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>
 
<style scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
}
.common-tree {
  overflow: auto;
}
</style>
 
<style>
.tree-select .el-select__tags .el-tag .el-tag__close {
  display: none;
}
.tree-select .el-select__tags .el-tag .el-icon-close {
  display: none;
}
</style>
