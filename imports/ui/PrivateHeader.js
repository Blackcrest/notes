import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const PrivateHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <img className="header__nav" onClick={() => props.handleMenuToggle()} src={props.isNavOpen ? "/images/x.svg" : "/images/bars.svg"} />
                <h1 className="header__title">{props.title}</h1>
                <button className="button button--logout" onClick={ () => props.handleLogout() }>Logout</button>
            </div>
        </div>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleMenuToggle: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    isNavOpen: PropTypes.bool.isRequired
}

export default withTracker(() => {
    return {
      handleMenuToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
      handleLogout: () => Accounts.logout(),
      isNavOpen: Session.get('isNavOpen')
    };
})(PrivateHeader);