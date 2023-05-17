export interface User {
    id: number | string;
    name: string;
    email: string;
    password: string;
    created_at: string;
    is_admin: boolean | number;
}
export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    stock_amount: number;
    created_at: string;
}
