import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div style={{ position: 'absolute',
                bottom: '0',
                width: '100%',
                height: '2.5rem'}}>
                <div className="text-white bg-dark">
                    <div className="container text-center">
                        <div className="row" style={{marginLeft: "300px"}}>
                            <div className="col-md-3 col-lg-4 col-xl-3">
                                <h5>Info</h5>
                                <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                                <p className="mb-0">
                                    &copy; Kristijan Eftimov 161110
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3">
                                <h5>Contact</h5>
                                <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                                <ul className="list-unstyled">
                                    <li><i className="fa fa-envelope mr-2"></i> kristijan.eftimov@students.finki.ukim.mk</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;