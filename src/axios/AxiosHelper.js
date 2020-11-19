import axios from 'axios'; 
const instance = axios.create(
    {
    baseURL:"http://localhost:8080",
    headers: { 'Access-Control-Allow-Origin': '*'},
});  
instance.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));         
    const token = user.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;        
    } 
    else { 
        console.log('ERROR SETTING HEADER');
    }         
    return config;     
},    
error => Promise.reject(error));
 
export default instance;