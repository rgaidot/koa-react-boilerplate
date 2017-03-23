import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import HomeContainer from './HomeContainer'

describe('<HomeContainer />', () => {
    it('render component', () => {
        const wrapper = shallow(
            <HomeContainer />,
        )

        expect(wrapper.find('p').html()).toBe('<p>foo</p>')
    })
})
