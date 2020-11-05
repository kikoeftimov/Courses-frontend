import React, { Component } from 'react';
import CoursesService from '../services/CoursesService';

class ListCoursesComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            courses: []
        }
        
        this.addCourse = this.addCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.detailsCourse = this.detailsCourse.bind(this);
    }

    componentDidMount(){
        CoursesService.getCourses().then((res) => {
            this.setState({ courses: res.data });
            console.log(this.state.courses);
        });
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


    render() {
        return (
            <div>
                <h2 className="text-center mt-5">Courses list</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addCourse}> Add new course</button>
                </div>
                <div className="row mt-4">
                    <table className="table table-striped">

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
                                        <td>{course.price} $</td>
                                        <td>
                                            <img src={course.imageBase64} alt="" />
                                        </td>
                                        <td>{course.category.name}</td>
                                        <td>{course.author.firstName} {course.author.lastName}</td>
                                        <td>
                                            <button className="btn btn-success" 
                                                    onClick={() => this.updateCourse(course.id)}>Update
                                            </button>
                                            <button className="btn btn-danger" 
                                                    style={{marginLeft: '10px'}} onClick={() => this.deleteCourse(course.id)}>Delete
                                            </button>
                                            <button className="btn btn-primary"
                                                    style={{marginLeft: '10px'}} onClick={() => this.detailsCourse(course.id)}>Details
                                             </button>
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