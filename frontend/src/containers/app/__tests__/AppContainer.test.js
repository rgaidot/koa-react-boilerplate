import React from 'react'
import configureStore from 'redux-mock-store'
import createFragment from 'react-addons-create-fragment'
import expect from 'expect'
import { shallow } from 'enzyme'
import AppContainer from '../AppContainer'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('<AppContainer />', () => {
    it('render component', () => {
        const initialState = {}
        const store = mockStore(initialState)

        const wrapper = shallow(
            <AppContainer store={store} children={createFragment()} />,
        )

        expect(wrapper.find('AppContainer').length).toBe(1)
    })
})
