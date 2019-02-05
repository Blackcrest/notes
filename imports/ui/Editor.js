import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import history from '../api/history';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            body: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if(currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            })
        }
    }

    handleTitleChange = (e) => {
        const title = e.target.value;
        this.setState({title});

        this.props.call('notes.update', this.props.note._id, {title});
    }
    
    handleBodyChange = (e) => {
        const body = e.target.value;
        this.setState({body});

        this.props.call('notes.update', this.props.note._id, { body });
    }

    handleDelete = () => {
        this.props.call('notes.remove', this.props.note._id);
        Session.set('selectedNoteId', '');
        this.props.history.push('/dashboard');
    }

    render() {
        if(this.props.note){
            return(
                <div>
                    <input type="text"
                           value={this.state.title}
                           placeholder="Untitled note"
                           onChange={this.handleTitleChange}  />
                    <textarea value={this.state.body} 
                              placeholder="Your note here..."
                              onChange={this.handleBodyChange}></textarea>
                    <button onClick={this.handleDelete}>Delete Note</button>
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
    note: PropTypes.object,
    call: PropTypes.func.isRequired,
    history: PropTypes.object
}

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        history
    };
})(Editor);