import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.meteorCall('notes.insert');
            }}>New Note</button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
}

export default withTracker(() => {
    return {
        meteorCall: Meteor.call
    };
})(NoteListHeader);