import { ReactNode } from "react";

export interface CategoryState<> {
    id: number;
    name: string;
    slug: string;
    description?: string;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
    banner_image_link?: string;
    icon_image_link?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

export interface ProductReviewState<> {
    created_at: string;
    email: string;
    id: number;
    image_link?: string;
    is_approved: boolean;
    message?: string;
    name?: string;
    star: number;
    updated_at: string;
}
export interface ProductOtherImagesState<> {
    id: number;
    image_link?: string;
    created_at: string;
    updated_at: string;
    image_alt?: string;
    image_title?: string;
}
export interface ProductSegmentState<> {
    id: number;
    name: string;
    slug: string;
    description?: string;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
    featured_image_link?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    discount: number;
    discounted_price: number;
    image_alt?: string;
    image_title?: string;
    in_stock: boolean;
    inventory: number;
    is_best_sale: boolean;
    is_featured: boolean;
    is_new_arrival: boolean
    other_images: ProductOtherImagesState[]|[]
    price: number
    reviews: ProductReviewState[]|[],
    categories: []|CategoryState[]
}

export interface WishlistProducts<> {
    id: number;
    name: string;
    slug: string;
    description?: string;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
    featured_image_link?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    discount: number;
    discounted_price: number;
    image_alt?: string;
    image_title?: string;
    in_stock: boolean;
    inventory: number;
    is_best_sale: boolean;
    is_featured: boolean;
    is_new_arrival: boolean
    price: number
    categories: []|CategoryState[]
}

export interface CartProducts<> {
    id: number;
    name: string;
    slug: string;
    description?: string;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
    featured_image_link?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    discount: number;
    discounted_price: number;
    image_alt?: string;
    image_title?: string;
    in_stock: boolean;
    inventory: number;
    is_best_sale: boolean;
    is_featured: boolean;
    is_new_arrival: boolean
    price: number
    quantity: number
    total_quantity_price: number
    categories: []|CategoryState[]
}

export interface Coupon<> {
    code: string|null;
    description: string|null;
    discount: string|null;
    maximum_dicount_in_price: string|null;
    maximum_number_of_use: string|null;
    name: string|null;
}

export interface Wishlist<> {
    id: number;
    created_at: string;
    updated_at: string;
    total_items: number
    products: []|WishlistProducts[]
}

export interface Cart<> {
    id: number;
    created_at: string;
    updated_at: string;
    coupon_discount: number;
    delivery_charge: number;
    gst_charge: number;
    sub_total: number;
    total_discount: number;
    total_items: number;
    total_price_with_coupon_dicount: number;
    total_price_with_gst_delivery_charge: number;
    total_price_without_gst_delivery_charge: number;
    total_quantity: number;
    coupon: Coupon;
    products: []|CartProducts[]
}

export interface Meta<> {
    next_disabled: boolean;
    prev_disabled: boolean;
}

export interface CategorySlugProps<> {
    category_slug?: string;
};

export interface BannerImages<> {
    images: string[]|[]
}

export interface ChildrenType<> {
    children: ReactNode
}

export interface RoleType<> {
    id: number;
    name: string;
    permissions: string[];
    created_at: string;
    updated_at: string;
}

export interface UserType<> {
    id: number;
    email: string;
    name: string;
    phone: string;
    verified: string;
    roles: RoleType[];
}

export interface AuthType<> {
    authenticated: boolean;
    token: string;
    token_type: string;
    user?: UserType;
}

export interface Order<> {
    id: number;
    created_at: string;
    updated_at: string;
    coupon_discount: number;
    delivery_charge: number;
    gst_charge: number;
    sub_total: number;
    total_discount: number;
    total_items: number;
    total_quantity: number;
    total_price_with_coupon_dicount: number;
    total_price_with_gst_delivery_charge: number;
    total_price_without_gst_delivery_charge: number;
    coupon: Coupon;
    products: []|CartProducts[];
    coupon_name: null|string;
    coupon_code: null|string;
    coupon_discount_percentage: null|string;
    coupon_maximum_discount: null|number;
    coupon_maximum_use: null|number;
    billing_first_name: string;
    billing_last_name: string;
    billing_email: string;
    billing_phone: number;
    billing_country: string;
    billing_state: string;
    billing_city: string;
    billing_pin: number;
    billing_address_1: string;
    billing_address_2: null|string;
    shipping_first_name: null|string;
    shipping_last_name: null|string;
    shipping_email: null|string;
    shipping_phone: null|number;
    shipping_country: null|string;
    shipping_state: null|string;
    shipping_city: null|string;
    shipping_pin: null|number;
    shipping_address_1: null|string;
    shipping_address_2: null|string;
    order_notes: null|string;
    receipt: null|string;
    mode_of_payment: 'Cash On Delivery'|'Online';
    order_status: string;
    payment_status: string;
    razorpay_order_id: null|string;
}

export interface APIMetaLinkType<> {
    active: boolean;
    url: string|null;
    label: string;
}

export interface APIMetaType<> {
    current_page: number | null;
    from: number | null;
    last_page: number | null;
    per_page: number | null;
    to: number | null;
    total: number | null;
    path: string | null;
    links: APIMetaLinkType[] | null;
}

export interface APIListResponseType<T> {
    meta: APIMetaType;
    data: T[];
}