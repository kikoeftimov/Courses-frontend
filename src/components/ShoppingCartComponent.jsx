import React, { Component } from 'react';
import ShoppingCartService from '../services/ShoppingCartService';
import StripeButton from "./StripeButtonComponent";
import "./Checkout.css";

class ShoppingCartComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            courses: [],
            price: 0
        }
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.clearCart = this.clearCart.bind(this);
        this.continueShopping = this.continueShopping.bind(this);
        this.totalPrice = this.totalPrice.bind(this);
    }

    componentDidMount(){
        ShoppingCartService.getShoppingCart().then(res =>{
            this.setState({courses: res.data.courses});
        });
    }

    deleteFromCart(id){
        ShoppingCartService.removeCourseFromCart(id).then( () => {
            alert(`Course removed from cart!`);
            window.location = "/charge";
        });
    }

    clearCart(){
        ShoppingCartService.clearCart().then( () => {
            alert("Your shopping cart is empty!");
            window.location = "/charge";
        })
    }


    continueShopping(){
        window.location = "/courses";
    }

    totalPrice(){
        
    }



    render() {
        return (
            <div>
                <h2 className="text-center mt-5">Shopping cart</h2>
               
                <div className="row mt-4">
                    <table className="table table-striped table-bordered mt-5">

                        {/* <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead> */}

                        <tbody>
                            {
                                this.state.courses.map(
                                    course =>
                                    <tr key= {course.id}>
                                        <div className="row">
                                                <div className="col-md-3">
                                                    <img src={course.imageBase64} alt="" style={{width: '150px', height: '100px'}} />
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="row" style={{fontSize: '15px'}}>
                                                        <p>{course.name}</p>
                                                    </div>
                                                    <div className="row">
                                                        <br />
                                                        <span style={{fontSize: '25px'}}><b>{course.price}</b></span>
                                                        <span style={{fontSize: '25px'}}>$</span>
                                                    </div>
                                                    {/* <div className="row">
                                                        <br />
                                                        Posted on: <p>@item.date_posted</p>
                                                    </div> */}
                                                </div>
                                                <div className="col-md-2 justify-content-center align-items-center">
                                                    <p><b>{course.description}</b></p>
                                                </div>
                                                <div className="col-md-1">
                                                    Author: <p>{course.author.firstName} {course.author.lastName}</p>
                                                </div>
                                                <div className="col-md-1">
                                                    Category: <p>{course.category.name}</p>
                                                </div>
                                                <div className="col-md-2">
                                                    <button className="btn btn-danger mt-2" onClick={() => this.deleteFromCart(course.id)}>Remove from cart</button>
                                                </div>
                                                </div>                                        
                                    </tr>
                                    
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row mt-5">
                        <button onClick={this.clearCart} className="btn btn-danger ml-3" style={{height: '40px'}}>Clear shopping cart</button>
                        <button onClick={this.continueShopping} className="btn btn-primary ml-3" style={{height: '40px'}}>Continue shopping</button>
                        <div className="total" style={{marginLeft: '550px'}}>
                            TOTAL: {this.state.courses.reduce((fullPrice, course) => fullPrice + course.price, 0)}$
                        </div>
                        <StripeButton price={this.state.courses.reduce((fullPrice, course) => fullPrice + course.price, 0)} style={{height: '40px'}}/>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default ShoppingCartComponent;
