import { create } from 'zustand'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import api from '../api/axios'

export const useAuthStore = create((set) => ({
    user: null,
    token: Cookies.get('token') || null,
    loading: false,

    // SIGN UP  
    signUp: async (payload) => {
        const toastId = toast.loading('Please Wait...');
        set({ loading: true })
        try {
            const { data } = await api.post('/auth/sign-up', payload)

            toast.success(data.message || 'Account created successfully', {
                id: toastId,
                duration: 1000
            })

            // Auto-login after signup
            Cookies.set('token', data.data.token, {
                expires: 7,
                secure: true,
                sameSite: 'strict',
            })

            set({
                user: data.data.user,
                token: data.data.token,
                loading: false,
            })

            return data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Signup failed'
            toast.error(message)
            set({ loading: false })
            throw error
        }
    },

    // SIGN IN 
    signIn: async ({ email, password }) => {
        const toastId = toast.loading('Please Wait...');
        set({ loading: true })
        try {
            const { data } = await api.post('/auth/sign-in', {
                email,
                password,
            })

            Cookies.set('token', data.data.token, {
                expires: 7,
                secure: true,
                sameSite: 'strict',
            })
            Cookies.set('userData', JSON.stringify(data?.data), {
                expires: 7,
                secure: true,
                sameSite: 'strict',
            })
            set({
                user: data.data.user,
                token: data.data.token,
                loading: false,
            })

            toast.success('Welcome back 🍔', {
                id: toastId,
                duration: 1000
            })
            console.log(data);
            return data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Login failed'
            toast.error(message)
            set({ loading: false })
            throw error
        }
    },

    // SIGN OUT
    signOut: async () => {
        const toastId = toast.loading('Please Wait...');
        try {
            await api.post('/auth/sign-out')

            Cookies.remove('token')
            Cookies.remove('userData');
            set({
                user: null,
                token: null,
            })

            toast.success('Logged out successfully', {
                id: toastId,
                duration: 1000
            })
        } catch (error) {
            toast.error(error.response?.data?.error||'Logout failed')
            throw error
        }
    },
}))
