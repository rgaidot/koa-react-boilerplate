import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppContainer from './containers/app/AppContainer'
import HomeContainer from './containers/home/HomeContainer'
import NotFoundContainer from './containers/app/NotFoundContainer'

const routes = (
    <Route path="/" component={AppContainer} >
        <IndexRoute component={HomeContainer} />
        <Route path="*" name="404" component={NotFoundContainer} />
    </Route>
)

export default routes
