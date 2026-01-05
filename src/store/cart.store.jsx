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
            toast.error(err?.response?.data?.error || 'Failed to load cart', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        } finally {
            set({ loading: false })
        }
    },

    // ADD TO CART
    addToCart: async (product, quantity = 1) => {
        const toastId = toast.loading('Adding to cart...');
        try {
            const res = await api.post('/cart/add', {
                product: product?.slug,
                quantity,
            })
            set({ items: res.data.data });

            toast.success(
                (t) => (
                    <div className="flex items-center gap-4">
                        <div className="shrink-0 rounded-xl bg-white/5 p-1 border border-yellow/20">
                            <img
                                className="w-14 h-14 object-contain"
                                src={product?.image}
                                alt={product?.name}
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-modern-negra text-lg text-yellow leading-none">{product?.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium text-black bg-yellow px-1.5 py-0.5 rounded">x{quantity}</span>
                                <span className='text-xs text-white/60'>Added to cart</span>
                            </div>
                        </div>

                        <a
                            href="/cart"
                            onClick={() => {
                                toast.dismiss(t.id)
                                scrollToTop();
                            }}
                            className="shrink-0 text-sm font-bold text-white underline decoration-yellow decoration-2 underline-offset-4 hover:text-yellow transition-colors"
                        >
                            View Cart
                        </a>
                    </div>
                ),
                {
                    id: toastId,
                    duration: 5000,
                    style: {
                        borderRadius: '20px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(245, 195, 75, 0.1)',
                        color: '#fff',
                        padding: '12px 16px',
                        minWidth: '320px'
                    }
                }
            )
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.error || 'Add to cart failed', {
                id: toastId,
                duration: 3000
            })
        }
    },

    // UPDATE ITEM QUANTITY
    updateCartItem: async (slug, quantity) => {
        const toastId = toast.loading('Updating cart...');
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
                duration: 3000,
                style: {
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(245, 195, 75, 0.1)',
                    color: '#fff',
                }
            });
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Update failed',
                {
                    id: toastId,
                    duration: 3000,
                    style: {
                        borderRadius: '20px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(245, 195, 75, 0.1)',
                        color: '#fff',
                    }
                }
            )
        }
    },

    // REMOVE ITEM
    removeFromCart: async (slug) => {
        const toastId = toast.loading('Removing item...');
        try {
            const res = await api.delete(`/cart/remove/${slug}`)
            set({
                items: res?.data?.data.items,
                totalPrice: res.data.data.totalPrice
            });
            toast.success(res.data.message, {
                id: toastId,
                duration: 3000,
                style: {
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(245, 195, 75, 0.1)',
                    color: '#fff',
                }
            });
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Remove failed', {
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
            toast.success(
                // eslint-disable-next-line no-unused-vars
                (t) => (
                    <div className="flex items-center gap-4">
                        <div className="shrink-0 rounded-full bg-green-500/20 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white font-medium">{res.data.message}</p>
                            <p className="text-sm text-green-400">You saved {res.data.data.savings} EGP!</p>
                        </div>
                    </div>
                ),
                {
                    id: toastId,
                    duration: 4000,
                    style: {
                        borderRadius: '20px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(245, 195, 75, 0.1)',
                        color: '#fff',
                        padding: '12px 16px',
                    }
                }
            );
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.response?.data?.error || 'Apply failed',
                {
                    id: toastId,
                    duration: 3000,
                    style: {
                        borderRadius: '20px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(245, 195, 75, 0.1)',
                        color: '#fff',
                    }
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
                duration: 3000,
                style: {
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(245, 195, 75, 0.1)',
                    color: '#fff',
                }
            });
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Remove failed',
                {
                    id: toastId,
                    duration: 3000,
                    style: {
                        borderRadius: '20px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(245, 195, 75, 0.1)',
                        color: '#fff',
                    }
                }
            )
        }
    },

}))
