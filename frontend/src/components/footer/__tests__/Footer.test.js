import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Footer from '../Footer';

describe('<Footer />', () => {
    it('render component', () => {
        const wrapper = shallow(<Footer />);

        expect(wrapper.find('.version').html()).toBe(
            `<p class="version">${appName} - ${version}</p>`,
        );
    });
});
