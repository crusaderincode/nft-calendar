import React from 'react';
import {Container, Typography} from "@mui/material";
import logo from "../../img/logo.png"
import {FaTwitter} from "react-icons/fa";
import {MdEmail} from "react-icons/md";

interface Footer {
    handleContactOpen: () => void
}

export const Footer = ({handleContactOpen}: Footer) => {
    return (
        <div style={{
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 'auto'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: '5%',
                marginRight: '5%',
                width: '100%'
            }}>
                <img src={logo} alt="logo" style={{
                    height: 40,
                }}/>

                <Typography variant="h5" style={{
                    color: '#fff',
                    fontFamily: 'Pixels',
                    textAlign: 'center',

                }}>
                    © Honey Drops 2022
                </Typography>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <FaTwitter style={{fontSize: 30, cursor: 'pointer', color: '#fff', marginLeft: '2rem',}}
                               onClick={() => window.open("https://twitter.com/Hazed_Chameleon", "_blank")}
                    />

                    <MdEmail style={{fontSize: 30, cursor: 'pointer', color: '#fff', marginLeft: '1rem',}}
                             onClick={props.handleContactOpen}
                    />
                </div>
            </div>
        </div>
    );
};

