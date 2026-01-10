import { create } from 'zustand'
import toast from 'react-hot-toast'
import api from '../api/axios'
import Cookies from 'js-cookie'

export const useProfileStore = create((set) => ({
    profileSummary: null,
    loading: false,

    // GET PROFILE BY SLUG
    getProfile: async (slug) => {
        set({ loading: true })
        try {
            const { data } = await api.get(`/users/${slug}`)
            set({ profileSummary: data.data, loading: false })
            return data.data
        } catch (error) {
            set({ loading: false })
            console.error('Failed to fetch profile', error)
            toast.error(error.response?.data?.message || 'Failed to load profile', {
                style: {
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(245, 195, 75, 0.1)',
                    color: '#fff',
                }
            })
        }
    },

    // UPDATE PROFILE BY SLUG
    updateProfile: async (slug, payload) => {
        const toastId = toast.loading('Updating your profile...');
        set({ loading: true })
        try {
            const { data } = await api.put(`/users/update/${slug}`, payload)
            
            // Sync with cookies 
            const userData = Cookies.get('userData');
            if (userData) {
                const parsed = JSON.parse(userData);
                parsed.user = data.data;
                Cookies.set('userData', JSON.stringify(parsed), { expires: 7 });
            }

            set((state) => ({
                profileSummary: {
                    ...state.profileSummary,
                    user: data.data 
                },
                loading: false
            }))

            toast.success('Profile updated successfully! 🍔', {
                id: toastId,
                duration: 3000,
                style: {
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(245, 195, 75, 0.1)',
                    color: '#fff',
                }
            })
            return data.data
        } catch (error) {
            set({ loading: false })
            toast.error(error.response?.data?.message || 'Update failed', {
                id: toastId,
                style: {
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(245, 195, 75, 0.1)',
                    color: '#fff',
                }
            })
            throw error
        }
    }
}))
