<template>
    <column-list :list="list"></column-list>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'Index',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()

    const list = computed(() => store.state.columns)

    onMounted(() => {
      store.dispatch('fetchColumns')
    })

    return {
      list
    }
  }
})
</script>
