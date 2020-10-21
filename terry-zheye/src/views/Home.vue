<template>
  <div class="container-fluid">
    <global-header :user="currentUser"/>
    <Loading v-if="isLoading" text="加载中..."/>
    <!-- <validate-form  @form-submit="onFormSubmit">
        <template #default>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <validate-input type="email" placeholder="请输入邮箱..." v-model="emailValue" :rules="emailRules"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <validate-input type="password" placeholder="请输入密码..." v-model="pwdValue" :rules="pwdRules"/>
            </div>
        </template>
    </validate-form> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import GlobalHeader from '../components/GlobalHeader.vue'
import { useStore } from 'vuex'
import Loading from '@/components/Loading.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// import ValidateForm from '../components/ValidateForm.vue'
// import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
// const currentUser: UserProps = {
//   isLogin: true,
//   name: 'Terry'
// }

export default defineComponent({
  name: 'Home',
  components: {
    GlobalHeader,
    Loading
    // ValidateForm,
    // ValidateInput
  },
  setup () {
    // const emailValue = ref('')
    // const pwdValue = ref('')
    // const emailRules: RulesProp = [
    //   {
    //     type: 'required',
    //     message: '邮箱必填'
    //   },
    //   {
    //     type: 'email',
    //     message: '请输入正确格式的邮箱'
    //   }
    // ]
    // const pwdRules: RulesProp = [
    //   {
    //     type: 'required',
    //     message: '密码必填'
    //   },
    //   {
    //     type: 'email',
    //     message: '请输入正确格式的密码'
    //   }
    // ]

    // const onFormSubmit = (result: boolean) => {
    //   console.log(result)
    // }
    const store = useStore()

    const currentUser = computed(() => store.state.user)

    const isLoading = computed(() => store.state.loading)
    return {
      currentUser,
      isLoading
    //   emailRules,
    //   emailValue,
    //   pwdValue,
    //   pwdRules,
    //   onFormSubmit
    }
  }
})
</script>
