<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <span>添加文章</span>
    </div>
    <div class="text item">
        <!-- ref获得当前组件对象，点击时实现对表单整体校验，返回值valid布尔值
            :model绑定收集表单数据成对象格式，用来提供给axios请求
            rules:对每个表单域设置规则
        -->
      <el-form ref="addform" :model="arcaddform" :rules="arcaddrule">
        <el-form-item label="文章标题：" prop="title" label-width="100px">
          <el-input v-model="arcaddform.title"></el-input>
        </el-form-item>

        <el-form-item label="内容区域" prop="content" label-width="100px">
              <quill-editor v-model="arcaddform.content"></quill-editor>
        </el-form-item>

        <el-form-item label="封面" label-width="100px">
              <el-radio-group v-model="arcaddform.cover.type">
                <el-radio  :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
        </el-form-item>
        <el-form-item label="传图" label-width="">

        </el-form-item>

        <el-form-item label="频道" prop="channel_id" label-width="100px">
          <el-select v-model="arcaddform.channel_id" placeholder="请选择">
            <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" " label-width="100px">
            <el-button type="primary" @click="arcadd(false)">发布文章</el-button>
            <el-button  @click="arcadd(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>

// 引入富文本编辑器css
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 按需引入组件
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'arcadd',
  components: {
    quillEditor
  },
  data () {
    return {
      arcaddform: {
        title: '',
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: '' // 频道
      },
      channelList: [],
      arcaddrule: {
        //   检查prop中的内容是否符合规则
        title: [
          { required: true, message: '请填写标题' },
          { min: 5, max: 60, message: '标题长度介于5-30个字符' }
        ],
        content: [
          { required: true, message: '内容必填' }
        ],
        channel_id: [
          { required: true, message: '频道必选' }
        ]
      }
    }
  },
  methods: {
    getChannels () {
      this.$http.get('/mp/v1_0/channels')
        .then(res => {
          if (res.data.message === 'OK') {
            this.channelList = res.data.data.channels
          }
        })
        .catch(err => {
          return this.$message.error('获取列表失败' + err)
        })
    },
    // 添加文章
    arcadd (draft) {
      // 校验当前表单填写情况
      this.$refs.addform.validate(valid => {
        console.log(valid)
        if (valid) {
          this.$http.post('/mp/v1_0/articles', this.arcaddform, { params: { draft } })
            .then(res => {
              this.$message.success('文章发布成功')
              this.$router.push('/article')
            })
            .catch(error => {
              return this.$message.error('发布文章失败' + error)
            })
        }
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>
<style lang='less' scoped>
.el-form{
min-width: 900px;
.el-form-item /deep/ .ql-editor{
    height: 300px;
    
}
}
</style>
