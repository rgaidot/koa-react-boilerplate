import React, { PropTypes } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppContainer = ({ children, title = 'Koa Restfull Frontend' }) => (
    <div className="AppContainer">
        <Header title={title} />
        <div className="main-wrapper">{children}</div>
        <Footer />
    </div>
);

AppContainer.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default AppContainer;
