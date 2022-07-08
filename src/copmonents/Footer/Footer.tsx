import React from 'react';
import {Container, Typography} from "@mui/material";
import logo from "../../img/logo.png"
import {FaTwitter} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import isMobile from "../isMobile";

interface Footer {
    handleContactOpen: () => void
}

export const Footer = ({handleContactOpen}: Footer) => {
    const mobile = isMobile()

    return (
        <div style={{
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: mobile ? 'column' : 'row',
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
                width: mobile ? '90%' : '100%'
            }}>
                <img src={logo} alt="logo" style={{
                    height: mobile ? 30 : 40,
                }}/>

                {
                    !mobile && <Typography variant="h5" style={{
                        color: '#fff',
                        fontFamily: 'Pixels',
                        textAlign: 'center',

                    }}>
                        © Honey Drops 2022
                    </Typography>
                }


                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <FaTwitter style={{fontSize:  mobile ? 25 : 30, cursor: 'pointer', color: '#fff', marginLeft: '2rem',}}
                               onClick={() => window.open("https://twitter.com/Hazed_Chameleon", "_blank")}
                    />

                    <MdEmail style={{fontSize:  mobile ? 25 : 30, cursor: 'pointer', color: '#fff', marginLeft: '1rem',}}
                             onClick={handleContactOpen}
                    />
                </div>
            </div>
            {
                mobile && <Typography variant={mobile ? "h6" : 'h5'} style={{
                    color: '#fff',
                    fontFamily: 'Pixels',
                    textAlign: 'center',

                }}>
                    © Honey Drops 2022
                </Typography>
            }
        </div>
    );
};

