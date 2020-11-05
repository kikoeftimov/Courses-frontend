import React, { Component } from 'react';
import CoursesService from '../services/CoursesService';

class ViewCourseComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            course: {},
            category: {},
            author: {}
        }
    }

    componentDidMount(){
        CoursesService.getCourseById(this.state.id).then(res => {
            this.setState({ course: res.data});
            this.setState({ category: res.data.category});
            this.setState({ author: res.data.author});
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <p>Category: {this.state.category.name}</p>
                            <img src={this.state.course.imageBase64} alt={this.state.course.imageBase64} style={{width: '400px', height: '300px'}}/>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h2>{this.state.course.name}</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <p>{this.state.course.description}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    Created by:<p style={{fontWeight: 'bold', fontSize: '20px'}}>{this.state.author.firstName} {this.state.author.lastName}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <p style={{fontWeight: 'bold'}}>{this.state.course.price} $</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewCourseComponent;