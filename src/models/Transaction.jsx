import {ShoppingCart} from "./ShoppingCart";

export class Transaction{
    
    id: number;

    amount: float;

    email: string;

    localDateTime: string;

    user: string;

    shoppingCart: ShoppingCart;
}