import React, { PropTypes } from 'react';
import { Button } from 'antd';

const AppContainer = ({ children, title = 'Koa Restfull Frontend' }) => (
    <div>
        <h1 className="main-container">{title}</h1>
        <Button type="primary">Primary</Button>
        <div className="main-wrapper">{children}</div>
    </div>
);

AppContainer.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default AppContainer;
