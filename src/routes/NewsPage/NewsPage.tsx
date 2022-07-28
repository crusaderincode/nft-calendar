import React from 'react';
import {Container} from "@mui/material";

export const NewsPage = () => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100vw',
        }}>
            <Container maxWidth="md" style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                marginTop: '4rem'
            }}>

            </Container>

        </div>
    );
};

