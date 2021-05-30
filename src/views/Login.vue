<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img src="../assets/login/inner-login.png" height="295" width="363"/>
      </div>
      <div class="login-right">
        <div class="login-header">
          <span>MyHome | 后台系统</span>
        </div>
        <div class="login-input-box">
          <el-input size="large" v-model="loginObject.phone" placeholder="手机号码" prefix-icon="el-icon-mobile"></el-input>
          <el-input style="margin-top: 20px" ref="userNameInput" size="large" v-model="loginObject.password"
                    type="password"
                    placeholder="密码" prefix-icon="el-icon-lock"></el-input>
          <el-button type="primary" @click="doLogin">
            立即登录
          </el-button>
        </div>
        <div class="more-action-box">
          <div :to="'/devRegist'"><span>开发者注册</span></div>
          <div><span @click="gotoRegist">忘记密码？</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPermissionTree, getUserInfo, login } from '@/api/SystemConfigApi'
import { setToken } from '@/utils/TokenUtil'
import { setUserInfo } from '@/utils/UserInfoUtil'

export default {
  name: 'Login',
  data () {
    return {
      loginObject: {
        phone: '17317539623',
        password: '12345678'
      }
    }
  },
  methods: {
    doLogin () {
      if (this.phone === '' || this.password === '') {
        this.$message.error('用户名密码不能为空')
      } else {
        login(this.loginObject).then(res => {
          // 获取用户信息
          setToken(res.data)
          getUserInfo().then(result => {
            if (result.status) {
              setUserInfo(result.data)
              getPermissionTree().then(pRest => {
                this.$store.commit('setMenuPermission', pRest.data.menus)
                this.$store.commit('setButtonPermission', pRest.data.button)
                window.sessionStorage.setItem('permissions', JSON.stringify(pRest.data))
                const loading = this.$loading({ // 声明一个loading对象
                  lock: true, // 是否锁屏
                  text: '正在加载...', // 加载动画的文字
                  spinner: 'el-icon-loading', // 引入的loading图标
                  background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
                  target: '.sub-main', // 需要遮罩的区域
                  body: true,
                  customClass: 'mask' // 遮罩层新增类名
                })
                setTimeout(() => { // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
                  loading.close() // 关闭遮罩层
                  window.sessionStorage.setItem('activePath', 'dashBoard')
                  this.$router.push('/permissionManage')
                }, 1500)
              })
            }
          })
        })
      }
    },
    /**
     * 跳转开发者注册
     */
    gotoRegist () {
      this.$router.push('/devRegist')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url("~@/assets/login/login-back.jpg") center center fixed no-repeat;
  background-size: cover;

  .login-box {
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 1018px;
    height: 480px;
    border-radius: 20px;

    .login-left {
      background-color: mediumblue;
      border-radius: 20px 0 0 20px;
      width: 540px;
      height: 480px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-right {
      width: 492px;
      height: 480px;
      font-size: 28px;
      font-weight: 400;
      color: #A7ACFE;
      text-align: center;

      .login-header {
        margin-top: 60px;
      }

      .login-input-box {
        margin-top: 60px;
        padding-left: 20px;
        padding-right: 20px;

        .el-input {
          width: 350px
        }

        .el-button {
          margin-top: 60px;
          height: 48px;
          width: 350px;
          font-size: 14px;
        }
      }

      .more-action-box {
        margin-top: 20px;
        font-size: 12px;
        color: #c8c9cc;
        display: flex;
        justify-content: space-between;

        span {
          cursor: pointer;
        }
      }
    }
  }

}

</style>
