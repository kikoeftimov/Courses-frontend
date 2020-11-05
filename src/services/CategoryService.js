import axios from 'axios';

const CATEGORIES_API_URL = "http://localhost:8080/api/categories";

class CategoryService{
    
    getCategories(){
        return axios.get(CATEGORIES_API_URL);
    }

    addCategory(category){
        return axios.post(CATEGORIES_API_URL, category);
    }

}


export default new CategoryService()