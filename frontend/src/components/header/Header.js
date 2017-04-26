import React from 'react';
import PropTypes from 'prop-types';

import style from './Header.scss';

const Header = ({ title }) => (
    <div className={style.header}>
        <h1 className={style.title}>{title}</h1>
    </div>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
