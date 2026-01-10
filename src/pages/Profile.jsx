import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/Auth.store'
import { useProfileStore } from '../store/profile.store'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../functions/scrollToTop'
import InsideLoader from '../utils/InsideLoader'
import { getStatusColor } from '../functions/getStatusColor'

const Profile = () => {
    const { user } = useAuthStore();
    const { profileSummary, getProfile, updateProfile, loading } = useProfileStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (user?.slug) {
            getProfile(user.slug);
        }
    }, [user?.slug, getProfile]);

    useEffect(() => {
        if (profileSummary?.user) {
            setFormData({
                name: profileSummary.user.name || '',
                email: profileSummary.user.email || '',
                phone: profileSummary.user.phone || ''
            });
        }
    }, [profileSummary]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user.slug, formData);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    const stats = [
        { label: 'Total Orders', value: profileSummary?.orderSummary?.totalOrders || 0 },
        { label: 'Cart Items', value: profileSummary?.cartSummary?.totalItems || 0 },
        { label: 'Member Since', value: profileSummary?.user?.createdAt ? new Date(profileSummary.user.createdAt).toLocaleDateString() : 'N/A' },
    ];
    console.log(profileSummary);
    
    if (!user) {
        return (
            <div className="min-h-screen flex-center radial-gradient flex-col gap-5">
                <h2 className="text-3xl font-modern-negra text-yellow">Please Sign In to view your profile</h2>
                <Link to="/sign-in" className="bg-color-yellow text-black px-8 py-3 rounded-full font-bold hover:opacity-90 transition">
                    Sign In
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-32 md:py-48 radial-gradient px-5">
            <div className="container mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-12">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-modern-negra text-white leading-none">
                            My <span className="text-yellow">Profile</span>
                        </h1>
                        <p className="text-white/60 mt-2 text-lg">Manage your account and track your cravings.</p>
                    </div>
                    <div className="flex gap-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[120px]">
                                <p className="text-2xl font-modern-negra text-yellow">{stat.value}</p>
                                <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="rounded-3xl border border-yellow/20 bg-black/50 p-8 backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <img src="/images/logo2.png" alt="" className="w-20 h-20 rotate-12" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-24 h-24 rounded-full border-2 border-yellow/50 overflow-hidden mb-6">
                                    <img src="/images/user.png" alt="User Profile" className="w-full h-full object-cover" />
                                </div>

                                {isEditing ? (
                                    <form onSubmit={handleUpdate} className="space-y-4">
                                        <div>
                                            <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-yellow outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-yellow outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Phone</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-yellow outline-none transition-colors"
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-4">
                                            <button type="submit" className="flex-1 bg-yellow text-black font-bold py-2 rounded-xl hover:opacity-90 transition-opacity">Save</button>
                                            <button type="button" onClick={() => setIsEditing(false)} className="flex-1 border border-white/10 text-white py-2 rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-modern-negra text-white mb-1">{profileSummary?.user?.name}</h2>
                                        <p className="text-white/60 mb-8">{profileSummary?.user?.email}</p>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-white/80">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                                </svg>
                                                <span>{profileSummary?.user?.phone || 'Not provided'}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-white/80">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                </svg>
                                                <span className="truncate">{profileSummary?.user?.address || 'Set your delivery address'}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full mt-10 py-3 rounded-xl border border-yellow/30 text-yellow font-bold hover:bg-yellow hover:text-black transition-all duration-300"
                                        >
                                            Edit Profile
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Quick Cart Preview */}
                        <div className="rounded-3xl border border-yellow/20 bg-black/50 p-6 backdrop-blur-xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-modern-negra text-white">In Your Cart</h3>
                                <Link to="/cart" onClick={scrollToTop} className="text-yellow text-sm font-bold underline">View All</Link>
                            </div>

                            {loading && !profileSummary ? (
                                <div className="flex justify-center p-4">
                                    <InsideLoader title="Cart" />
                                </div>
                            ) : profileSummary?.cartSummary?.recentItems?.length > 0 ? (
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {profileSummary.cartSummary.recentItems.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <img src={item.product?.image} alt={item.product?.name} className="w-12 h-12 object-contain" />
                                            <div className="flex-1 overflow-hidden">
                                                <h4 className="font-bold text-white text-sm truncate">{item.product?.name}</h4>
                                                <p className="text-xs text-yellow">x{item.quantity} • {item.product?.price} EGP</p>
                                            </div>
                                        </div>
                                    ))}
                                    {profileSummary.cartSummary.totalItems > 3 && (
                                        <p className="text-center text-white/40 text-xs">+{profileSummary.cartSummary.totalItems - 3} more items</p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-white/40 text-center py-4 italic">Empty cart... hungry?</p>
                            )}
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl border border-yellow/20 bg-black/50 p-8 backdrop-blur-xl h-full">
                            <h3 className="text-3xl font-modern-negra text-white mb-8">Recent Orders</h3>

                            {loading && !profileSummary ? (
                                <div className="flex justify-center items-center h-64">
                                    <InsideLoader title="Orders" />
                                </div>
                            ) : profileSummary?.orderSummary?.recentOrders?.length > 0 ? (
                                <div className="space-y-6">
                                    {profileSummary.orderSummary.recentOrders.map((order) => (
                                        <div key={order._id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow/30 transition-all group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-full bg-yellow/10 flex-center text-yellow shrink-0 group-hover:scale-110 transition-transform">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white text-lg">Order #{order._id.slice(-8).toUpperCase()}</h4>
                                                    <p className="text-white/50 text-sm">{new Date(order.createdAt).toLocaleDateString()} • {order.itemsCount} items</p>
                                                </div>
                                            </div>

                                            <div className="mt-4 md:mt-0 flex items-center justify-between md:gap-8">
                                                <div className="text-right">
                                                    <p className="font-modern-negra text-2xl text-yellow leading-none">{order.totalPriceAfterCode || order.totalPrice} EGP</p>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase mt-1 ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <Link
                                                    to={`/all-orders/${order._id}`}
                                                    onClick={scrollToTop}
                                                    className="p-3 rounded-xl bg-white/5 hover:bg-yellow group-hover:text-black transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}

                                    {profileSummary.orderSummary.totalOrders > profileSummary.orderSummary.recentOrders.length && (
                                        <div className="pt-4 text-center">
                                            <Link to="/all-orders" onClick={scrollToTop} className="text-yellow font-bold hover:underline">
                                                View All {profileSummary.orderSummary.totalOrders} Orders
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-white/40 space-y-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 opacity-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <p className="italic">You haven't placed any orders yet.</p>
                                    <Link to="/menu" className="text-yellow font-bold underline">Check our menu</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
