import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';
import { Session } from 'meteor/session';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        Session.set('selectedNoteId', this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <PrivateHeader title="Dashboard" />
                <div className="page-content">
                    <NoteList />
                    <Editor />
                </div>
            </div>
        );
    }
};