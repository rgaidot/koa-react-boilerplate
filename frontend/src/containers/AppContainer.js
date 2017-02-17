import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppContainer = ({ children, title = 'Koa Restfull Frontend' }) => (
    <div className="AppContainer">
        <Helmet title={title} />
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
