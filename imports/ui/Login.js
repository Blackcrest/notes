import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

export class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        this.props.loginWithPassword({email}, password, (err) => {
            if(err) {
                this.setState({error: 'Unable to log in. Check email and password.'});
            } else{
                this.setState({error: ''});
            }
        } )
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__container">
                    <div className={"boxed-view__error-box boxed-view__error-box--" + (this.state.error ? 'show' : 'hide' )}>
                        {this.state.error ? <p>{this.state.error}</p> : undefined }
                    </div>
                    <div className="boxed-view__box">
                        <h1>Login</h1>

                        <form className="boxed-view__form" onSubmit={(e) => this.onSubmit(e)} noValidate>
                            <input className="default-input" type="email" ref="email" name="email" placeholder="Email" />
                            <input className="default-input" type="password" ref="password" name="password" placeholder="Password" />
                            <button className="button">Login</button>
                        </form>
                        
                        <NavLink to="/signup">Need an account?</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginWithPassword: PropTypes.func.isRequired,
}

export default withTracker(() => {
    return {
        loginWithPassword: Meteor.loginWithPassword
    };
})(Login);