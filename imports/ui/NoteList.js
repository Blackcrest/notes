import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader />
            { props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}

            { props.notes.map((note) => { 
                return <NoteListItem key={note._id} note={note} />;
            })}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
}

export default withTracker(() => {
    Meteor.subscribe('notes');

    return {
        notes: Notes.find().fetch()
    };
})(NoteList);