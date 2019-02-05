import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NoteList } from './NoteList';

configure({ adapter: new Adapter() });

const notes = [
    {
        _id: 'noteId1',
        title: 'Test title',
        body: '',
        updatedAt: 0,
        userId: 'userId1'
    }, {
        _id: 'noteId2',
        title: 'Test',
        body: 'Something is here',
        updatedAt: 0,
        userId: 'userId2'
    }
];

if(Meteor.isClient){
    describe('NoteList', function(){
        it('should render NoteListItem for each note', function(){
            const wrapper = mount(<NoteList notes={notes} />);

            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
        });

        it('should render NoteListEmptyItem if zero notes', function(){
            const wrapper = mount(<NoteList notes={[]} />);

            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });
    });
}