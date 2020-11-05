import React, { Component } from 'react';
import axios from 'axios';


class LoginComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
    }

    

    loginUser(e){
        e.preventDefault();
        axios.post(`http://localhost:8000/rest/login`).then(
            () => {
                this.props.history.push('/courses');
                window.location.reload();
            }
        )

    }

    handleUsernameChange(event){
        this.setState({ username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({ password: event.target.value});
    }

    goToRegister(){
        this.props.history.push('/signup');
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4 col-md-4"></div>
                        <div className="col-sm-4 col-md-4">
                        <br />
                            <form>
                                <h2 className="form-signin-heading">Please sign in</h2>
                                <p className="form-group">
                                    <label className="sr-only">Username</label>
                                    <input name="username" className="form-control" 
                                    placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                                </p>
                                <p className="form-group">
                                    <label className="sr-only">Password</label>
                                    <input type="password" name="password" className="form-control" 
                                    placeholder="Password"  value={this.state.password} onChange={this.handlePasswordChange} />
                                </p>
                                <button className="btn btn-lg btn-primary btn-block" onClick={this.loginUser}>Sign in</button>
                                <a className="btn btn-lg btn-success btn-block" href="/signup" onClick={this.goToRegister}>Register here</a>
                            </form>
                        </div>

                    <div className="col-sm-4 col-md-4"></div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;