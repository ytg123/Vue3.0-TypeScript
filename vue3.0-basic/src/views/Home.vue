<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		{{ count }}
		{{double}}
		{{name}}
		<button @click="add">++</button>
		<button @click="openModal">打开</button>
		<div v-red>
			X:{{x}} , Y{{y}}
		</div>

		<span v-if="loading">loading</span>
		<img v-else-if="loaded" :src="result[0].url" alt="">
		<model :isOpen="modalIsOpen" @close-modal="closeModal"/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive,toRefs, onMounted,onBeforeUnmount } from 'vue';
import { useMousePosition } from '../hooks/useMousePosition';
import { useURLLoader } from '../hooks/useURLLoader';
import Model from '../components/model.vue';

interface DogResult {
	message: string;
	status: string;
}

interface CatResult {
	id: string;
	url: string;
	width: number;
	height: number;
}

export default defineComponent({
	name: 'Home',
	components: {
		Model
	},
	directives:{
		red:{
			mounted(el){
				el.style.color = 'red'
			}
		}
	},
	setup() {
		const count = ref(0);


		const add = () => {
			count.value++
		}

		const double = computed(() => count.value * 2)

		const state = reactive({
			name:'kekedd',
			age:30,
			meta:'man'
		})

		const {
			x,y,updateMouse
		} = useMousePosition()

		const {
			result,loading,loaded
		} = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')

		onMounted(() => {
			document.addEventListener('click',updateMouse)
		})

		onBeforeUnmount(() => {
			document.removeEventListener('click',updateMouse)
		})

		const modalIsOpen = ref(false)
		const openModal = () => {
			modalIsOpen.value = true
		}

		const closeModal = () => {
			modalIsOpen.value = false
		}
		return {
			count,
			add,
			double,
			...toRefs(state),
			x,y,
			result,loading,loaded,
			modalIsOpen,
			openModal,
			closeModal
		};
	}
});
</script>
