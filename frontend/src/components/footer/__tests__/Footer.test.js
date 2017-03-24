import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Footer from '../Footer'

import config from '../../../../config'

describe('<Footer />', () => {
    it('render component', () => {
        const title = 'foo'

        const wrapper = shallow(
            <Footer />,
        )

        expect(wrapper.find('.version').html()).toBe(`<p class="version">${config.version}</p>`)
    })
})
