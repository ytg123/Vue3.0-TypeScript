<template>
  <h1>注册</h1>
  <ValidateForm @form-submit="_register" class="login">
      <div class="mb-3">
        <label class="form-label">昵称：</label>
        <validate-input
          :rules="usernameRules" v-model="nickName"
          placeholder="请输入昵称"
          type="text"
        />
      </div>
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
      <div class="mb-3">
            <label class="form-label">确认密码：</label>
            <validate-input
            :rules="passwordRules" v-model="passwordconfirm"
            placeholder="请输入密码"
            type="password"
            />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">注册</button>
      </template>
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue' //, { RulesProp }
import ValidateForm from '@/components/ValidateForm.vue'
import axios from 'axios'
import $Api from '@/common/api'
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
    const passwordconfirm = ref('')
    const nickName = ref('努力今朝')

    const usernameRules: RulesProp = [
      { type: 'required', message: '用户名不能为空' }
    ]

    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      {
        type: 'custom',
        message: '两次密码输入不一样',
        validator: () => {
          return passwordconfirm.value === password.value
        }
      }
    ]

    const _register = async (result: boolean) => {
      if (result) {
        const { data: { msg } } = await axios({
          method: 'post',
          url: $Api.register,
          data: {
            email: username.value,
            nickName: nickName.value,
            password: password.value
          }
        })
        if (msg === '请求成功') {
          router.push({
            path: '/Login'
          })
        }
      }
    }
    return {
      username,
      password,
      nickName,
      usernameRules,
      passwordRules,
      _register
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
