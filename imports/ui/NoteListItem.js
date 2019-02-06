import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
    return (
        <div className={"item" + (props.note.selected ? " item--selected" : "")} onClick={() => {
            props.Session.set('selectedNoteId', props.note._id);
        }}>
            <h5 className="item__title">{ props.note.title || 'Untitled note' }</h5>
            <p className="item__subtitle">{ moment(props.note.updatedAt).format('DD/M/YY') }</p>
        </div>
    );
};

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default withTracker(() => {
    return { Session };
})(NoteListItem);