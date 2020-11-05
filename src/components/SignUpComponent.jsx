import React, { Component } from 'react';
import axios from 'axios';


class SignUpComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            repeatedPassword: ''
        }
        this.goToLogin = this.goToLogin.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatedPasswordChange = this.handleRepeatedPasswordChange.bind(this);
    }

    goToLogin(){
        this.props.history.push('/login');
    }

    registerUser(e){
        e.preventDefault();
        axios.post("http://localhost:8000/rest/signup")
            .then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
              });
    }

    handleUsernameChange(event){
        this.setState({ username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({ password: event.target.value});
    }

    handleRepeatedPasswordChange(event){
        this.setState({ repeatedPassword: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4 col-md-4"></div>

                    <div className="col-sm-4 col-md-4">

                        <form>
                            <h2 className="form-signin-heading">Please sign in</h2>
                            <p>
                                <label for="username" className="sr-only">Username</label>
                                <input type="text" id="username" name="username" className="form-control"
                                 placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                            </p>
                            <p>
                                <label for="password" className="sr-only">Password</label>
                                <input type="password" id="password" name="password" className="form-control"
                                 placeholder="Password" required="" value={this.state.password} onChange={this.handlePasswordChange} />
                            </p>
                            <p>
                                <label for="repeatedPassword" className="sr-only">Repeat password</label>
                                <input type="password" id="repeatedPassword" name="repeatedPassword" className="form-control"
                                 placeholder="Repeat Password" required="" value={this.state.repeatedPassword} onChange={this.handleRepeatedPasswordChange} />
                            </p>
                            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.registerUser}>Register</button>
                            <a className="btn btn-lg btn-success btn-block" href="/login" onClick={this.goToLogin}>Already have an account? Login</a>
                        </form>
                    </div>

                    <div className="col-sm-4 col-md-4"></div>
                </div>
            </div>
        );
    }
}

export default SignUpComponent;