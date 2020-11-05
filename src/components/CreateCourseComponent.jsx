import React, { Component } from 'react';
import CoursesService from '../services/CoursesService';
import CategoryService from '../services/CategoryService';
import AuthorService from '../services/AuthorService';
import {Course} from '../models/Course';
import Select from 'react-select';


class CreateCourseComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: '',
            price: '',
            imageBase64: null,
            categories: [],
            selectedCategory: null,
            authors: [],
            selectedAuthor: null,
        }
        
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
    }

    // submitImage(){
    //     const data = new FormData() 
    //     data.append('file', this.state.selectedFile)
    //     console.warn(this.state.selectedFile);
    //     let url = "http://localhost:8000/";

    //     axios.post(url, data, { // receive two parameter endpoint url ,form data 
    //     })
    //     .then(res => { // then print response status
    //         console.warn(res);
    //     });
    // }

    componentDidMount(){
        CategoryService.getCategories().then(res => {
            this.setState({categories: res.data});
            console.log(this.state.categories);
        });

        AuthorService.getAuthors().then(res => {
            this.setState({authors: res.data});
            console.log(this.state.authors);
        });

        if(this.state.id === '_add'){
            return
        }
        else{
            CoursesService.getCourseById(this.state.id).then( (res) => {
                let course = res.data;
                this.setState({
                    name: course.name,
                    description: course.description,
                    price: course.price,
                    imageBase64: course.imageBase64,
                    selectedCategory: course.category,
                    selectedAuthor: course.author
                });
            });
        }
    }

    saveOrUpdateEmployee(e){
        e.preventDefault();
        let course = new Course();

        course.name = this.state.name;
        course.description = this.state.description;
        course.price = this.state.price;
        course.category = this.state.selectedCategory;
        course.author = this.state.selectedAuthor;
        course.imageBase64 = this.state.imageBase64;

        console.log('course =>' + JSON.stringify(course));

        if(this.state.id === '_add'){
            CoursesService.createCourse(course).then( res => {
                this.props.history.push('/courses');
            });
        }
        else{
            CoursesService.updateCourse(course, this.state.id).then(res => {
                this.props.history.push('/courses');
            });
        }
    }

    cancel(){
        this.props.history.push('/courses');
    }

    changeNameHandler(event){
        this.setState({ name: event.target.value});
    }

    changeDescriptionHandler(event){
        this.setState({ description: event.target.value});
    }

    changePriceHandler(event){
        this.setState({ price: event.target.value});
        console.log(this.state.imageBase64);
    }

    handleInputChange(event) {
        this.setState({
            imageBase64: URL.createObjectURL(event.target.files[0])
          });
    }

    changeCategoryHandler(event) {
        this.setState({selectedCategory: event});
    }

    changeAuthorHandler(event){
        this.setState({selectedAuthor: event});
    }
    
    getTitle(){
        if(this.state.id >= 0){
            return <h3 className="text-center">Update course</h3>
        }
        else{
            return <h3 className="text-center">Add course</h3>
        }
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div>
                                <form>
                                    <div className="form-group">
                                        <label> Course name: </label>
                                        <input placeholder="Course name" name="name" required="required"  className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> Course description: </label>
                                        <input placeholder="Course description" name="description" required="required"  className="form-control"
                                            value={this.state.description} onChange={this.changeDescriptionHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> Course price: </label>
                                        <input placeholder="Course price" name="price" required="required" className="form-control"
                                            value={this.state.price} onChange={this.changePriceHandler} />
                                    </div>

                                    <div className="form-group col-md-6">
                                                <label className="text-white">Select File :</label>
                                                <input type="file" className="form-control" name="imageBase64" onChange={this.handleInputChange} />
                                                <img src={this.state.imageBase64} alt={this.state.name} />
                                    </div>
                                <div className="form-group">
                                        <label>Category: </label>
                                        <Select
                                            getOptionLabel={option =>
                                                `${option.name}`
                                            }
                                            getOptionValue={option => `${option}`}
                                            value={this.state.selectedCategory}
                                            options={this.state.categories}
                                            onChange={this.changeCategoryHandler}
                                        />
                                </div>
                                <div className="form-group">
                                <label>Author: </label>
                                        <Select
                                            getOptionLabel={option =>
                                                `${option.firstName} ${option.lastName}`
                                            }
                                            getOptionValue={option => `${option}`}
                                            value={this.state.selectedAuthor}
                                            options={this.state.authors}
                                            onChange={this.changeAuthorHandler}
                                        />
                                </div>


                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCourseComponent;