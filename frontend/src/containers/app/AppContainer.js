declare var appName;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import style from './AppContainer.scss';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const AppContainer = props => {
    const { children, title } = props;

    return (
        <div key="AppContainer" className={style.appContainer}>
            <Helmet title={title} />
            <Header title={title} />
            <div className={style.page}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

AppContainer.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

AppContainer.defaultProps = {
    title: appName,
};

function mapStateToProps(state) {
    const { title } = state;
    return { title };
}

export default connect(mapStateToProps, {})(AppContainer);
