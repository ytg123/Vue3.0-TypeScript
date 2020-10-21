<template>
    <teleport to="#model">
        <div class="pos" v-if="isOpen">
            this is a model


            <button @click="buttonClick">close</button>
        </div>
    </teleport>
</template>
<script lang="ts">

    import { defineComponent } from 'vue'

    export default defineComponent({
        name:'model',
        props:{
            isOpen: Boolean
        },
        emits:{
            'close-modal': null
        },
        setup(props, { emit }){
            
            const buttonClick = () => {
                emit("close-modal");
            }


            return {
                buttonClick
            }
        }
    })

</script>

<style scoped>
    .pos{
        width: 300px;
        height: 300px;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: 0;
    }
</style>