<template>
    <div class="file-upload">
        <div class="file-upload-container"
            @click.prevent="triggerUpload"
            v-bind="$attrs"
        >
            <slot v-if="fileStatus === 'loading'" name="loading">
                <button class="btn btn-primary" disabled>正在上传...</button>
            </slot>
            <slot v-else-if="fileStatus === 'success'" name="success" :uploadedData="uploadedData">
                <button class="btn btn-primary">上传成功</button>
            </slot>
            <slot v-else name="default">
                <button class="btn btn-primary">点击上传</button>
            </slot>
        </div>
        <input type="file"
            class="file-input d-none"
            ref="fileInput"
            @change="handleFileChange"
        >
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

type CheckFunction = (file: File) => boolean;

export default defineComponent({
  name: 'upload',
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUplaod: {
      type: Function as PropType<CheckFunction>

    },
    uploaded: {
      type: Object
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, cxt) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const uploadedData = ref(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        fileStatus.value = 'loading'
        const files = Array.from(currentTarget.files)
        if (props.beforeUplaod) {
          const result = props.beforeUplaod(files[0])
          if (!result) {
            return
          }
        }

        const formData = new FormData()
        formData.append('file', files[0])

        axios.post(props.action, formData, {
          headers: {
            'content-Type': 'multipart/form-data'
          }
        }).then(resp => {
          uploadedData.value = resp.data
          cxt.emit('file-uploaded', resp.data)
          fileStatus.value = 'success'
        }).catch((e) => {
          fileStatus.value = 'error'
          cxt.emit('file-uploaded-error', e.error)
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }

    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
