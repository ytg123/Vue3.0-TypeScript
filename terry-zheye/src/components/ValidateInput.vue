<template>
    <div class="validate-input-container pb-3">
        <input
        v-if="tag != 'textarea'"
        v-bind="$attrs"
        class="form-control"
        :class="{'is-invalid': inputRef.error}"
        id="exampleInputEmail1"
        v-model="inputRef.val"
        @blur="validateInput" />

        <textarea
        v-else
        v-bind="$attrs"
        class="form-control"
        :class="{'is-invalid': inputRef.error}"
        id="exampleInputEmail1"
        v-model="inputRef.val"
        @blur="validateInput">

        </textarea>

        <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, watch, computed } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const pwdReg = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}')
interface RuleProp {
    type: 'required' | 'email' | 'password' | 'custom';
    message: string;
    validator?: () => boolean;
}

export type RulesProp = RuleProp[]

export type TagType = 'input' | 'textarea'

export default defineComponent({
  name: 'validate-input',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, { emit }) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    // :value="inputRef.val"
    // @input="updateValue"
    // watch(() => props.modelValue, (newValue) => {
    //   inputRef.val = newValue || ''
    // })

    // const updateValue = (e: KeyboardEvent) => {
    //   const targetValue = (e.target as HTMLInputElement).value
    //   inputRef.val = targetValue

    //   emit('update:modelValue', targetValue)
    // }

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'password':
              passed = pwdReg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
