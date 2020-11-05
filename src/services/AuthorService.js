import axios from 'axios';

const AUTHORS_API_URL = "http://localhost:8080/api/authors";

class AuthorService{
    
    getAuthors(){
        return axios.get(AUTHORS_API_URL);
    }

    addAuthor(author){
        return axios.post(AUTHORS_API_URL, author);
    }
}

export default new AuthorService()
