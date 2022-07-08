import React from 'react';
import logo from "../../img/logo.png";
import {FaBars} from "react-icons/fa"

export const HeaderMobile = () => {
    return (
        <div style={{
            width: '100%',
            position: 'fixed',
            top: 0,
            zIndex: 999
        }}>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#22293b',
                boxShadow: 'rgb(0 0 0 / 30%) 5px 5px 10px',
                zIndex: 999
            }}>
            <img src={logo} alt="logo" style={{
                height: 35,
                padding: 10
            }}/>


            <FaBars style={{
                fontSize: 28,
                padding: 10,
                color: '#fff'
            }}/>
            </div>


        </div>
    );
};

