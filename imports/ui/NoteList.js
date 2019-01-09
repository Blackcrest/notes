import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
    renderNotes = () => {
        if(props.notes.length === 0){
            return (
                <div>
                    <p>You have no notes. Click to button to add one.</p>
                </div>
                );
        } else{
            return props.notes.map((note) => { 
                return <NoteListItem key={note._id} note={note} />;
            });
        }
    }

    return (
        <div>
            <NoteListHeader />
            { this.renderNotes() }

            NoteList { props.notes.length }
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