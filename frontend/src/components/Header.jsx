import React from 'react';
import { Link, Routes, Route } from "react-router-dom";
import headerLogo from '../images/Vector.svg';

function Header({ userEmail, handleSignOut }) {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={headerLogo}
                alt="Логотип"
            />
            <Routes>
                <Route
                    path='/sign-in'
                    element={<Link to='/sign-up' className="header__link">Регистрация</Link>}
                />
                <Route
                    path='/sign-up'
                    element={<Link to='/sign-in' className="header__link">Войти</Link>}
                />
                <Route
                    path='/'
                    element={
                        <div className="header__container">
                            <p className="header__row">{userEmail}</p>
                            <p className="header__row header__row_sign-out" onClick={handleSignOut}>Выйти</p>
                        </div>
                    }
                />
            </Routes>
        </header>
    );
}
export default Header;