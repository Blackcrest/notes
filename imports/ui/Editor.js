import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
    handleTitleChange = (e) => {
        this.props.call('notes.update', this.props.note._id, {
            title: e.target.value
        })
    }
    
    handleBodyChange = (e) => {
        this.props.call('notes.update', this.props.note._id, {
            body: e.target.value
        })
    }

    render() {
        if(this.props.note){
            return(
                <div>
                    <input type="text"
                           value={this.props.note.title}
                           placeholder="Untitled note"
                           onChange={this.handleTitleChange}  />
                    <textarea value={this.props.note.body} 
                              placeholder="Your note here..."
                              onChange={this.handleBodyChange}></textarea>
                    <button>Delete Note</button>
                </div>
            );
        } else{
            return(
                <p>
                    {this.props.selectedNoteId ? 'Note not found!' : 'Pick or create a note.'}
                </p>
            );
        }
    };
}

Editor.propTypes = {
    selectedNoteId: PropTypes.string,
    note: PropTypes.object
}

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
})(Editor);