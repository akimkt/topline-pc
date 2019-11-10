<template>
  <div id="login">
    <div class="login">
      <!--el-form是表单组件-->
      <!--ref是固定属性，每个表单的必须属性  使得可以获取当前的组件对象  this.$refs后期表单校验会使用-->
      <!--:model,必须属性，名称为model，对表单数据对象进行绑定，作用是要收集表单的全部数据，后期表单校验会使用-->
      <!--label-width设置项目名称宽度，非必须属性已删除-->
      <!-- rules表单验证规则，加上冒号，使得它可以访问data数据， -->
      <el-form ref="lgfRef" :model="lgfm" :rules="loginjy">
        <!--匿名插槽应用体现el-form内部有匿名插槽，el-form-item 会对应放入-->
        <!--el-form-item：是el-form的子组件(表单域项目体现)，每个el-form内部都有若干该组件-->
        <!--label：左侧显示的项目名称，非必须的-->
        <!--prop:定义被校验项目的名字，为了兼容性好，该名字与v-model的名字一致-->
        <img src="./logo_index.png" />
        <!-- prop会使得校验规则 与 当前项目联系 放在el-form-item中 建议和子组件的data数据名一样-->
        <el-form-item prop="mobile">
          <!--匿名插槽应用体现el-form-item内部有匿名插槽，el-input 会对应放入-->
          <el-input v-model="lgfm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="lgfm.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item style="text-align:left" prop="xieyick">
          <el-checkbox v-model="lgfm.xieyick" style="margin-right:10px;" ></el-checkbox>
          <span>我已阅读并同意用户协议和隐私条款{{lgfm.xieyick}}</span>
        </el-form-item>
        <el-form-item>
            <!-- type="primary"规定按钮为主要按钮，element组件包内置，蓝色按钮，意为主要的 -->
            <!-- 点击登录执行登录事件程序 -->
          <el-button type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginCom',
  data () {
    // 复选框
    var xieyiTest = function (rule, value, callback) {
      console.log(value)
      // rule:校验规则，一般不用
      // value:当前被校验的信息
      // callback：回调函数，校验成功或失败都需要执行
      // if (value) {
      //   callback()
      // } else {
      //   return callback(new Error('请无条件遵守规矩'))
      // }
      value ? callback() : callback(new Error('请勾选协议'))
    }
    return {
      lgfm: {
        mobile: '',
        code: '',
        xieyick: true
      },
      /// / 表单校验:rules和prop结合
      loginjy: {
        // 校验字段: [{ 规则 }, { 规则 }, { 规则 }]
        // mobile和上面的prop相对应，就是校验字段，mobile里的多个规则用对象封装，
        mobile: [
          // required规定数据是否必填,message校验错误提示信息
          { required: true, message: '手机号码必填' },
          // pattern正则表达式，不是element自身的，第三方async-validator
          //   正则中\d匹配任何一个数字，包括[0-9]和其他数字字符；
          { pattern: /^1[35789]\d{9}$/, message: '手机号码格式不对' }
        ],
        code: [{ required: true, message: '验证码必填' }],
        xieyick: [
          // { validator: 校验函数 }自定义校验函数，用于索引自定义的校验函数xieyiTest
          // required只校验 null   undefined 和空字符串 ,但是不校验false/true,所以需要自定义函数来校验协议
          { validator: xieyiTest }
        ]
      }
    }
  },
  methods: {
    login () {
      // this.$refs.lgfRef对应表单的ref属性获取当前el-from组件
      // el-form组件本身可以调用validate方法，实现对全部表单域项目做校验，返回值valid为布尔值
      this.$refs.lgfRef.validate(valid => {
        //   如果为真就是校验成功，然后下一步继续发送axios请求
        if (valid) {
          // 发送登录账号密码验证请求， this.lgfm是data数据双向绑定的表单数据对象形式，放上去刚好
          this.$http.post('/authorizations', this.lgfm)
            .then(res => { // 当执行成功了
              if (res.data.message === 'OK') {
                // 缓存获取的token数据存储，方便服务端在需要的时候取出来校验登录状态
                window.sessionStorage.setItem('userinfo', JSON.stringify(res.data.data))
                this.$router.push({ name: 'home' })// 进入/home页面，路由中路径和组件匹配新方法中name的用法实例
              }
            })
            .catch(err => {
              return this.$message.error('用户名或密码错误' + err)
            })
        }
      })
    }
  }

}
</script>
<style lang='less' scoped>
#login {
  background-color: gray;
  background-image: url("./login_bg.jpg");
  background-size: cover; //设置图片填满背景，不留空白
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 340px;
    background-color: white;
    text-align: center;
    img {
      width: 50%;
      margin: 20px 0;
    }
    //element组件的标签都自带同名的类名
    .el-form {
      width: 75%;
    }
  }
}
</style>
