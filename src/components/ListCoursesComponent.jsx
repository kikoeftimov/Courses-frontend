import React, { Component } from "react";
import axios from '../axios/AxiosHelper';
import {Button, InputGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import CoursesService from '../services/CoursesService';
import AuthService from '../services/AuthService';
import ShoppingCartService from '../services/ShoppingCartService';

class ListCoursesComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            showAdminBoard: false,
            currentUser: undefined,
            search: '',
        }
        
        this.addCourse = this.addCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.detailsCourse = this.detailsCourse.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.submitCourse = this.submitCourse.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);
        this.searchData = this.searchData.bind(this);
    }

    componentDidMount(){
        CoursesService.getCourses().then((res) => {
            this.setState({ courses: res.data });
            console.log(this.state.courses);
        });

        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    addCourse(){
        this.props.history.push('/add-course/_add');
    }

    updateCourse(id){
        this.props.history.push(`/add-course/${id}`);
    }

    deleteCourse(id){
        CoursesService.deleteCourseById(id).then(res => {
            this.setState({ courses: this.state.courses.filter(course => course.id !== id)});
        });
    }

    detailsCourse(id){
        this.props.history.push(`/view-course/${id}`);
    }

    addToCart(id){
        ShoppingCartService.addCourseToCart(id).then( () => {
            alert(`Course added to cart!`);
            this.props.history.push('/');
        }).catch(err => {
            alert(`Course already in cart!`);
        });
    }

    deleteFromCart(id){
        ShoppingCartService.removeCourseFromCart(id).then( () => {
            alert(`Course removed from cart!`);
            this.props.history.push('/');
        });
    }

    submitCourse(courses){
        this.setState({ courses: courses});
    }

    searchChange = event => {
        this.setState({
          [event.target.name] : event.target.value,
        });
      };
    
      searchData = () => {
        if(this.state.search !== ''){
          axios.get(`/api/courses/search/${this.state.search}`)
          .then((res) => {
            this.setState({courses: res.data});
            console.log(this.state.courses);
          }); 
        }
        else{
            axios.get("/api/courses")
              .then((res) => {
                this.setState({ courses: res.data });
                console.log(this.state.courses);
              });
          }    
      }
    
      cancelSearch = () => {
        this.setState({"search" : ''});
        axios.get("/api/courses")
            .then((res) => {
              this.setState({ courses: res.data });
              console.log(this.state.courses);
            });
      };


    render() {
        const { currentUser, showAdminBoard, search } = this.state;

        return (
            <div>
                <h2 className="text-center mt-5">Courses list</h2>
                {showAdminBoard && (
                         <div className="row">
                            <button className="btn btn-primary" onClick={this.addCourse}> Add new course</button>
                            <div style={{marginLeft: '760px'}}>
                                <InputGroup size="sm" style={{marginTop: '5px'}}>
                                <FormControl placeholder="Search" 
                                    name="search" 
                                    value={search} 
                                    className={"bg-white text-dark"}
                                    onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm"  variant="outline-info" type="button" onClick={this.searchData}>
                                    <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm"  variant="outline-danger" type="button" onClick={this.cancelSearch} style={{marginLeft: '5px'}}>
                                    <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                                </InputGroup>
                            </div>
                         </div>
                )}
              
               
                <div className="row mt-4">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.courses.map(
                                    course =>
                                    <tr key= {course.id}>
                                        <td><a onClick={() => this.detailsCourse(course.id)} href={course.id}>{course.name}</a></td>
                                        <td>{course.description}</td>
                                        <td>{course.price}$</td>
                                        <td>
                                            <img src={course.imageBase64} alt="" style={{width: '150px', height: '100px'}}/>
                                        </td>
                                        <td>{course.category.name}</td>
                                        <td>{course.author.firstName} {course.author.lastName}</td>
                                        <td>
                                            {showAdminBoard && (
                                                <span>
                                                    <button className="btn btn-secondary"  style={{marginLeft: '10px', width: '110px'}}
                                                        onClick={() => this.updateCourse(course.id)}>Update
                                                    </button>
                                                    <button className="btn btn-danger" 
                                                        style={{marginLeft: '10px', width: '110px', marginTop: '5px'}} 
                                                        onClick={() => this.deleteCourse(course.id)}>Delete
                                                    </button>
                                                </span>
                                            )}
                                           
                                            <button className="btn btn-primary"
                                                    style={{marginLeft: '10px', width: '110px', marginTop: '5px'}} 
                                                    onClick={() => this.detailsCourse(course.id)}>Details
                                             </button>
                                             {currentUser && (
                                                <button className="btn btn-success"
                                                style={{marginLeft: '10px', width: '110px', marginTop: '5px'}} onClick={() => this.addToCart(course.id)}>Add to cart
                                                </button>
                                             )}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListCoursesComponent;