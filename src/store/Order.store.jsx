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
                    <span className="flex items-center gap-2">
                        <span>{res.data.message || 'Order Created'}</span>
                        <a
                            href={`/all-orders/${res?.data?.data?._id}`}
                            onClick={() => {
                                toast.dismiss(t.id)
                                scrollToTop();
                            }}
                            className="font-bold underline text-yellow hover:opacity-80"
                        >
                            View Order
                        </a>
                    </span>
                ),
                {
                    id: toastId,
                    duration: 3000,
                }
            );
            return res.data.data;
        } catch (err) {
            toast.error(err?.response?.data?.error, {
                id: toastId,
                duration: 3000
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
            toast.error(err?.response?.data?.error);
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
            toast.error(err?.response?.data?.error);
        } finally {
            set({ loading: false });
        }
    },

    /* RESET */
    clearCurrentOrder: () => set({ currentOrder: null }),
}));