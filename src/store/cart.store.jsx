import { create } from 'zustand'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../functions/scrollToTop'

// eslint-disable-next-line no-unused-vars
export const useCartStore = create((set, get) => ({
    items: [],
    totalPrice: 0,
    voucher: null,
    savings: 0,
    totalPriceAfterCode: 0,
    loading: false,

    // GET CART
    getCart: async () => {
        try {
            set({ loading: true })
            const res = await api.get('/cart')
            set({
                items: res.data.data.items,
                totalPrice: res.data.data.totalPrice,
                voucher: res.data.data.voucher,
                savings: res.data.data.savings,
                totalPriceAfterCode: res.data.data.totalPriceAfterCode,
                loading: false
            })
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Failed to load cart')
        } finally {
            set({ loading: false })
        }
    },

    // ADD TO CART
    addToCart: async (product, quantity = 1) => {
        const toastId = toast.loading('Please Wait...');
        try {
            const res = await api.post('/cart/add', {
                product,
                quantity,
            })
            set({ items: res.data.data });

            toast.success(
                (t) => (
                    <span className="flex items-center gap-2">
                        <span>{res.data.message || 'Added to cart'}</span>
                        <a
                            href="/cart"
                            onClick={() => {
                                toast.dismiss(t.id)
                                scrollToTop();
                            }}
                            className="font-bold underline text-yellow hover:opacity-80"
                        >
                            View cart
                        </a>
                    </span>
                ),
                {
                    id: toastId,
                    duration: 3000,
                }
            )
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Add to cart failed', {
                id: toastId,
                duration: 3000
            })
        }
    },

    // UPDATE ITEM QUANTITY
    updateCartItem: async (slug, quantity) => {
        const toastId = toast.loading('Please Wait...');
        try {
            const res = await api.put(`/cart/update/${slug}`, {
                quantity,
            })
            set({
                items: res?.data?.data?.items,
                totalPrice: res?.data?.data?.totalPrice
            });
            toast.success(res.data.message, {
                id: toastId,
                duration: 3000
            });
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Update failed',
                {
                    id: toastId,
                    duration: 3000
                }
            )
        }
    },

    // REMOVE ITEM
    removeFromCart: async (slug) => {
        const toastId = toast.loading('Please Wait...');
        try {
            const res = await api.delete(`/cart/remove/${slug}`)
            set({
                items: res?.data?.data.items,
                totalPrice: res.data.data.totalPrice
            });
            toast.success(res.data.message, {
                id: toastId,
                duration: 3000
            });
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Remove failed')
        }
    },

    // APPLY VOUCHER
    applyVoucher: async (code) => {
        const toastId = toast.loading('Please Wait...');
        try {
            const res = await api.post('/cart/apply-voucher', {
                code,
            })
            set({
                items: res?.data?.data?.items,
                totalPrice: res?.data?.data?.totalPrice,
                voucher: res?.data?.data?.voucher,
                savings: res?.data?.data?.savings,
                totalPriceAfterCode: res?.data?.data?.totalPriceAfterCode
            });
            console.log(res.data);
            toast.success(res.data.message, {
                id: toastId,
                duration: 3000
            });
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.response?.data?.error || 'Apply failed',
                {
                    id: toastId,
                    duration: 3000
                }
            )
        }
    },

    // REMOVE VOUCHER
    removeVoucher: async () => {
        const toastId = toast.loading('Please Wait...');
        try {
            const res = await api.delete('/cart/remove-voucher')
            set({
                items: res?.data?.data?.items,
                totalPrice: res?.data?.data?.totalPrice,
                voucher: null,
                savings: 0,
                totalPriceAfterCode: 0
            });
            toast.success(res.data.message, {
                id: toastId,
                duration: 3000
            });
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Remove failed',
                {
                    id: toastId,
                    duration: 3000
                }
            )
        }
    },

}))
