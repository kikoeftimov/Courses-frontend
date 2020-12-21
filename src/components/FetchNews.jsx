// import React, { Component } from 'react';
// import axios from 'axios';
// import Pagination from "react-js-pagination";
// import CoursesService from '../services/CoursesService';
// import AuthService from '../services/AuthService';
// import ShoppingCartService from '../services/ShoppingCartService';


// class FetchNews extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       courses: [],
//       showAdminBoard: false,
//       currentUser: undefined,
//       activePage:1,
//       totalPages: null,
//       itemsCountPerPage:null,
//       totalItemsCount:null
//     };
//     this.handlePageChange = this.handlePageChange.bind(this);
//     this.fetchURL = this.fetchURL.bind(this);
//   }

//   fetchURL(page) {

//     axios.get(`http://localhost:8080/api/courses?page=${page}&size=5`)
//       .then( response => {

//           const totalPages = response.data.totalPages;
//           const itemsCountPerPage = response.data.size;
//           const totalItemsCount = response.data.totalElements;

//           this.setState({totalPages: totalPages})
//           this.setState({totalItemsCount: totalItemsCount})
//           this.setState({itemsCountPerPage: itemsCountPerPage})

//           const results = response.data.content;

//           const updatedResults = results.map(results => {

//             var timestamp = new Date(results.pubDate)
//             var dateString = timestamp.toGMTString()
//             return {
//                 ...results, dateString
//               }
//             });

//             this.setState({courses: updatedResults});
//             console.log(this.state.courses);
//             console.log(updatedResults);
//             console.log(this.state.activePage);
//             console.log(this.state.itemsCountPerPage);
//         }
//       );
//     }

//   componentDidMount () {
//       this.fetchURL(this.state.activePage);

//       const user = AuthService.getCurrentUser();

//       if (user) {
//           this.setState({
//               currentUser: user,
//               showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//           });
//       }
//     }

//   handlePageChange(pageNumber) {
//     console.log(`active page is ${pageNumber}`);
//     this.setState({activePage: pageNumber})
//     this.fetchURL(pageNumber)

//     }

//   populateRowsWithData = () => {
//     const coursess = this.state.courses.map(course => {
//         return <div
//             key = {course.id}
//             headline = {course.description}
//             category = {course.category.name}
//             pubDate = {course.dateString}
//             snippet = {course.author.firstName}
//             webURL = {course.webURL}
//           />;
//       });

//       return coursess
//     }

//   render(){
//     const { currentUser, showAdminBoard } = this.state;

//     return (
//       <div >

//       {this.populateRowsWithData()}

//       <div className="d-flex justify-content-center">
//         <Pagination
//          hideNavigation
//          activePage={this.state.activePage}
//          itemsCountPerPage={this.state.itemsCountPerPage}
//          totalItemsCount={this.state.totalItemsCount}
//          pageRangeDisplayed={10}
//          itemClass='page-item'
//          linkClass='btn btn-light'
//          onChange={this.handlePageChange}
//          />
//        </div>
//       </div>
//     );
//   }
// }

// export default FetchNews;
