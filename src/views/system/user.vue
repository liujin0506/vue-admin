<style lang="scss">
</style>

<template>
  <div class="user">
    <div class="operate-container">
      <el-button class="operate-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>

    <div class="search-container">
      <el-form ref="filters" :model="filters" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名/姓名" prop="name">
              <el-input v-model.trim="filters.name" placeholder="请输入内容" clearable/>
            </el-form-item>
          </el-col>
          <el-col v-if="0" :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="filters.status" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
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
          <el-table-column prop="id" label="ID" width="70"/>
          <el-table-column prop="username" label="用户名"/>
          <el-table-column prop="nickname" label="姓名"/>
          <el-table-column label="角色">
            <template slot-scope="scope">
              {{ scope.row.roles | role_name }}
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号"/>
          <el-table-column prop="lastlogin_time" label="最近登录"/>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-tag :type="scope.row.state === 'enable' ? 'primary' : 'danger'">{{ scope.row.state | state }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button type="success" size="mini" @click="handleRole(scope.row.id)">角色</el-button>
              <el-button type="warning" size="mini" @click="handlePass(scope.row.id)">密码</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination :current-page.sync="filters.page" :page-sizes="[20, 30, 50, 1000]" :page-size="filters.per_page" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </el-card>
    </div>

    <div class="editor-container">
      <el-dialog :title="editorStatus == 1 ? '新增' : '编辑'" :visible.sync="editorVisible">
        <el-form ref="editor" :model="editor" :rules="editorRules" label-width="120px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model.trim="editor.username" placeholder="请输入内容" clearable/>
          </el-form-item>

          <template v-if="editorStatus == 1">
            <el-form-item label="密码" prop="pass">
              <el-input v-model.trim="editor.pass" type="password" placeholder="请输入内容" auto-complete="off" clearable/>
            </el-form-item>
            <el-form-item label="确认密码" prop="check_pass">
              <el-input v-model.trim="editor.check_pass" type="password" placeholder="请输入内容" auto-complete="off" clearable/>
            </el-form-item>
          </template>

          <el-form-item label="姓名" prop="real_name">
            <el-input v-model.trim="editor.real_name" placeholder="请输入内容" clearable/>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model.trim="editor.phone" placeholder="请输入内容" clearable/>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model.trim="editor.email" placeholder="请输入内容" clearable/>
          </el-form-item>

          <el-form-item label="头像">
            <pan-thumb v-show="editor.avatar" :image="editor.avatar"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editorVisible = false">取消</el-button>
          <el-button v-if="editorStatus==1" :loading="editorLoading" type="primary" @click="createData">提交</el-button>
          <el-button v-else :loading="editorLoading" type="primary" @click="updateData">提交</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="passVisible" title="修改密码">
        <el-form ref="pass" :model="editor" :rules="editorRules" label-width="120px">
          <el-form-item label="密码" prop="pass">
            <el-input v-model.trim="editor.pass" type="password" placeholder="请输入内容" auto-complete="off" clearable/>
          </el-form-item>
          <el-form-item label="确认密码" prop="check_pass">
            <el-input v-model.trim="editor.check_pass" type="password" placeholder="请输入内容" auto-complete="off" clearable/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="passVisible = false">取消</el-button>
          <el-button :loading="passLoading" type="primary" @click="changePass">提交</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="roleVisible" width="540px" title="角色">
        <el-transfer
          :props="{
            key: 'id',
            label: 'name'
          }"
          :titles="['未包含角色', '已包含角色']"
          v-model="selectRole"
          :data="roleList"
          filterable
          filter-placeholder="请输入角色名称"/>
        <span slot="footer" class="dialog-footer">
          <el-button @click="roleVisible = false">取消</el-button>
          <el-button :loading="roleLoading" type="primary" @click="changeRole">提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  userList,
  deleteUser,
  createUser,
  updateUser,
  changePassword,
  roleListByUser,
  createRoleByUser,
  changeStatus
} from '@/api/system/user'
import { roleList } from '@/api/system/role'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'Custom',
  components: { PanThumb },
  filters: {
    state(state) {
      return state === 'enable' ? '正常' : '禁用'
    },
    role_name(roles) {
      const result = []
      if (roles && roles.length > 0) {
        roles.forEach(item => {
          result.push(item.name)
        })
      }
      return result.join('、')
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.editor.check_pass !== '') {
          if (this.passVisible !== true) {
            this.$refs.editor.validateField('check_pass')
          } else {
            this.$refs.pass.validateField('check_pass')
          }
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.editor.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      options: [
        {
          value: 'enable',
          label: '正常'
        },
        {
          value: 'disable',
          label: '禁用'
        },
        {
          value: 'check',
          label: '待审'
        }
      ],
      loading: false,
      total: 0,
      filters: {
        name: null,
        status: null,
        page: 1,
        per_page: 20
      },
      editorStatus: 1,
      editorVisible: false,
      editor: {
        id: null,
        real_name: '',
        username: '',
        pass: '',
        check_pass: '',
        phone: '',
        email: '',
        avatar: ''
      },
      editorRules: {
        username: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            max: 10,
            message: '长度不能超过 10 个字符',
            trigger: 'blur'
          }
        ],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        check_pass: [
          {
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }
        ],
        real_name: [
          {
            max: 20,
            message: '长度不能超过 20 个字符',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            max: 20,
            message: '长度不能超过 20 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            max: 20,
            message: '长度不能超过 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      editorLoading: false,
      passVisible: false,
      passLoading: false,
      roleVisible: false,
      roleLoading: false,
      selectRole: [],
      roleList: [],
      list: []
    }
  },
  created() {
    this.getRoleList()
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const data = await userList(this.filters)
      this.list = data.data
      this.total = data.total
      this.loading = false
    },
    async getRoleList() {
      const data = await roleList()
      this.roleList = data.data
    },
    handleSizeChange(val) {
      this.filters.per_page = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.filters.page = val
      this.getList()
    },
    resetFilters() {
      this.$refs['filters'].resetFields()
      this.getList()
    },
    resetEditor() {
      this.editor = {
        id: null,
        real_name: '',
        username: '',
        pass: '',
        check_pass: '',
        phone: '',
        email: '',
        avatar: ''
      }
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
    async handleRole(id) {
      this.editor.id = id
      this.roleVisible = true
      const data = await roleListByUser(id)
      const defaultChecked = []
      if (data.length !== 0) {
        data.forEach(item => {
          defaultChecked.push(item.id)
        })
      }
      this.$nextTick(() => {
        this.selectRole = defaultChecked
      })
    },
    handleDelete(id) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUser(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        })
        .catch(() => {})
    },
    handlePass(id) {
      this.resetEditor()
      this.editor.id = id
      this.passVisible = true
      this.$nextTick(() => {
        this.$refs['pass'].clearValidate()
      })
    },
    changePass() {
      this.$refs['pass'].validate(valid => {
        if (valid) {
          this.passLoading = true
          const params = {
            pass: this.editor.pass,
            check_pass: this.editor.check_pass
          }
          changePassword(this.editor.id, params).then(data => {
            this.passLoading = false
            this.passVisible = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
        }
      })
    },
    async changeRole() {
      this.roleLoading = true
      await createRoleByUser(this.editor.id, this.selectRole)
      this.roleLoading = false
      this.roleVisible = false
      this.$message({ type: 'success', message: '保存成功!' })
    },
    handleStatus(item, type) {
      changeStatus(item.id, type)
      item.status = Math.abs(item.status - 1)
    },
    cropSuccess(res) {
      this.editor.avatar = res.url
    },
    createData() {
      this.$refs['editor'].validate(valid => {
        if (valid) {
          this.editorLoading = true
          createUser(this.editor.id, this.editor)
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
          updateUser(this.editor)
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
