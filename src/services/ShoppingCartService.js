import axios from '../axios/AxiosHelper';

class ShoppingCartService{

    createCart(){
        return axios.post("/api/shopping-carts/");
    }

    addCourseToCart(id){
        return axios.patch("/api/shopping-carts/" + id);
    }

    removeCourseFromCart(id){
        return axios.delete("/api/shopping-carts/" + id);   
    }

    cancelCart(){
        return axios.patch("/api/shopping-carts/cancel");
    }

    clearCart(){
        return axios.patch("/api/shopping-carts/clear");
    }

    getShoppingCart(){
        return axios.get("/api/shopping-carts/charge");
    }

    checkoutShoppingCart(){
        return axios.post("/api/shopping-carts/charge");
    }
}

export default new ShoppingCartService()