import React from 'react';
import css from './header.module.css'

import {useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import {loginService} from "../../Service/loginService";


const Header = () => {
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            loginService.deleteTokens();
            navigate('/login');
            window.location.reload();
        } catch (error) {
            console.error('Помилка при виході з акаунту', error);
        }
    };
    return (
        <div className={css.father_container}>
            <div className={css.header_logo}>
                VH17_CRM
            </div>
            <div className={css.btn_container}>
                <button className={css.btn}><NavLink className={css.text_btn} to={'/settings'}>Admin Settings</NavLink>
                </button>
                <button onClick={handleLogout} className={css.btn}>Exit</button>
            </div>
        </div>
    );
};

export {Header};