import React, { Component } from 'react';
import CoursesService from '../services/CoursesService';
import ShoppingCartService from '../services/ShoppingCartService';
import AuthService from '../services/AuthService';


class ViewCourseComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            course: {},
            category: {},
            author: {},
            currentUser: undefined,
        }
        this.addToCart = this.addToCart.bind(this);

    }

    componentDidMount(){
        CoursesService.getCourseById(this.state.id).then(res => {
            this.setState({ course: res.data});
            this.setState({ category: res.data.category});
            this.setState({ author: res.data.author});
        });

        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    addToCart(id){
        ShoppingCartService.addCourseToCart(id).then( () => {
            alert(`Course added to cart!`);
            this.props.history.push('/charge');
        }).catch(err => {
            alert(`Course already in cart!`);
        });
    }

    render() {
        const { currentUser} = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <p>Category: {this.state.category.name}</p>
                            <img src={this.state.course.imageBase64} alt="" style={{width: '400px', height: '300px'}}/>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h1>{this.state.course.name}</h1>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h6>{this.state.course.description}</h6>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-12">
                                   <span style={{fontWeight: 'bold', fontSize: '20px'}}>Created by: {this.state.author.firstName} {this.state.author.lastName}</span>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span style={{fontWeight: 'bold',  fontSize: '20px'}}>Price: {this.state.course.price} $</span>
                                </div>
                            </div>
                            <br/>
                            {currentUser && (
                            <div className="row">
                                <div className="col-sm-12">
                                        <button className="btn btn-success" onClick={() => this.addToCart(this.state.course.id)}>Add to cart
                                        </button>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewCourseComponent;