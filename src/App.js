import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateCourseComponent from './components/CreateCourseComponent';
import ListCoursesComponent from './components/ListCoursesComponent';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import ViewCourseComponent from './components/ViewCourseComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
            <div className="container">
                <Switch>
                    <Route path="/" exact component= {ListCoursesComponent}></Route>
                    <Route path="/courses" exact component= {ListCoursesComponent}></Route>
                    <Route path="/add-course/:id" component= {CreateCourseComponent}></Route>
                    <Route path="/view-course/:id" component={ViewCourseComponent}></Route>
                    <Route path="/login" component={LoginComponent}></Route>
                    <Route path="/signup" component={SignUpComponent}></Route>
                </Switch>
            </div>
          <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
