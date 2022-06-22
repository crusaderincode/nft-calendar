import React, {useEffect, useState} from 'react';
import {Button, Container, Paper, Typography} from "@mui/material";
import Header from "../../copmonents/Header";
import UserEventsList from "../../copmonents/UserEventsList";
import PriceModal from "../../copmonents/PriceModal";


export const MainPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
            width: '100vw',
            marginTop: '10rem'
        }}>
        <Header handleModalOpen={handleOpenModal}/>
            <Container maxWidth="md" style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column'
            }}>
                <div>
                <Typography variant="h3" display="inline" style={{
                    color: '#fbff2b',
                    fontWeight: 'bold'
                }}>
                    Upcoming
                    <Typography variant="h3" display="inline" style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginLeft: 15
                    }}>
                        Drops
                    </Typography>
                </Typography>
                </div>
            <UserEventsList />
            </Container>
            <PriceModal handleClose={handleCloseModal} state={openModal} />
        </div>
    );
};

