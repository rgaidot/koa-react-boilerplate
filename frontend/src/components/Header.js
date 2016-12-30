import React, { PropTypes } from 'react';
import style from './Header.scss';

const Header = ({ title = 'Koa Restfull Frontend' }) => (
    <div className={style.Header}>
        <h1 className={style.Title}>{title}</h1>
    </div>
);

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;
