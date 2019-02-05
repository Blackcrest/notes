import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom'

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

configure({ adapter: new Adapter() });

//TODO Fix Tests!!

if(Meteor.isClient){
    describe('Editor', function(){
        let history;
        let call;

        beforeEach(function() {
            call = expect.createSpy();
            history = {
                push: expect.createSpy()
            }
        })

        it('should render pick note message', function(){
           const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
                                    <Editor call={call} history={history} />
                                  </MemoryRouter>);

           expect(wrapper.find('p').text()).toBe('Pick or create a note.')
        });

        it('should render notFound message', function(){
            const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
                                     <Editor selectedNoteId={notes[0]._id} call={call} history={history} />
                                   </MemoryRouter>);
 
            expect(wrapper.find('p').text()).toBe('Note not found!')
         });

         it('should remove note', function() {
            const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
                                    <Editor selectedNoteId={notes[0]._id} note={note[0]} call={call} history={history} />
                                  </MemoryRouter>);

            wrapper.find('button').simulate('click');

            expect(history.push).toHaveBeenCalledWith('/dashboard');
            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
         })

         it('should update the note body on textarea change', function() {
            const newBody = 'This is my new body text';
            const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
                                    <Editor selectedNoteId={notes[0]._id} note={note[0]} call={call} history={history} />
                                  </MemoryRouter>);

            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody
                }
            });

            expect(wrapper.state('body')).toBe(newBody);
            expect(call).toHaveBeenCalledWith('notes.update', note[0]._id, { body: newBody });
         })

         it('should update the note title on input change', function() {
            const newTitle = 'This is my new title';
            const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
                                    <Editor selectedNoteId={notes[0]._id} note={note[0]} call={call} history={history} />
                                  </MemoryRouter>);

            wrapper.find('input').simulate('change', {
                target: {
                    value: newTitle
                }
            });

            expect(wrapper.state('title')).toBe(newBody);
            expect(call).toHaveBeenCalledWith('notes.update', note[0]._id, { title: newTitle });
         })

         it('should set the state for new note', function(){
            const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
                                    <Editor call={call} history={history} />
                                  </MemoryRouter>);

            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            })

            expect(wrapper.state('title')).toBe(notes[0].title);
            expect(wrapper.state('body')).toBe(notes[0].body);
         })
    });
}