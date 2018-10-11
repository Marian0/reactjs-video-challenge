import React, {Component} from 'react';
import logo from '../../logo.svg';
import './Header.css';

class Header extends Component {

    render() {

        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>
                        <img src={logo} className="App-logo" alt="logo"/>
                        ReactJS Video Challenge
                    </h1>
                </div>

            </div>
        );
    }
}


export default Header;
