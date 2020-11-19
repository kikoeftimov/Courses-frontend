import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import TransactionsService from '../services/TransactionsService';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      transactions: [],
      shoppingCart: {}
    };
    this.exportData = this.exportData.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

    TransactionsService.getTransactions().then(res => {
      this.setState({transactions: res.data});
      console.log(this.state.transactions);
  });
  }

  exportData(){
    TransactionsService.exportTransactions().then( () => {
      console.log("clicked");
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady && currentUser.username==="admin") ?
        <div>
          <h1>
            <strong>{currentUser.username}</strong> profile
          </h1>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        <div className="row">
        <a href="http://localhost:8080/api/transactions/export" style={{marginLeft: '900px',color: 'blue'}}>Export to csv</a>
        <br/>
        <a href="http://localhost:8080/api/transactions/export/pdf" style={{marginLeft: '900px',color: 'blue'}}>Export to pdf</a>
        <br />
        <br />
            <table className="table table-striped table-bordered">

              <thead>
                  <tr>
                      <th>Email</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>User</th>
                      <th>ShoppingCart</th>
                  </tr>
              </thead>

              <tbody>
                  {
                      this.state.transactions.map(
                          transaction =>
                          <tr key= {transaction.id}>
                              <td>{transaction.email}</td>
                              <td>{transaction.amount} $</td>
                              <td>{transaction.localDateTime}</td>
                              <td>{this.state.currentUser.username}</td>
                              <td>{transaction.shoppingCart.status}</td>
                          </tr>
                      )
                  }
              </tbody>
          </table>
      </div>

      </div> 
      : ((this.state.userReady) && <div>
      <h1>
        <strong>{currentUser.username}</strong> profile
      </h1>
    <p>
      <strong>Token:</strong>{" "}
      {currentUser.accessToken.substring(0, 20)} ...{" "}
      {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
    </p>
    <p>
      <strong>Email:</strong>{" "}
      {currentUser.email}
    </p>
    <strong>Authorities:</strong>
    <ul>
      {currentUser.roles &&
        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
    </ul></div>)}
      
      
      </div>
    );
  }
}

export default Profile;