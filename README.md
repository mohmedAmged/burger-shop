# 🍔 Burger Shop - Premium Food E-commerce Experience

A state-of-the-art, high-performance burger restaurant web application built with **React**, **Vite**, and **GSAP**. This project delivers a premium user experience with immersive animations, a seamless ordering flow, and a sophisticated admin dashboard.

---

## ✨ Features

### 🚀 Frontend Excellence

- **Immersive Animations**: Utilizing **GSAP** (ScrollTrigger & SplitText) for smooth, cinematic transitions and scroll-driven interactions.
- **Premium UI/UX**: Custom-themed design with radial gradients, masked images, and a "Modern Negra" aesthetic.
- **Dynamic Menu**: Interactive menu system with category filtering and real-time cart updates.
- **Full Checkout Flow**: Integrated cart management, voucher application, and secure checkout processing.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop with custom breakpoints and touch-friendly interactions.
- **User Profile Dashboard**: Consolidated view of user statistics, recent orders, and current cart items.
- **Order Tracking**: Dedicated pages for viewing all past orders and granular order details.

### 🛡️ Secure Authentication

- **JWT-based Auth**: Secure login and signup flow with automated token management.
- **Auto-Logout**: Intelligent session management that automatically logs out users upon token expiry for enhanced security.

### 🛠️ Backend & Integration (Highlights)

- **Voucher System**: Robust API for creating, validating, and applying discount vouchers.
- **Automated Workflows**: Integration with **Upstash/QStash** for automated email notifications on order creation and status updates.
- **Dashboard Stats API**: Real-time analytics for revenue, order trends, user growth, and top-selling products.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TailwindCSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 📦 Recent Updates

- ✅ **Profile Data Consolidation**: Optimized the profile page to fetch user info, cart summary, and recent orders in a single, efficient request.
- ✅ **Thematic UI Refinement**: Applied a consistent "Burger Shop" theme across all checkout and order tracking pages.
- ✅ **Responsive Dashboard**: Finalized the admin dashboard layout with mobile-first card designs.
- ✅ **Voucher Integration**: Launched a full-scale voucher management system for promotional campaigns.
- ✅ **Enhanced Order Management**: Refactored order details into dedicated pages with modular status management components.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mohmedAmged/burger-shop.git
   cd burger-shop/burger-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your API credentials:

   ```env
   VITE_API_URL=your_backend_api_url
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 🎨 Design Philosophy

The project follows a **"Premium Dark"** theme, focusing on high-quality food photography and elegant typography. We avoid generic elements in favor of custom-styled components that feel alive through micro-animations.

---

## 📄 License

This project is for demonstration purposes. All rights reserved.

---

_Made with ❤️ by [Mohamed Amged](https://github.com/mohmedAmged)_
