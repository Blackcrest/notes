import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NoteListHeader } from './NoteListHeader';

configure({ adapter: new Adapter() });

if(Meteor.isClient){
    describe('NoteListHeader', function() {
        // It should call meteor call on click
        // 1. create spy
        // 2. render component with spy
        // 3. simulate click
        // 4. assert spy was called

        it('should call meteorCall on Click', function() {
            const spy = expect.createSpy();
            const wrapper = mount( <NoteListHeader meteorCall={spy} /> );

            wrapper.find('button').simulate('click');

            expect(spy).toHaveBeenCalledWith('notes.insert');
        });
    });
}