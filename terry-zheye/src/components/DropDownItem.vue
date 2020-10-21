<template>
    <li class="dropdown-option"
        :class="{'is-disalbed': disabled}"
    >
        <slot></slot>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'drop-down-item',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
    .dropdown-option.is-disalbed {
        color:#6c757d;
        pointer-events: none;
        background-color: transparent;
    }
</style>
