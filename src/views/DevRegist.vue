<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img src="../assets/login/inner-login.png" height="295" width="363"/>
      </div>
      <div class="login-right">
        <div class="login-header">
          <span>MyHome | 开发者注册</span>
        </div>
        <div class="login-input-box">
          <el-input size="large" v-model="regitData.phone" placeholder="手机号码" prefix-icon="el-icon-mobile"></el-input>
          <el-input size="large" v-model="regitData.email" placeholder="邮箱" prefix-icon="el-icon-mobile"></el-input>
          <el-input size="large" v-model="regitData.name" placeholder="昵称" prefix-icon="el-icon-mobile"></el-input>
          <el-input size="large" v-model="regitData.password" placeholder="密码（长度6位以上）"
                    prefix-icon="el-icon-mobile"></el-input>
          <el-input size="large" v-model="rePassword" placeholder="重复密码" prefix-icon="el-icon-mobile"></el-input>
          <el-button type="primary" @click="doRegist">
            立即注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { devRegist } from '@/api/sysuser'

export default {
  name: 'DevRegist',
  data () {
    return {
      regitData: {},
      rePassword: ''
    }
  },
  methods: {
    doRegist () {
      devRegist(this.regitData).then(res => {
        if (res.status) {
          this.$message.success('注册成功，请登录')
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url("~@/assets/login/login-back.jpg") center center fixed no-repeat;
  background-size: cover;

  .regist-box {
    display: flex;
    justify-content: flex-start;
  }

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
