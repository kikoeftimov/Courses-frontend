import React, { Component } from 'react';

class HeaderComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            term: ''
        }
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch = (e)=>{
        e.preventDefault();
        props.onSearch(e.target["term"].value);
    }


    // findCoursesTerm(term){
    //     this.props.history.push(`/courses?query=${term}`)
    //  }


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container">
                    <a className="navbar-brand" href="/courses">Courses page</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                            aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/courses">Courses</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/add-course/_add">Add new course</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/payments/charge">Cart <span class="sr-only"></span></a>
                            </li>
                        </ul>

                        <form class="form-inline my-2 my-lg-0" onSubmit={onSearch}>
                            <input name={"term"}
                                class="form-control mr-sm-2"
                                type="text"
                                placeholder="Search"
                                aria-label="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                {/* <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link"></a>
                    </li> 
                     <li className="nav-item">
                        <a className="nav-link" href="/logout">Log out</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Log in</a>
                    </li>
                </ul> */}
                </nav>
            </div>
        );
    }
}

export default HeaderComponent;