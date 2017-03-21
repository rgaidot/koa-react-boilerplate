import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from '../../../config';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const AppContainer = (props) => {
    const {
        children,
        title,
    } = props;

    return (
        <div key="AppContainer" className="AppContainer">
            <Helmet title={title} />
            <Header title={title} />
            <div className="main-wrapper">{children}</div>
            <Footer />
        </div>
    );
};

AppContainer.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

AppContainer.defaultProps = {
    title: config.appName,
};

function mapStateToProps(state) {
    const { title } = state;
    return { title };
}

export default connect(mapStateToProps, {})(AppContainer);
