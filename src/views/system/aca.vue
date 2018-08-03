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
        <div class="operate-container">
            <el-button @click="handleCreate" class="operate-item" type="primary" icon="el-icon-edit">新增
            </el-button>
            <el-tag type="success">支持无限级</el-tag>
            <el-tag type="danger">注意：只是为了方便权限控制，在后端提供了一份路由表，路由配置还是在前端实现</el-tag>
        </div>

        <div class="table-container">
            <el-card class="box-card">
                <tree-table :data="list" :columns="columns" :expandAll="false" v-loading="loading" border>
                    <el-table-column label="操作" width="154">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </tree-table>
            </el-card>
        </div>

        <div class="editor-container">
            <el-dialog :title="editorStatus == 1 ? '新增' : '编辑'" :visible.sync="editorVisible">
                <el-form :model="editor" :rules="editorRules" ref="editor" label-width="120px">

                    <el-form-item label="上级菜单">
                        <el-cascader :options="list" :props="props" v-model="menuParent" clearable change-on-select style="width: 100%" placeholder="不选则为顶级菜单">
                        </el-cascader>
                    </el-form-item>

                    <el-form-item label="权限名称" prop="name">
                        <el-input placeholder="请输入内容" v-model.trim="editor.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="权限别名" prop="route_name">
                        <el-input placeholder="请输入内容" v-model.trim="editor.route_name" :disabled="this.editorStatus != 1" :clearable="this.editorStatus == 1"></el-input>
                    </el-form-item>
                    <el-form-item label="是否公共权限" prop="public_aca">
                        <el-radio-group v-model="editor.public_aca">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="editor.remark" placeholder="备注"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editorVisible = false">取消</el-button>
                    <el-button type="primary" :loading="editorLoading" @click="createData" v-if="editorStatus==1">提交</el-button>
                    <el-button type="primary" :loading="editorLoading" @click="updateData" v-else>提交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

import treeTable from '@/components/TreeTable'
import { menuList, createMenu, updateMenu, deleteMenu } from '@/api/system/aca'
import { searchParent } from '@/utils'

export default {
  name: 'aca',
  components: { treeTable },
  data() {
    return {
      loading: false,
      editorStatus: 1,
      editorVisible: false,
      editor: {
        id: null,
        parent_id: null,
        parent_name: '',
        menu_name: '',
        name: '',
        routers: ''
      },
      menuParent: [],
      editorRules: {
        name: [
          {
            required: true, message: '不能为空', trigger: 'blur'
          },
          {
            max: 20,
            message: '长度不能超过 20 个字符',
            trigger: 'blur'
          }
        ],
        route_name: [
          {
            required: true, message: '不能为空', trigger: 'blur'
          },
          {
            max: 20,
            message: '长度不能超过 40 个字符',
            trigger: 'blur'
          }
        ]
      },
      editorLoading: false,
      columns: [
        {
          text: '权限名称',
          value: 'name',
          width: 180
        },
        {
          text: '权限别名',
          value: 'route_name',
          width: 180
        },
        {
          text: '公共权限',
          value: 'is_public_aca'
        },
        {
          text: 'appid',
          value: 'appid'
        },
        {
          text: '备注',
          value: 'remark'
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
      const data = await menuList()
      this.list = data.data
      console.log(data.data)
      this.loading = false
    },
    resetEditor() {
      this.editor = {
        id: null,
        parentid: null,
        name: '',
        route_name: '',
        remark: '',
        public_aca: 0
      }
      this.menuParent = []
    },
    handleCreate() {
      this.resetEditor()
      this.editorVisible = true
      this.editorStatus = 1
      this.$nextTick(() => {
        this.$refs['editor'].clearValidate()
      })
    },
    handleUpdate(item) {
      this.editorVisible = true
      this.editorStatus = 2
      this.editor = {
        id: item.id,
        parentid: item.parentid,
        name: item.name,
        route_name: item.route_name,
        public_aca: item.public_aca,
        remark: item.remark
      }
      const parentList = searchParent(item)
      this.menuParent = parentList
      this.$nextTick(() => {
        this.$refs['editor'].clearValidate()
      })
    },
    handleDelete(id) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteMenu(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        })
        .catch(() => {})
    },
    createData() {
      this.$refs['editor'].validate(valid => {
        if (valid) {
          this.editorLoading = true
          this.generateData()
          createMenu(this.editor)
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
    },
    updateData() {
      this.$refs['editor'].validate(valid => {
        if (valid) {
          this.editorLoading = true
          this.generateData()
          updateMenu(this.editor)
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
    },
    generateData() {
      const parentNameList = this.searchParentName(0, this.list)
      const parentName = parentNameList.join(',')
      this.editor.parentid =
                this.menuParent.length === 0
                  ? null
                  : this.menuParent[this.menuParent.length - 1]
      this.editor.parentname = parentName
    },
    searchParentName(i, list, nameList = []) {
      if (i === this.menuParent.length) {
        return nameList
      }
      const id = this.menuParent[i]
      let items = []
      for (let j = 0, len = list.length; j < len; j++) {
        const item = list[j]
        if (item.id === id) {
          nameList.push(item.name)
          if (
            item.children !== undefined &&
                        item.children.length > 0
          ) {
            items = item.children
          }
          break
        }
      }
      return this.searchParentName(++i, items, nameList)
    }
  },
  filters: {
    is_publicaca: function(value) {
      return value === 1 ? '是' : '否'
    }
  }
}
</script>
