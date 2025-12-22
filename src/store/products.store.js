import { create } from 'zustand'
import toast from 'react-hot-toast'
import api from '../api/axios'

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    // GET ALL PRODUCTS 
    getAllProducts: async () => {
        set({ loading: true, error: null })

        try {
            const res = await api.get('/products')

            set({
                products: res.data.data,
                loading: false,
            })
            console.log(res.data.data)
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to fetch products'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },
}))
