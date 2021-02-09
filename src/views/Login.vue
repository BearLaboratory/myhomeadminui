<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img src="../assets/inner-login.png" height="295" width="363"/>
      </div>
      <div class="login-right">
        <div class="login-header">
          <span>MyHome | 后台系统</span>
        </div>
        <div class="login-input-box">
          <el-input size="large" v-model="phone" placeholder="手机号码" prefix-icon="el-icon-mobile"></el-input>
          <el-input style="margin-top: 20px" ref="userNameInput" size="large" v-model="password" type="password"
                    placeholder="密码" prefix-icon="el-icon-lock"></el-input>
          <el-button type="primary" @click="doLogin">
            立即登录
          </el-button>
        </div>
        <div class="dev-regist-box">
          <span @click="gotoRegist">开发者注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo } from '@/api/sysuser'
import { setToken } from '@/utils/TokenUtil'
import { setUserInfo } from '@/utils/UserInfoUtil'

export default {
  name: 'Login',
  data () {
    return {
      backgroundImage: '~@/assets/login-back.jpg',
      phone: '',
      password: ''
    }
  },
  methods: {
    doLogin () {
      if (this.phone === '' || this.password === '') {
        this.$message.error('用户名密码不能为空')
      } else {
        login({
          phone: this.phone,
          password: this.password
        }).then(res => {
          // 获取用户信息
          setToken(res.data)
          getUserInfo().then(result => {
            if (result.status) {
              setUserInfo(result.data)
              this.$message.success('登录成功')
              window.sessionStorage.setItem('activePath', 'dashBoard')
              this.$router.push('/')
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
  background: url("~@/assets/login-back.jpg") center center fixed no-repeat;
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

      .dev-regist-box {
        margin-top: 20px;
        font-size: 12px;
        color: #c8c9cc;

        span {
          cursor: pointer;
        }
      }
    }
  }

}

</style>
