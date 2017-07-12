import React from 'react';
import PropTypes from 'prop-types';

import style from './Footer.scss';

import config from '../../../config';

const Footer = props => {
    const { appName, version } = props;

    return (
        <div className={style.footer}>
            <p className={style.version}>
                {appName} - {version}
            </p>
        </div>
    );
};

Footer.propTypes = {
    appName: PropTypes.string,
    version: PropTypes.string,
};

Footer.defaultProps = {
    appName: config.appName,
    version: config.version,
};

export default Footer;
