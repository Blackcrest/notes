import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { notes } from '../fixtures/fixtures';

import { NoteListHeader } from './NoteListHeader';

configure({ adapter: new Adapter() });

if(Meteor.isClient){
    describe('NoteListHeader', function() {
        let Session;
        let call;

        beforeEach(function() {
            call = expect.createSpy();
            Session = {
                set: expect.createSpy();
            }
        })

        it('should call meteorCall on Click', function() {
            const wrapper = mount( <NoteListHeader Session={Session} meteorCall={call} /> );

            wrapper.find('button').simulate('click');
            call.calls[0].arguments[1](undefined, notes[0]._id);

            expect(call.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
        });

        it('should not set Session for failed insert', function(){
            const wrapper = mount( <NoteListHeader Session={Session} meteorCall={call} /> );

            wrapper.find('button').simulate('click');
            call.calls[0].arguments[1]({}, undefined);

            expect(call.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toNotHaveBeenCalled();
        })
    });
}