import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import history from '../api/history';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        if(!Meteor.userId()){
            history.replace('/')
        }

        Session.set('selectedNoteId', this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <PrivateHeader title="Notes" />
                <div className="page-content">
                    <div className="page-content__sidebar">
                        <NoteList />
                    </div>
                    <div className="page-content__main">
                        <Editor />
                    </div>
                </div>
            </div>
        );
    }
};