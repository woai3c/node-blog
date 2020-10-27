import { store } from '@/entry-client'

let loadingCounter = 0

export function showLoading() {
    if (loadingCounter === 0) {
        store.commit('setLoading', true)
    }

    loadingCounter++
}

export function closeLoading() {
    loadingCounter--
    if (loadingCounter <= 0) {
        store.commit('setLoading', false)
    }
}