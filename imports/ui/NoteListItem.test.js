import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';

import NoteListItem from './NoteListItem';

configure({ adapter: new Adapter() });

if(Meteor.isClient){
    describe('NoteListItem', function () {
        it('should render title and time stamp', function() {
            const title = 'Test Title';
            const updatedAt = '1547027317798';
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe(moment(updatedAt).format('DD/M/YY'));
        });

        it('should set default title if no title set', function() {
            const title = '';
            const updatedAt = '1547027317798';
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe('Untitled note');
            expect(wrapper.find('p').text()).toBe(moment(updatedAt).format('DD/M/YY'));
        });
    });
}