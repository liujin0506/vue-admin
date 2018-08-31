<style lang="scss">
.menus {
  .table-container {
    .el-table__expanded-cell {
      padding: 0px 0px 0px 47px;
    }
  }
}
</style>

<template>
  <div class="menus">
    <div class="table-container">
      <el-card v-loading="loading" class="box-card">
        <tree-table :data="list" :columns="columns" :expand-all="false" border>
          <el-table-column label="推荐状态" width="150">
            <template slot-scope="scope">
              <el-button v-if="scope.row.is_recommend === 1" type="info" size="mini" @click="handleRecommend(scope.row.id, 0)">取消</el-button>
              <el-button v-if="scope.row.is_recommend === 0" type="danger" size="mini" @click="handleRecommend(scope.row.id, 1)">推荐</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="174">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </tree-table>
      </el-card>
    </div>

    <div class="editor-container">
      <el-dialog :title="editorStatus == 1 ? '新增' : '编辑'" :visible.sync="editorVisible">
        <el-form ref="editor" :model="editor" :rules="editorRules" label-width="120px">

          <el-form-item label="栏目名称" prop="name">
            <el-input v-model.trim="editor.name" clearable placeholder="请输入内容" disabled />
          </el-form-item>
          <el-form-item label="栏目排序" prop="sort">
            <el-input v-model.trim="editor.sort" placeholder="请输入序号，越大越靠前" />
          </el-form-item>
          <el-form-item label="是否推荐" prop="is_recommend">
            <el-radio-group v-model="editor.is_recommend">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
            <div>推荐后才会在手机端显示哦~</div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editorVisible = false">取消</el-button>
          <el-button :loading="editorLoading" type="primary" @click="updateData">提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import { categoryList, updateCategory } from '@/api/jd/category'

export default {
  name: 'JdCategory',
  components: { treeTable },
  data() {
    return {
      loading: false,
      editorStatus: 1,
      editorVisible: false,
      editor: {
        id: null,
        name: '',
        sort: 0,
        is_recommend: 0
      },
      menuParent: [],
      editorRules: {
        name: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      },
      editorLoading: false,
      columns: [
        {
          text: 'ID',
          value: 'id',
          width: 180
        },
        {
          text: '排序',
          value: 'sort',
          width: 180
        },
        {
          text: '栏目名称',
          value: 'name'
        }
      ],
      props: { value: 'id', label: 'name', children: 'children' },
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const data = await categoryList()
      this.list = data
      this.loading = false
    },
    resetEditor() {
      this.editor = {
        id: null,
        name: '',
        sort: 0,
        is_recommend: 0
      }
    },
    handleUpdate(item) {
      this.editorVisible = true
      this.editorStatus = 2
      this.editor = {
        id: item.id,
        name: item.name,
        sort: item.sort,
        is_recommend: item.is_recommend
      }
      this.$nextTick(() => {
        this.$refs['editor'].clearValidate()
      })
    },
    handleRecommend(id, handle) {
      let message
      if (handle === 1) {
        message = '是否确定推荐'
      } else {
        message = '是否取消推荐'
      }
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          updateCategory(id, { is_recommend: handle }).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getList()
          })
        })
        .catch(() => {})
    },
    updateData() {
      this.$refs['editor'].validate(valid => {
        if (valid) {
          this.editorLoading = true
          updateCategory(this.editor.id, this.editor)
            .then(data => {
              this.editorLoading = false
              this.editorVisible = false
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.getList()
            })
            .catch(() => {
              this.editorLoading = false
            })
        }
      })
    }
  }
}
</script>
