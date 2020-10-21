import { ref } from 'vue'

export const  useMousePosition = () => {
    const x = ref(0)
    const y = ref(0)

    const updateMouse = (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }

    return {
        x,y,updateMouse
    }
}