import { ref } from 'vue'
import axios from 'axios'

export function useURLLoader<T> (url: string) {
    // const error = ref(null)
    const result = ref<T | null>(null)
    const loading = ref(true)
    const loaded = ref(false)
    // try {

    axios({
        method:'get',
        url
    }).then(({data}) => {
        loading.value = false
        loaded.value = true
        result.value = data
    })

    // } catch (e) {
    //     error.value = e
    //     loading.value = false
    // }

    return {
        result,loading,loaded
    }
}