<template>
  <div class="column-list">
    <div class="row">
      <div class="col-4 mb-4" v-for="column in columnList" :key = "column.id">
        <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
                <img :src="column.avatar && column.avatar.url" :alt = "column.title" class="card-img-top rounded-circle border border-light my-3">
                <h5 class="card-title">{{column.title}}</h5>
                <p class="card-text text-left">{{column.description}}</p>
                <a class="btn btn-outline-primary" href="javascript:;" @click="_toDetail(column._id)">进入专栏</a>
            </div>
        </div>
      </div>
    </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ColumnProps } from '@/store'

export default defineComponent({
  name: 'columnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          item.avatar = {
            url: require('../assets/column.jpg')
          }
        }
        return item
      })
    })
    console.log(columnList)

    const router = useRouter()

    const _toDetail = (id: string) => {
      router.push({
        path: '/Home/ColumnDetail/' + id
      })
    }

    return {
      columnList,
      _toDetail
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
