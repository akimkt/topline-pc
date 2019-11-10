<template>
  <div class="login1">
    <img src="@/assets/logo.png" alt />
    <el-form ref="Formref" :model="Form" :rules="Formrules">
      <el-form-item prop="mobile">
        <el-input v-model="Form.mobile" placeholder="请输入用户名或手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="password" v-model="Form.code" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="reg">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'reg',
  data () {
    return {
      Form: {
        mobile: '',
        code: ''
      },
      Formrules: {
        mobile: [
          { required: true, message: '手机号码必填' },
          { pattern: /^1[35789]\d{9}$/, message: '用户名或手机号码格式不对' }
        ],
        code: [{ required: true, message: '密码必填' }]
      }
    }
  },
  methods: {
    reg () {
      // console.log(this.$refs.Formref.validate())
      this.$refs.Formref.validate(aaa => {
        console.log(aaa)
        console.log(this.Form)
        if (aaa) {
          this.$http.post('http://ttapi.research.itcast.cn/app/v1_0/authorizations', this.Form)
            .then(result => {
              console.log(result)
              if (result.data.message === 'OK') {
                this.$router.push('/login') // 进入首页
                window.sessionStorage.setItem('userinfo', JSON.stringify(result.data.data))
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      console.log(this)

      //   console.log(valid)
    }
  }
}
</script>

<style lang="less" scoped>
.login1 {
  width: 500px;
  border-radius: 8px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.527);
  margin: auto;
  display: flex;
  flex-direction: column;
  img {
    width: 35%;
    margin: auto;
  }
  .el-form {
    text-align: center;
    width: 75%;
    margin: auto;
  }
}
</style>
