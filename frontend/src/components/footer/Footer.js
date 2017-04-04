import React, { PropTypes } from 'react';
import style from './Footer.scss';

import config from '../../../config';

const Footer = props => {
    const {
        version,
    } = props;

    return (
        <div className={style.footer}>
            <p className={style.version}>{version}</p>
        </div>
    );
};

Footer.propTypes = {
    version: PropTypes.string,
};

Footer.defaultProps = {
    version: config.version,
};

export default Footer;
