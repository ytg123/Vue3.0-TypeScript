<template>
  <teleport to="#message">
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject" v-if="isVisible">
      <span>{{message}}</span>
      <button type="button" class="close" aria-label="Close" @click.prevent="hide">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useDOMCreate } from '@/hooks/useDOMCreate'
export type messageType = 'success' | 'error' | 'default'

export default defineComponent({
  name: 'message',
  props: {
    message: String,
    type: {
      type: String as PropType<messageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup (props, { emit }) {
    useDOMCreate('message')

    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    const hide = () => {
      isVisible.value = false
      emit('close-message', true)
    }

    return {
      isVisible,
      hide,
      classObject
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
