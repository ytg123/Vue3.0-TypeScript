<template>
    <nav class="navbar justify-content-between navbar-dark bg-primary mb-4 px-4">
        <a class="navbar-brand" href="javascript:;" @click="_backHome">terry者也专栏</a>
        <ul v-if="!user.isLogin" class="list-inline mb-0">
            <li class="list-inline-item"><a href="javascript:;" @click="_toLogin" class="btn btn-outline-light my-2">登录</a></li>
            <li class="list-inline-item"><a href="javascript:;" @click="_toRester" class="btn btn-outline-light my-2">注册</a></li>
        </ul>
        <ul v-else class="list-inline mb-0">
            <dropdown :title="`你好,${user.nickName}`">
                <dropdown-item>
                    <a class="dropdown-item" href="javascript:;" @click="_addPost">新建文章</a>
                </dropdown-item>
                <dropdown-item disabled>
                    <a class="dropdown-item" href="#">编辑资料</a>
                </dropdown-item>
                <dropdown-item>
                    <a class="dropdown-item" href="#">退出登录</a>
                </dropdown-item>
            </dropdown>
        </ul>
     </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropDownItem.vue'
import { UserProps } from '@/store'
export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  components: {
    Dropdown,
    DropdownItem
  },
  setup () {
    const router = useRouter()
    const _toLogin = () => {
      router.push({
        path: '/Login'
      })
    }

    const _addPost = () => {
      router.push({
        path: '/Home/CreatePost'
      })
    }

    const _toRester = () => {
      router.push({
        path: '/Register'
      })
    }
    const _backHome = () => {
      router.push({
        path: '/Home/Index'
      })
    }
    return {
      _toLogin,
      _addPost,
      _toRester,
      _backHome
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
