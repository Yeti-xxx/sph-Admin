<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px;"
      @click="dialogTableVisible = true">添加</el-button>
    <!-- 表格 -->
    <el-table :data="list" style="width:100%" border>
      <el-table-column type="index" prop="prop" label="序号" width="100px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width" align="center">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="(dialogTableVisible = true)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px;text-align:center;" @current-change="handelCurrentChange"
      @size-change="handelSizeChange" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total" :total="total">
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog title="添加品牌" :visible.sync="dialogTableVisible">
      <el-form style="width:80%;">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="品牌LOGO" label-width="100px">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tradeMark',
  data() {
    return {
      page: 1,
      limit: 3,
      // 总数据条数
      total: 0,
      list: [],
      dialogTableVisible: false,
      imgUrl: ''
    }
  },
  mounted() {
    // 获取列表数据方法
    this.getPageList()
  },
  methods: {
    // 获取品牌列表
    async getPageList() {
      const { page, limit } = this
      const res = await this.$api.tradeMark.reqTradeMarkLIist(page, limit)
      if (res.code == 200) {
        this.total = res.data.total
        this.list = res.data.records
        console.log(res);
      }
    },
    // 点击页码
    handelCurrentChange(page) {
      this.page = page
      this.getPageList()
    },
    // 点击页码
    handelSizeChange(size) {
      this.limit = size
      this.getPageList()
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }

  },
}

</script>
<style lang='scss'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
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
