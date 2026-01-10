   export const getStatusColor = (status) => {
    switch (status) {
        case 'DELIVERED': return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'PENDING': return 'text-yellow bg-yellow/10 border-yellow/20';
        case 'PREPARING': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        case 'SHIPPED': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
        case 'CANCELLED': return 'text-red-400 bg-red-400/10 border-red-400/20';
        default: return 'text-white bg-white/10 border-white/20';
    }
};