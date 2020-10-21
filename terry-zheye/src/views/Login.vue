<template>
  <h1>登录</h1>
  <ValidateForm @form-submit="_login" class="login">
      <div class="mb-3">
        <label class="form-label">用户名：</label>
        <validate-input
          :rules="usernameRules" v-model="username"
          placeholder="请输入用户名"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码：</label>
        <validate-input
          :rules="passwordRules" v-model="password"
          placeholder="请输入密码"
          type="password"
        />
      </div>
      <template #submit>
         <button class="btn btn-primary btn-large" @click="_toRegister">还没账号？立即注册</button>
        <button class="btn btn-primary btn-large">登录</button>
      </template>
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue' //, { RulesProp }
import ValidateForm from '@/components/ValidateForm.vue'
export default defineComponent({
  name: 'login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const store = useStore()

    const username = ref('111@test.com')
    const password = ref('111111')
    const usernameRules: RulesProp = [
      { type: 'required', message: '用户名不能为空' }
    ]

    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]

    const _login = async (result: boolean) => {
      if (result) {
        await store.dispatch('loginAndFetch', {
          email: username.value,
          password: password.value
        })
        router.push({
          path: '/Home/Index'
        })
      }
    }

    const _toRegister = () => {
      router.push({
        path: '/Register'
      })
    }
    return {
      username,
      password,
      usernameRules,
      passwordRules,
      _login,
      _toRegister
    }
  }
})
</script>

<style lang="scss" scoped>
    h1{
        margin: 30px;
    }
    .login{
        width: 20%;
        height: 300px;
        margin: 30px auto;
        // display: flex;
        // flex-direction: column;
        // justify-content: flex-start;
        // align-items: center;
        label{
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: left;
        }
    }
</style>
