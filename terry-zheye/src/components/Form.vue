<template>
  <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <validate-input type="email" placeholder="请输入邮箱..." v-model="emailValue" :rules="emailRules"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <validate-input type="password" placeholder="请输入密码..." v-model="pwdValue" :rules="pwdRules"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from './ValidateInput.vue'
export default defineComponent({
  name: 'form',
  components: {
    ValidateInput
  },
  setup () {
    const emailValue = ref(null)
    const pwdValue = ref('')
    const emailRules: RulesProp = [
      {
        type: 'required',
        message: '邮箱必填'
      },
      {
        type: 'email',
        message: '请输入正确格式的邮箱'
      }
    ]
    const pwdRules: RulesProp = [
      {
        type: 'required',
        message: '密码必填'
      },
      {
        type: 'email',
        message: '请输入正确格式的密码'
      }
    ]
    return {
      emailRules,
      emailValue,
      pwdValue,
      pwdRules
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
