type api_routes = {
    login: string,
    logout: string,
    register: string,
    forgot_password: string,
    products: string,
    product: string,
    categories: string,
    category: string,
    pincode: string,
    profile: string,
    profile_update: string,
    password_update: string,
    wishlist: string,
    cart: string,
    rating: string,
    coupon: string,
    place_order: string,
    place_order_paginate: string,
    place_order_detail: string,
    place_order_payment_verify: string,
    latest_order_billing_info: string,
    enquiry: string,
    contact: string,
}
export const api_routes: api_routes = {
    login: '/api/v1/auth/login',
    logout: '/api/v1/auth/logout',
    register: '/api/v1/auth/register',
    forgot_password: '/api/v1/auth/forgot-password',
    products: '/api/v1/product/main/paginate',
    product: '/api/v1/product/main/detail',
    categories: '/api/v1/category/main/paginate',
    category: '/api/v1/category/main/detail',
    pincode: '/api/v1/product/main/pincode',
    profile: '/api/v1/profile',
    profile_update: '/api/v1/profile/update',
    password_update: '/api/v1/profile/update-password',
    wishlist: '/api/v1/wishlist',
    cart: '/api/v1/cart',
    rating: '/api/v1/product/main/reviews',
    coupon: '/api/v1/cart/apply-coupon',
    place_order: '/api/v1/order/place',
    place_order_paginate: '/api/v1/order/placed/paginate',
    place_order_detail: '/api/v1/order/placed/detail',
    place_order_payment_verify: "/api/v1/order/verify-payment/",
    latest_order_billing_info: '/api/v1/order/latest-billing-info',
    enquiry: '/api/v1/enquiry/create',
    contact: '/api/v1/contact/create',
}