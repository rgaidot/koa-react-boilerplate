import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Header from './Header'

describe('<Header />', () => {
    it('render component', () => {
        const title = 'foo'

        const wrapper = shallow(
            <Header title={title} />,
        )

        expect(wrapper.find('h1').html()).toBe('<h1 class="title">foo</h1>')
    })
})
