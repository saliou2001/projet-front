import {createStore} from 'vuex'

export const store = createStore({
    state() {
        return {
            word:"",
            indexWordTyping: 0
        }
    },
    getters: {
        getIndexWordTyping(state) {
            return state.indexWordTyping
        },
        getWord(state) {
            return state.word
        }
    },
    mutations: {
        setIndexWordTyping(state, index) {
            state.indexWordTyping = index
        },
        setWord(state, word) {
            state.word = word
        }
    }
})
