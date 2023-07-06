import { create } from 'zustand'

export const useCounterStore = create((set)=>({
    counter: 0,
    increment: () => set(state => ({counter:state.counter+1})),
    decrement: () => set(state => ({counter:state.counter-1})),
    multiply: () => set(state => ({counter: state.counter * 5})),
    reset: () => set({counter: 0}),
}))
