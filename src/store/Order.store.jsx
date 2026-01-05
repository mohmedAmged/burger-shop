import toast from "react-hot-toast";
import api from "../api/axios";
import { create } from "zustand";
import { scrollToTop } from "../functions/scrollToTop";

export const useOrderStore = create((set) => ({
    orders: [],
    currentOrder: null,
    loading: false,

    /*  CREATE ORDER */
    createOrder: async ({ deliveryAddress, paymentMethod = "CASH" }) => {
        const toastId = toast.loading('Creating Order...');
        set({ loading: true });
        try {
            const res = await api.post("/orders/create", {
                deliveryAddress,
                paymentMethod,
            });

            set((state) => ({
                orders: [res.data.data, ...state.orders],
            }));
            console.log(res.data.data);

            toast.success(
                (t) => (
                    <div className="flex items-center gap-4">
                        <div className="shrink-0 rounded-xl bg-white/5 p-2 border border-yellow/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-modern-negra text-lg text-yellow leading-none">Order Placed!</h4>
                            <p className="text-sm text-white/80 mt-1">{res.data.message || 'Order Created Successfully'}</p>
                        </div>
                        <a
                            href={`/all-orders/${res?.data?.data?._id}`}
                            onClick={() => {
                                toast.dismiss(t.id)
                                scrollToTop();
                            }}
                            className="shrink-0 text-sm font-bold text-white underline decoration-yellow decoration-2 underline-offset-4 hover:text-yellow transition-colors"
                        >
                            View Order
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
            );
            return res.data.data;
        } catch (err) {
            toast.error(err?.response?.data?.error, {
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
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    /* GET USER ORDERS */
    getUserOrders: async () => {
        set({ loading: true });
        try {
            const res = await api.get("/orders/my-orders");
            set({ orders: res.data.data || [] });
        } catch (err) {
            toast.error(err?.response?.data?.error, {
                style: {
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(245, 195, 75, 0.1)',
                    color: '#fff',
                }
            });
        } finally {
            set({ loading: false });
        }
    },

    /* GET ORDER DETAILS */
    getOrderDetails: async (orderId) => {
        set({ loading: true, currentOrder: null });
        try {
            const res = await api.get(`/orders/my-orders/${orderId}`);
            set({ currentOrder: res.data.data });
        } catch (err) {
            toast.error(err?.response?.data?.error, {
                style: {
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(245, 195, 75, 0.1)',
                    color: '#fff',
                }
            });
        } finally {
            set({ loading: false });
        }
    },

    /* RESET */
    clearCurrentOrder: () => set({ currentOrder: null }),
}));