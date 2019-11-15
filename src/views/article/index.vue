<template>
<div>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>全部图文</span>
    </div>
    <div class="text item">
        <el-form>
            <el-form-item label="活动名称：">
              <el-radio-group  v-model="getArticleList.status" @change="getarcList ()">
                <el-radio  label="">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表：">
                <el-select v-model="getArticleList.channel_id" placeholder="请选择" @change="getarcList ()">
                    <el-option
                    v-for="item in channelList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择：">
                <el-date-picker
                clearable
                v-model="dataQJ"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
        </el-form>

    </div>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>获取到文章{{total}}篇</span>
    <el-button style="float: right; padding: 3px 0" type="text">频道列表</el-button>
  </div>
  <div class="text item">
      <el-table  :data="arclist"  style="width: 100%">
        <el-table-column prop="title" label="标题"  width="180"></el-table-column>
        <el-table-column label="截图"  width="300">
          <template slot-scope='stv'>
            <img :src="stv.row.cover.images[0]" />
          </template>
        </el-table-column>
        <el-table-column label="状态" width="160">
          <!--如果当前内容区域中多个标签都使用了 作用域插槽，
              可以优化为：提供一个父级的template标签统一使用作用域插槽-->
          <template slot-scope="stv">
            <el-tag v-if="stv.row.status===0">草稿</el-tag>
            <el-tag v-else-if="stv.row.status===1" type="success">待审核</el-tag>
            <el-tag v-else-if="stv.row.status===2" type="info">审核通过</el-tag>
            <el-tag v-else-if="stv.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-else type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"  width="180"></el-table-column>
        <el-table-column label="操作"  width="180">
          <template slot-scope='st' >
          <el-button size="mini" type="primary" plain @click="articleedit(st.row.id)">修改</el-button>
          <el-button size="mini" type="warning" plain @click="articledel(st.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
  <div class="text item">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="getArticleList.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="getArticleList.per_page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</el-card>
</div>
</template>

<script>

export default {
  name: 'arclist',
  created () {
    this.getChannels()
    this.getarcList()
  },
  data () {
    return {
      dataQJ: [],
      getArticleList: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1, // 当前页页码
        per_page: 10// 每页文章条数

      },
      channelList: [],
      arclist: [],
      total: 0
    }
  },
  methods: {
    // 每页显示条数变化的处理事件
    handleSizeChange (val) {
      // val是变化后的每页条数
      this.getArticleList.per_page = val
      this.getarcList()
    },
    // 当前页码变化的处理事件
    handleCurrentChange (val) {
      // val是变化后的页码数字
      this.getArticleList.page = val
      this.getarcList()
    },
    // 获取文章分类
    getChannels () {
      this.$http.get('/mp/v1_0/channels')
        .then(res => {
          if (res.data.message === 'OK') {
            this.channelList = res.data.data.channels
          }
        })
        .catch(err => {
          return this.$message.error('' + err)
        })
    },
    getarcList () {
      // 过滤参数数据后再进行发送请求参数，遍历参数对象，如果有数据就添加到对象，如果没数据，就不添加
      let newlist = {}
      for (var key in this.getArticleList) {
        if (this.getArticleList[key] || this.getArticleList[key] === 0) {
          newlist[key] = this.getArticleList[key]
        }
      }
      this.$http.get('/mp/v1_0/articles', { params: newlist })
        .then(res => {
          if (res.data.message === 'OK') {
            this.arclist = res.data.data.results
            this.total = res.data.data.total_count
          }
        })
        .catch(err => {
          return this.$message.error('获取文章失败' + err)
        })
    },
    // 删除单个文章
    articledel (id) {
      if (id) { // 如果id满足条件再执行删除
        this.$http.delete('/mp/v1_0/articles/' + id)
          .then(res => {
            this.getarcList()
            return this.$message.success('文章删除成功!')
          })
          .catch(error => {
            return this.$message.error('获取文章失败' + error)
          })
      }
    }
  },
  watch: {
    dataQJ (newv) {
      if (newv) {
        this.getArticleList.begin_pubdate = newv[0]
        this.getArticleList.end_pubdate = newv[1]
        this.getarcList()
      } else {
        this.getArticleList.begin_pubdate = ''
        this.getArticleList.end_pubdate = ''
        this.getarcList()
      }
    }
  }
}
</script>
<style lang='less' scoped>
.el-table__row{
  .cell{
    img{
      width: 200px;
      height: 130px
    }
  }
}
.el-pagination{
  margin-top: 20px
}
</style>
