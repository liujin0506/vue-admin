<template>
  <div class="content-list">
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
      </el-form>
    </div>

    <div class="table-container">
      <el-card class="box-card">
        <el-table v-loading="listLoading" :data="list" border style="width: 100%">
          <el-table-column align="center" label="ID" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="300px" label="Title">
            <template slot-scope="scope">

              <router-link :to="'/cms/content/edit/'+scope.row.id" class="link-type">
                <span>{{ scope.row.title }}</span>
              </router-link>
            </template>
          </el-table-column>

          <el-table-column align="center" label="Actions" width="120">
            <template slot-scope="scope">
              <router-link :to="'/cms/content/edit/'+scope.row.id">
                <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page="listQuery.page"
          :page-sizes="[10,20,30, 50]"
          :page-size="listQuery.limit"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </el-card>
    </div>

  </div>
</template>

<script>
import { fetchList } from '@/api/cms/content'

export default {
  name: 'ContentList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      filters: {
        name: null,
        status: null,
        page: 1,
        per_page: 20
      },
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(data => {
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate() {

    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
