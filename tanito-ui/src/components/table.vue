<template>
    <div class="container">
        <el-table
            :data="option.tableData"
            :height="height"
            :stripe="stripe"
            :border="border"
            :size="size"
            @selection-change="selectChange"
            @row-click="rowClick"
        >
            <el-table-column
                v-for="(item, index) in option.columns"
                :key="$route.path + 'table-column' + index"
                :type="item.type"
                :align="item.align || 'center'"
                :selectable="
                    item.type === 'selection' ? item.selectableFunc : () => {}
                "
                :label="item.label"
                :prop="item.dataIndex"
                :width="item.width"
                :fixed="item.fixed"
                :formatter="item.formatter"
                :show-overflow-tooltip="item.isEllipsis"
            ></el-table-column>
        </el-table>

        <!-- 分页器 -->
        <!-- <el-pagination
      v-if="showPagination"
      :total="total"
      :current-page=""
      :page-size=""
      @current-change=""
      layout=""
    ></el-pagination> -->
    </div>
</template>

<script>
export default {
    name: "ssTable",
    props: {
        //   /** @type Object 整个表格的option配置
        //    * @key option.tableData: [] 表格绑定data
        //    * @key option.columns: [] 每列数据表格项
        //    */
        //   option: {
        //     type: Object,
        //     default: () => {},
        //   },
        height: {
            type: String || Number,
            default: "100%",
        },
        stripe: {
            type: Boolean,
            default: false,
        },
        border: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: "medium",
        },
        //   pageSize: {
        //     type: Number,
        //     default: 10,
        //   },
        //   pageNum: {
        //     type: Number,
        //     default: 1,
        //   }
    },
    data() {
        return {
            total: 0,

            option: {
                tableData: [
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        province: "上海",
                        city: "普陀区",
                        address: "上海市普陀区金沙江路 1518 弄",
                        zip: 200333,
                        tag: "家",
                    },
                    {
                        date: "2016-05-04",
                        name: "王小虎",
                        province: "上海",
                        city: "普陀区",
                        address: "上海市普陀区金沙江路 1517 弄",
                        zip: 200333,
                        tag: "公司",
                    },
                    {
                        date: "2016-05-01",
                        name: "王小虎",
                        province: "上海",
                        city: "普陀区",
                        address: "上海市普陀区金沙江路 1519 弄",
                        zip: 200333,
                        tag: "家",
                    },
                    {
                        date: "2016-05-03",
                        name: "王小虎",
                        province: "上海",
                        city: "普陀区",
                        address: "上海市普陀区金沙江路 1516 弄",
                        zip: 200333,
                        tag: "公司",
                    },
                ],
                columns: [
                    {
                        type: "index",
                        label: "序号",
                        width: "55",
                    },
                    {
                        type: "selection",
                        width: "55",
                        selectableFunc: (row, index) => {
                            return index === 1 || index === 0;
                        },
                    },
                    {
                        label: "名字",
                        dataIndex: "name",
                        width: "160",
                        formatter: function (row) {
                            return <span>formatter function</span>;
                        },
                        // fixed: 'left'
                    },
                    {
                        label: "地址",
                        dataIndex: "address",
                        width: "160",
                        isEllipsis: true,
                        // fixed: 'left'
                    },
                    {
                        label: "城市",
                        dataIndex: "city",
                        width: "160",
                        // fixed: 'left'
                    },
                    {
                        label: "日期",
                        dataIndex: "date",
                        width: "160",
                        // fixed: 'left'
                    },
                    {
                        label: "省份",
                        dataIndex: "province",
                        width: "160",
                        // fixed: 'left'
                    },
                ],
            },
        };
    },
    methods: {
        selectChange(selection) {
            this.$emit("selectChange", selection);
        },
        rowClick(row, event, column) {
            this.$emit("rowClick", row, event, column);
        },
    },
};
</script>

<style></style>
