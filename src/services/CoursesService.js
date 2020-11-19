import axios from 'axios';

const COURSES_API_URL = "http://localhost:8080/api/courses";

class CoursesService{

    getCourses(){
        return axios.get(COURSES_API_URL);
    }

    createCourse(course){
        return axios.post(COURSES_API_URL, course);
    }

    getCourseById(id){
        return axios.get(COURSES_API_URL + '/' + id);
    }

    updateCourse(course, id){
        return axios.put(COURSES_API_URL + '/' + id, course);
    }

    deleteCourseById(id){
        return axios.delete(COURSES_API_URL + '/' + id);
    }

    getCourseWithParams(term){
        return axios.get(`COURSES_API_URL + '?' + term=${term}`);
    }
}

export default new CoursesService()