<style lang="scss">
</style>

<template>
  <div class="goods">
    <div class="operate-container">
      <el-button class="operate-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>
    <div class="search-container">
      <el-form ref="filters" :model="filters" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="商品名称" prop="keyword">
              <el-input v-model.trim="filters.keyword" placeholder="请输入内容" clearable @change="getList"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品 skuId" prop="sku_id">
              <el-input v-model.trim="filters.sku_id" placeholder="请输入内容" clearable @change="getList"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="推荐状态" prop="is_recommend">
              <el-select v-model="filters.is_recommend" clearable placeholder="请选择" @change="getList">
                <el-option label="全部" value="-1"/>
                <el-option label="未推荐" value="0"/>
                <el-option label="已推荐" value="1"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="table-container">
      <el-card class="box-card">
        <el-table v-loading="loading" :data="list" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="70" />
          <el-table-column prop="sort" label="排序" width="50" />
          <el-table-column label="栏目" width="100">
            <template slot-scope="scope">
              {{ scope.row.cid_name }}
            </template>
          </el-table-column>
          <el-table-column prop="sku_id" label="商品 skuId" width="120" />
          <el-table-column prop="goods_name" label="商品名称" />
          <el-table-column prop="commision_ratio_wl" label="返佣比例" width="90" />
          <el-table-column prop="wl_unit_price" label="京东价格" width="100" />
          <el-table-column prop="discount" label="优惠金额" width="100" />
          <el-table-column prop="coupon_num" label="优惠券数量" width="100" />
          <el-table-column label="推荐状态" width="100">
            <template slot-scope="scope">
              <el-button v-if="scope.row.is_recommend === 1" type="info" size="mini" @click="handleRecommend(scope.row.id, 0)">取消</el-button>
              <el-button v-if="scope.row.is_recommend === 0" type="danger" size="mini" @click="handleRecommend(scope.row.id, 1)">推荐</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination :current-page.sync="filters.page" :page-sizes="[20, 30, 50, 100]" :page-size="filters.per_page" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-card>
    </div>

    <div class="editor-container">
      <el-dialog :title="editorStatus == 1 ? '新增' : '编辑'" :visible.sync="editorVisible">
        <el-form ref="editor" :model="editor" :rules="editorRules" label-width="120px">
          <el-form-item v-if="editorStatus == 2" label="商品名称" prop="goods_name">
            <el-input v-model.trim="editor.goods_name" placeholder="请输入内容" clearable disabled/>
          </el-form-item>
          <el-form-item v-if="editorStatus == 1" label="商品 skuId" prop="sku_id">
            <el-input v-model.trim="editor.sku_id" placeholder="请输入内容" clearable/>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model.trim="editor.sort" placeholder="请输入序号，越大越靠前" />
          </el-form-item>
          <el-form-item label="是否推荐" prop="is_recommend">
            <el-radio-group v-model="editor.is_recommend">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
            <div>推荐后才会在首页显示哦~</div>
          </el-form-item>
          <el-form-item label="自定义文案" prop="slogan">
            <el-input v-model.trim="editor.slogan" :autosize="{ minRows: 6, maxRows: 10}" type="textarea" placeholder="请输入内容"/>
            <div>替换标签：
              <a @click="addText('[title]')">[title]-</a>商品名称
              <a @click="addText('[price]')">  [price]-</a>京东价格
              <a @click="addText('[realprice]')">  [realprice]-</a>内购价
              <a @click="addText('[link]')">  [link]-</a>推广链接
              | 工具：
              <a @click="addText('—————————')"> 分割线 </a>
              <a @click="addText('👉')"> 👉 </a>
            </div>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              :show-file-list="false"
              :on-success="handleAdSuccess"
              :action="uploadUrl"
              :headers="headers"
              class="avatar-uploader"
              accept="image/*">
              <img v-if="adUrl" :src="adUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品二维码图片">
            <el-upload
              :show-file-list="false"
              :on-success="handleAdQrSuccess"
              :action="uploadUrl"
              :headers="headers"
              class="avatar-uploader"
              accept="image/*">
              <img v-if="adQrUrl" :src="adQrUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
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
import { goodsList, updateGoods, createGoods } from '@/api/jd/goods'
import { getToken } from '@/utils/auth'

export default {
  name: 'JdGoods',
  components: {},
  data() {
    return {
      uploadUrl: process.env.BASE_API + '/system/upload',
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      adUrl: '',
      adQrUrl: '',
      loading: false,
      total: 0,
      filters: {
        keyword: null,
        sku_id: '',
        page: 1,
        per_page: 20,
        is_recommend: '-1'
      },
      editorStatus: 1,
      editorVisible: false,
      editor: {
        id: null,
        goods_name: null,
        sort: 0,
        is_recommend: 0,
        slogan: ''
      },
      editorRules: {
        sku_id: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            max: 15,
            message: '长度不能超过 15 个字符',
            trigger: 'blur'
          }
        ],
        goods_name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            max: 500,
            message: '长度不能超过 500 个字符',
            trigger: 'blur'
          }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
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
  },
  methods: {
    async getList() {
      this.loading = true
      const data = await goodsList(this.filters)
      this.list = data.data
      this.total = data.total
      this.loading = false
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
        goods_name: null,
        sort: 0,
        is_recommend: 0,
        slogan: '',
        ad_qr: '',
        ad: ''
      }
      this.adUrl = ''
      this.adQrUrl = ''
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
          updateGoods(id, { is_recommend: handle }).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getList()
          })
        })
        .catch(() => {})
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
        goods_name: item.goods_name,
        sort: item.sort,
        is_recommend: item.is_recommend,
        slogan: item.slogan,
        ad: item.ad,
        ad_qr: item.ad_qr
      }
      this.adUrl = item.ad ? process.env.BASE_API + '/' + item.ad : ''
      this.adQrUrl = item.ad_qr ? process.env.BASE_API + '/' + item.ad_qr : ''
      this.$nextTick(() => {
        this.$refs['editor'].clearValidate()
      })
    },
    updateData() {
      this.$refs['editor'].validate(valid => {
        if (valid) {
          this.editorLoading = true
          updateGoods(this.editor.id, this.editor)
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
    createData() {
      this.$refs['editor'].validate(valid => {
        if (valid) {
          this.editorLoading = true
          createGoods(this.editor).then(data => {
            this.editorLoading = false
            this.editorVisible = false
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.getList()
          }).catch(() => {
            this.editorLoading = false
          })
        }
      })
    },
    addText(text) {
      this.editor.slogan += text
    },
    handleAdSuccess(res, file) {
      this.adUrl = process.env.BASE_API + '/' + res.path
      this.editor.ad = res.path
    },
    handleAdQrSuccess(res, file) {
      this.adQrUrl = process.env.BASE_API + '/' + res.path
      this.editor.ad_qr = res.path
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  .el-form-item {
    margin: 0;
  }
}
.avatar-uploader {
  .avatar-uploader-icon {
    border:dashed 1px #dcdcdc;
    font-size: 28px;
    color: #8c939d;
    width: 360px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .avatar {
    width: 360px;
    height: 200px;
    display: block;
  }
}
</style>
