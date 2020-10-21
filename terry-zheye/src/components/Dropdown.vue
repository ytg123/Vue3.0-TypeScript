<template>
    <div class="dropdown" ref="dropdownRef">
        <a href="#" class="btn btn-outline-light my-2 dropdown-toggle"
            @click.prevent="toggleOpen"
        >{{title}}</a>
        <ul class="dropdown-menu" :style="{display:'block'}" v-if="isOpen">
            <slot></slot>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutSide from '../hooks/useClickOutSide'
export default defineComponent({
  name: 'drop-down',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)

    const dropdownRef = ref<HTMLElement | null>(null)

    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const isClickOutSide = useClickOutSide(dropdownRef)

    watch(isClickOutSide, () => {
      if (isClickOutSide.value && isOpen.value) {
        isOpen.value = false
      }
    })
    // const hadnler = (e: MouseEvent) => {
    //   if (dropdownRef.value) {
    //     if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value === true) {
    //       isOpen.value = false
    //     }
    //   }
    // }

    // onMounted(() => {
    //   document.addEventListener('click', hadnler)
    // })

    // onUnmounted(() => {
    //   document.removeEventListener('click', hadnler)
    // })

    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
