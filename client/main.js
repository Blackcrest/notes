import { Meteor } from 'meteor/meteor';
import ReactDom from 'react-dom';
import history from '../imports/api/history';
import { Tracker } from 'meteor/tracker'; 
import { Session } from 'meteor/session';

import { routes, onAuthChange} from '../imports/routes/Routes';
import '../imports/startup/simple-schema-configuration.js';

componentDidMount = () => {
    if(Meteor.userId()){
        history.replace('/links');
    } else if(!Meteor.userId()){
        history.replace('/');
    }
}

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    if(selectedNoteId) {
        history.replace(`/dashboard/${selectedNoteId}`);
    }
})

Meteor.startup(() => {
    Session.set('selectedNoteId', undefined);
    ReactDom.render(routes, document.getElementById('app'));
});