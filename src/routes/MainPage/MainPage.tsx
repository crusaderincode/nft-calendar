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
            alignItems: 'center',
            minHeight: '100vh',
            height: '100%',
            width: '100vw',
        }}>
        <Header handleModalOpen={handleOpenModal}/>
            <PriceModal handleClose={handleCloseModal} state={openModal} />
            <Container maxWidth="md" style={{
                height: '100%',
                width: '100%'
            }}>
            <UserEventsList />
            </Container>
        </div>
    );
};

