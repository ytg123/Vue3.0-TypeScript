<template>
    <div class="index-page">
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                <img src="../assets/callout.svg" alt="callout" class="w-50"/>
                <h2 class="font-weight-light">随心写作，自由表达</h2>
                <p>
                    <a href="javascript:;" class="btn btn-primary my-2" @click="_addPost">开始写文章</a>
                </p>
                </div>
            </div>
        </section>
        <h4 class="font-weight-bold text-center">发现精彩</h4>
        <column-list :list="list"></column-list>
    </div>

</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import ColumnList from '../components/ColumnList.vue'
import { useRouter } from 'vue-router'
import useLoadMore from '@/hooks/useLoadMore'
export default defineComponent({
  name: 'Index',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const list = computed(() => store.state.columns)
    const total = computed(() => 100)
    onMounted(() => {
      store.dispatch('fetchColumns')
    })

    const _addPost = () => {
      router.push({
        path: '/Home/CreatePost'
      })
    }

    const {
      loadMorePage,
      isLastPage
    } = useLoadMore('fetchColumns', total)
    console.log(loadMorePage, isLastPage)
    return {
      list,
      _addPost
    }
  }
})
</script>
