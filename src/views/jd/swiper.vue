<style lang="scss">
</style>

<template>
  <div class="role">
    <div class="operate-container">
      <el-button class="operate-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>

    <div class="search-container">
      <el-form ref="filters" :model="filters" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="幻灯片名称" prop="name">
              <el-input v-model.trim="filters.name" placeholder="请输入内容" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button size="small" type="primary" icon="el-icon-search" @click="getList">查询</el-button>
              <el-button size="small" icon="el-icon-refresh" @click="resetFilters">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="table-container">
      <el-card class="box-card">
        <el-table v-loading="loading" :data="list" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="title" label="幻灯片名称" width="350" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination :current-page.sync="filters.page" :page-sizes="[20, 30, 50, 100]" :page-size="filters.per_page" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-card>
    </div>

    <div class="editor-container">
      <el-dialog :title="editorStatus == 1 ? '新增' : '编辑'" :visible.sync="editorVisible">
        <el-form ref="editor" :model="editor" :rules="editorRules" label-width="120px">
          <el-form-item label="幻灯片名称" prop="title">
            <el-input v-model.trim="editor.title" placeholder="请输入内容" clearable/>
          </el-form-item>
          <el-form-item label="幻灯片排序" prop="sort">
            <el-input v-model.trim="editor.sort" placeholder="请输入内容" clearable/>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :action="uploadUrl"
              class="avatar-uploader"
              accept="image/*">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item label="是否可用" prop="status">
            <el-radio-group v-model="editor.status">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="幻灯片链接" prop="link">
            <el-input v-model.trim="editor.link" placeholder="请输入内容" clearable/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editorVisible = false">取消</el-button>
          <el-button v-if="editorStatus==1" :loading="editorLoading" type="primary" @click="createData">提交</el-button>
          <el-button v-else :loading="editorLoading" type="primary" @click="updateData">提交</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import {
  updateRole,
  deleteRole,
  menuListByRole,
  createMenuByRole
} from '@/api/system/role'
import { swiperList, createSwiper } from '@/api/jd/swiper'
import { acaList } from '@/api/system/aca'

export default {
  name: 'JdSwiper',
  components: {},
  data() {
    return {
      uploadUrl: process.env.BASE_API + '/system/upload',
      imageUrl: '',
      loading: false,
      total: 0,
      filters: {
        role_name: null,
        page: 1,
        per_page: 20
      },
      editorStatus: 1,
      editorVisible: false,
      editor: {
        id: null,
        title: null,
        thumb: '',
        sort: 0,
        area_id: 0,
        link: '',
        status: 0
      },
      editorRules: {
        title: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            max: 20,
            message: '长度不能超过 20 个字符',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            max: 20,
            message: '长度不能超过 255 个字符',
            trigger: 'blur'
          }
        ]
      },
      editorLoading: false,
      list: [],
      menuVisible: false,
      menuProps: {
        children: 'children',
        label: 'name'
      },
      menuLoading: false,
      menuList: []
    }
  },
  created() {
    this.getList()
    this.getMenuList()
  },
  methods: {
    async getList() {
      this.loading = true
      const data = await swiperList(this.filters)
      this.list = data.data
      this.total = data.total
      this.loading = false
    },
    async getMenuList() {
      const data = await acaList()
      this.menuList = data
    },
    resetFilters() {
      this.$refs['filters'].resetFields()
      this.getList()
    },
    handleSizeChange(val) {
      this.filters.per_page = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.filters.page = val
      this.getList()
    },
    resetEditor() {
      this.editor = {
        id: null,
        title: null,
        thumb: '',
        sort: 0,
        area_id: 0,
        link: '',
        status: 0
      }
      this.imageUrl = ''
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
      this.editor = Object.assign({}, item)
      this.$nextTick(() => {
        this.$refs['editor'].clearValidate()
      })
    },
    async handleMenu(id) {
      this.menuVisible = true
      this.editor.id = id
      const data = await menuListByRole(id)
      const defaultChecked = []
      if (data.length !== 0) {
        data.forEach(item => {
          defaultChecked.push(item.aca_id)
        })
      }
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(defaultChecked)
      })
    },
    async updateMenu() {
      const data = this.$refs.tree.getCheckedKeys(true)
      await createMenuByRole(this.editor.id, data)
      this.menuVisible = false
      this.$message({ type: 'success', message: '保存成功!' })
    },
    handleDelete(id) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRole(id).then(() => {
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
          createSwiper(this.editor)
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
          updateRole(this.editor.id, this.editor)
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = process.env.BASE_API + '/' + res.path
      this.editor.thumb = res.path
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style scoped>
.el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

