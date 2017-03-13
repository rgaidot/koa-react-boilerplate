import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NotFoundContainer from './NotFoundContainer';

describe('<NotFoundContainer />', () => {
    it('render component', () => {
        const wrapper = shallow(
            <NotFoundContainer />
        );

        expect(wrapper.find('h2').html()).toBe('<h2>404</h2>');
    });
});
