<template>
<el-container>
  <el-aside :width="isCollapse?'65px' :'200px'">
    <!-- <aki-aside></aki-aside> -->
    <div class="logo">
      <h2>黑马头条</h2>
      <!-- <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAAAoCAYAAADg1CgtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTg3RjBBMDcxOEEyMTFFOThEODI4NjFFNkZBMUY2ODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTg3RjBBMDgxOEEyMTFFOThEODI4NjFFNkZBMUY2ODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ODdGMEEwNTE4QTIxMUU5OEQ4Mjg2MUU2RkExRjY4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1ODdGMEEwNjE4QTIxMUU5OEQ4Mjg2MUU2RkExRjY4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuQY0pYAAAriSURBVHja7F19cFxVFb+bxDbUKl1KpUA1Q6oNSspQXhl0BGcattU//BjHLuj4+U8TUfxgxmHDMINFp2MWUZAWy9YS8BNJClMRitPdKRVhLLKrleAHaNLQ1qYI7IIFEjDJeg57Xji5ufe9d9+729b0nZnfZPftvffdd+/vnXvOuee9JKrVqgghDYAVgEsADmAZ4EzAmwFvArwIGAE8AfgjYDegKGKJhUnCkHynA74E+BzgHYbnGgbcCbgZcDhkf78AuCOethOLfKcCvglYB5gb8ZxjgNsA6wHPGdT7KOB6wNnxtM0OaQhQZi3gb4ArLBAPpRnwZcBTgE8HrLMc8AvAs/GUnRjka6Qlsp80nywvA7bRMvw+wGmAkwBNgMWA9xPJ7qaysiQBPwPkyE7UyRLADrInD8dTNosEl10FTgL8qqqWfYDLAfM1dXXtYZ0hTZu/AcxV1JsHeJyVu8ngnDGOczRoNN4vycbi8irZfWhzbQa8ZMDxUaqDdTP0ncsHAX2AOVI/7qQl15VY883yZff7CuLtB1wE+BaRMKy8Rk4DLslPKxyKm9j3jYp+xOSbxd5umjQQl78C1gD+ZfncaCPuArxHOn4p4G2ATYo62I+89mISiXhGZ5pVrfCnlb4OwRgNWWo3w772h2mXk+8UwN8Bi9jvB8mZOFinscHA9O8AZ7kHnnzyqZfa2pah4zJBh/hSfC5gwI98cE0OOTQ2pQTtVzSTm7Z4jkLAye8kMhUCkKSHvnZD+awl4rltFqDN1VEdjk2SE/Aq4MKjYHiupHNVd+7MV0dHR6uHRkae1zgni7zaYteUr9qXlGb8UhbPkTGYNy5FQI+qj9hmmPa9SG/rGpvoL+5WrJPOg7bZo4rznwxApr+XNFeSluQ9gO0hYnHFycnJ6zZvzm3o6Fgl7rt/h/jAxRedQpqYSzlE27gUbNH8liIIKqNaNlCrdQY4R3eE+eT9MJEC9Q/hEJBor1+zDQ0nkS5JzmLGZqOIDRI7DwKaJc1yLuAngFc8WD1KGjRpov0GBgZOvfHGHzx3W+/t1fHxcVW7qBnX+LWj0Hx5pp0ytFSpNELKXULpeEah1VKiDhJVM7E+F1k7ecvto1Yts3bKZG74ElbqV5FIPFWgAfC0NNlfZ5O6EHALYNxAtY4AOgwIuHB4ePhxTVt4oZcEaceDfGn6PuhDPvdY0ZR8NEF5PvFHg3xSWw4gZ4t8UL7PY45z04ikJq2eeBRqccT0JAEMpfyYlhJ0Bv5BuxiNBv3GHY4HyHP1k5WAx1paWpbLP4yNjR2APxcDngcsiGLIu8uozx3rSOVNxImwhNoJXSQS6LB0BRx3E7MF21xKc+WaJ7iK5Mm5k4mHDlhRGs/VssOG5Fsl1d0JwEK47TU3gteIXupPAR0eZXC/+GHu7bqybdvdYuvW3ocp9oc3wcsRJmWIbCSh80zprnSJ038ch04c0kgZ0sxJxfVWLJEZveMuANqQ6FmXiID97IZznZ0k9S1P4Tq3X1mot1LVpybGTlcepL8Viqv9BXBGBALeBTgfcIAdfytgq4oIR44cEb/f86hYvrxdrF37iU/RYSTxfyOOZTeRSzcxOFhZGvQCcziON0nSuKUZIUtEiC22iOdBSGz/UtJuOepPhjRhUtKaXV6hINR8corSXvb5BcCVmrr7AvYXkxJ6sd/0/TxSyUoN1NzcLNasTom2tjb3EMb7vhNyrLgD4Wq1pPRdKCYT6/SwWJbQeMPHQkp0I/WzG8mhvpZthFMM+pGVbgrBFFfW13yBzv5bMiTPUhjzOxQGZxaw18AJuQ5wFXnEJnJtUMeljnE+3wmVzhlYY1rwRtNk/JdlT9emQ8MiBniuQcUY9WnG3V2W0/K44LI7XzpPRWOb4c7CPHbsAC2dGwP2/1rTC96160HR0bFqQ8gl1s9WTbMYXrfHXRp0S4qXwUnYYhDnm/rMbqIK2loBlkHUgP1Qr5uux7FkW3ZS31o1bZbIji7RLkeF7fikGBxeH36vUJ2SUGiiBRrNcjUrU6EQzEeqdZL7dzxQXXH+BeMm8cIIIY6UhclypFhYVMlbIlEm5A4K12J50nhKJ4d2PfKETsW4dLJQ1NQYoeY7ImrZxXztfkHRnxtELfP4HCo/T6iTTCPJ2NiYuHnjJnHPPdvFO5cuHQ0TFBXB9lqn2XyqkIG8InhpIvQEoY2lAXZEPG3UiPV1bYaxW7vpmoPU4ZGCgjwuqlUFSYzkw6fMeDJBi8aZQG/zK6KWiYLku0zUnlqzxruRkZHdvbff8aH29nbx63u3i98+9NBIyMHuMawTZMILQr9Vxz3BbAQtlfLqSzXko4ZM+nyamEoSoJspGXBVaJWcPN866AVjVgvaDGvZ8SvF9Lw6Wb5BA3QNebHzLRDvP4DBiYmJcxobG1/PYjl8+BmxePFp98LHjxmEAdx4XRC7J6jNxzVfSdRRaNLyMhEsks/3BuPnlPpjO2STaKJB5+Tr8CHfDYTrLRHPjfutAOLVYisTE0g8/PhYyDhUIcBEc4IGTmU6lpIwTFikWFyfdJ0rDZoImjSRkpbdQGPZRMsoF2T+Ao3d58pC8oDrIi4JWcDbxN4LGubg5RwDpVJinp0trdAfxLMNIfISjteZCnqjkb2XDTDu3IYuBM6oocSC/ZKn9VUfz/Jr1frLIUCjYW5g5ij0K8WXQZtxRCmRIRKxpbEYlD4nQ7bZqfKcdR4182wHdZpvUtQeYbxasuvwThzT9GON5Tt0krzuk9mxn4s3splNo//1lCFplbDdpq0YHXe6usQbuyCuQ9Zl2Ka7jebGgoNo6qx7TiTlDI1IGuNMwJh0N6730DB7Ld71jwB+KB17DdBimhX9/y5RNR95pz3SWHZqYnc5w7Zzunihh+ZLMq1bnhHO8kmjv0Az0XsiEu4ZwGZAO2CFgvg/CpOSrxioPulay/KESOXzigCp8ZbZsSAfLYmDUh5kSkHOogkBqU6fVx2vQLYUfC+TEzSDfLhj8axEggOAJYqJvkZDqhcBfwDspgfBsdO9lIyK2dKfJ8I1UDuLAf9UJI8uCks+SmKsakjWpyFlWkcyNlm5OhPPd5JVDhZNvEy6jE+iZ4+09+p4lOPEyYTZRaF+yjsmKXkCL1MQ6gnA6VK5JBHNNWBx8/9sQ7Ig8QYU5/ts2IeRFAOR1A2SYoDKPktK2aZNxraj8vK2k88DS44ibd6dh0xQZ4K0LCdtRjFeLjlVv01lDEl97/Q5Z26KyIpJvFVBiGF6yoyXWwf4HmBOCKKcp8mM2BrlSTjJrimq4l7sXI70m7JePZ7j8PHKy7oJVNQbJO3kROzLoObGSwY0EbSp8l6aXvWKNPSA8eU+qtdlfBvwXVF780AYmUM7KOvF9P1kQZH0D0do293hyLAdiS2KOGCaxdaGpGi+Q+1kNXWsBKO94pFe7RMpW8k7Lth6AJy1XaEsmaDXwPfQKzSmgZNZde/nw6SBu4gMsuwj9xlfWRb0fS34EDgmJVwFeJfid0zd/zjgFRHLCSNeL4dEDYi5el/U/I7Eu492If4kam8edVmPOyRvJ03SQSR+i6Yd3B++PIrGi2X2kc+VTwJuETMf4o4qSNQrSIPGcgJKkDeT4uvS3k0RbRvaCdvADOhlMfFizWdSfglpq8+I2qsyTOSQqG2Z4dun9sdDH0uiGv5fIVwoanub+OYofALuDGbX4T4tJoLiW6/+LGr/CuERYb5XG8sslv8JMAA4E/ZVJ3RXwgAAAABJRU5ErkJggg==" /> -->
    </div>
    <el-menu
    router
    :collapse="isCollapse"
    :collapse-transition="false"
     default-active="2"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#fff"
      :width="isCollapse? '65px' : '200px' "
      >
      <el-menu-item index="1" style="width:200px">
        <i class="el-icon-location"></i>
        <span slot="title">后台主页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
          <el-menu-item index="/articleadd">发布文章</el-menu-item>
          <el-menu-item index="/article">文章列表</el-menu-item>
          <el-menu-item index="1-3">添加分类</el-menu-item>
          <el-menu-item index="1-4-1">文章分类</el-menu-item>
        </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
      <div class="topl">
            <i slot="prefix" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" style="cursor:pointer;"
  @click="isCollapse=!isCollapse"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
      </div>
      <div class="topr">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <span>消息</span>

        <el-dropdown>
            <span class="el-dropdown-link">
                      <img :src="photo" alt="" width="40px">
                  {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>github地址</el-dropdown-item>
        <el-dropdown-item @click.native="loginOut()">退出</el-dropdown-item>
        </el-dropdown-menu>
</el-dropdown>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      input: '',
      isCollapse: false
    }
  },
  computed: {
    name () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).name
    },
    photo () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).photo
    }

  },
  methods: {
    loginOut () {
      this.$confirm('确定退出吗？', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出登录成功!'
        })

        this.$router.push('/login')
        window.sessionStorage.clear()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style lang='less' scoped>
.el-container{
  height:100%;
  // background-color: #2e2f32;
  color: #2c3e50;
  .el-aside{
    background-color: #323745;
    width: 100%;
    .logo{
      background-color: #2e2f32;
      padding: 15px;
      color: #fff;

    }
    .el-menu{
        background-color: rgb(53, 59, 78);
        .el-submenu{
          width: 200px;
          .el-menu-item:hover{
          background-color: #3296fa!important;
          }
          .el-submenu__title:hover{
            background-color: #2e2f32;
          }
        }
        .el-menu-item.is-active{
              width: 200px;
              color: #fff;
              &:hover{
                background-color: rgb(42, 47, 62);
              }
            }

    }
  }

  //头部
  .el-header{
    display:flex;
    min-width: 900px;
    justify-content: space-between;
    .topl{
      height: 100%;
      width: 40%;
            display:flex;
      align-items: center;
      font-size: 20px;
    }
    .topr{
      width: 60%;
      height: 100%;
      display:flex;
      justify-content: flex-end;
      align-items: center;
      .el-input{
        width: 300px;
        padding-right: 20px;
      }
      .el-dropdown{
        .el-dropdown-link {
          display: flex;
          align-items: center;
        }
      }

    }
  }
  .el-main{
    background-color: #f2f3f5;

  }
}
</style>
