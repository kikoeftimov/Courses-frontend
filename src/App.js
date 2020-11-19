// import React from 'react';
// import './App.css';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';
// import CreateCourseComponent from './components/CreateCourseComponent';
// import ListCoursesComponent from './components/ListCoursesComponent';
// // import LoginComponent from './components/LoginComponent';
// // import SignUpComponent from './components/SignUpComponent';
// import ViewCourseComponent from './components/ViewCourseComponent';

// function App() {
//   return (
//     <div>
//       <Router>
//           <HeaderComponent />
//             <div className="container">
//                 <Switch>
//                     <Route path="/" exact component= {ListCoursesComponent}></Route>
//                     <Route path="/courses" exact component= {ListCoursesComponent}></Route>
//                     <Route path="/add-course/:id" component= {CreateCourseComponent}></Route>
//                     <Route path="/view-course/:id" component={ViewCourseComponent}></Route>
//                     {/* <Route path="/login" component={LoginComponent}></Route>
//                     <Route path="/signup" component={SignUpComponent}></Route> */}
//                 </Switch>
//             </div>
//           <FooterComponent />
//       </Router>
//     </div>
//   );
// }

// export default App;

import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/AuthService";

import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import Profile from "./components/ProfileComponent";
import ListCoursesComponent from "./components/ListCoursesComponent";
import ViewCourseComponent from "./components/ViewCourseComponent";
import CreateCourseComponent from "./components/CreateCourseComponent";
import CoursesService from "./services/CoursesService";
import ShoppingCartComponent from "./components/ShoppingCartComponent";
import FooterComponent from "./components/FooterComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      terms: [],
    };
    this.searchData = this.searchData.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  searchData = (term) => {
    CoursesService.getCourseWithParams(term).then((response)=>{
        this.setState({
            terms: response.data
        });
    });
}


  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div style={{position: 'relative', minHeight: '100vh'}}>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Courses page
          </Link>
          <div className="navbar-nav mr-auto">

          <li className="nav-item">
                <Link to={"/courses"} className="nav-link">
                  Courses
                </Link>
          </li>

            {/* {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )} */}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/add-course/_add"} className="nav-link">
                  Add new course
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/charge"} className="nav-link">
                  Card
                </Link>
              </li>
            )}

            
          </div>


          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <form className="form-inline my-2 my-lg-0" onSubmit={this.searchData}>
                            <input name={"term"}
                                className="form-control mr-sm-2"
                                type="text"
                                placeholder="Search"
                                aria-label="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3" style={{ paddingBottom: '2.5rem'}}>
          <Switch>
            <Route exact path="/" component={ListCoursesComponent} />
            <Route exact path="/courses" component={ListCoursesComponent} />
            <Route exact path="/add-course/:id" component= {CreateCourseComponent} />
            <Route exact path="/view-course/:id" component={ViewCourseComponent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/charge" component={ShoppingCartComponent} />
          </Switch>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default App;