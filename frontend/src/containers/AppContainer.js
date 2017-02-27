import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from '../../config';
import Header from '../components/Header';
import Footer from '../components/Footer';

export class AppContainer extends Component {
    render() {
        const {
            children,
            title,
        } = this.props;

        return (
            <div key="AppContainer" className="AppContainer">
                <Helmet title={title} />
                <Header title={title} />
                <div className="main-wrapper">{children}</div>
                <Footer />
            </div>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.node,
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
