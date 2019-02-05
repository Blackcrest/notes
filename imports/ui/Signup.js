import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

export class Signup extends React.Component {
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

        if(password.length < 9){
            return this.setState({error: 'Password must be more than 8 characters long.'});
        }

        this.props.createUser({email, password}, (err) => {
            if(err) {
                this.setState({error: err.reason});
            } else{
                this.setState({error: ''});
            }
        })
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__container">
                    <div className={"boxed-view__error-box boxed-view__error-box--" + (this.state.error ? 'show' : 'hide' )}>
                        {this.state.error ? <p>{this.state.error}</p> : undefined }
                    </div>
                    <div className="boxed-view__box">
                        <h1>Join</h1>

                        <form className="boxed-view__form" onSubmit={(e) => this.onSubmit(e)} noValidate>
                            <input type="email" ref="email" name="email" placeholder="Email" />
                            <input type="password" ref="password" name="password" placeholder="Password" />
                            <button className="button">Create Account</button>
                        </form>

                        <NavLink to="/">Already have an account?</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired,
}

export default withTracker(() => {
    return {
        createUser: Accounts.createUser
    }
})(Signup);