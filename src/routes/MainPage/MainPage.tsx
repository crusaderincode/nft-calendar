import React, {useCallback, useEffect, useState} from 'react';
import {Button, Container, Paper, Typography} from "@mui/material";
import Header from "../../copmonents/Header";
import UserEventsList from "../../copmonents/UserEventsList";
import PriceModal from "../../copmonents/PriceModal";
import {Dispatch} from "@reduxjs/toolkit";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getEvents, getPastEvents} from "../../redux/actions/event";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import ContactModal from "../../copmonents/ContactModal";



export const MainPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [openContactModal, setOpenContactModal] = useState(false);
    const handleOpenContactModal = () => setOpenContactModal(true);
    const handleCloseContactModal = () => setOpenContactModal(false);

    const [isUpcomingOpen, setIsUpcomingOpen] = useState(true)
    const [isUpcoming, setIsUpcoming] = useState(true)

    const handleUpcomingSwitch = () => {
        setIsUpcoming(!isUpcoming)
        setIsUpcomingOpen(!isUpcomingOpen)
    }


    const dispatch: Dispatch<any> = useDispatch()

    const events = useSelector(
        (state: SelectorState) => state.event.events,
        shallowEqual
    )

    const pastEvents = useSelector(
        (state: SelectorState) => state.event.past,
        shallowEqual
    )

    const fetchEvents = useCallback(
        () => dispatch(getEvents()),
        [dispatch]
    )

    const fetchPastEvents = useCallback(
        () => dispatch(getPastEvents()),
        [dispatch]
    )

    useEffect(() => {
        fetchEvents()
        fetchPastEvents()
    }, [])


    const featuredEvents = events.filter((e) => Number(e.promo) > 0)
    const commonEvents = events.filter((e) => Number(e.promo) === 0)


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
            width: '100vw',
            marginTop: '8rem'
        }}>
        <Header handleModalOpen={handleOpenModal} handleContactOpen={handleOpenContactModal}/>
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
                        Featured
                        <Typography variant="h3" display="inline" style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            marginLeft: 15
                        }}>
                            Drops
                        </Typography>
                    </Typography>
                </div>
                <UserEventsList eventsList={featuredEvents}/>
                <div style={{
                    marginTop: '2rem',
                    height: isUpcomingOpen ? 60 : 140,
                    overflow: 'hidden',
                    transition: "all 0.3s ease-in-out",
                }}>
                <Typography variant="h3" display="inline" onClick={() => setIsUpcomingOpen(!isUpcomingOpen)} style={{
                    color: '#fbff2b',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }}>
                    {isUpcoming ? 'Upcoming' : 'Archive'}
                </Typography>
                    {
                        isUpcomingOpen ? <MdKeyboardArrowDown onClick={() => setIsUpcomingOpen(!isUpcomingOpen)} style={{
                            color: '#fbff2b',
                            fontSize: 50,
                            verticalAlign: 'bottom',
                            marginLeft: -10,
                            cursor: 'pointer'
                        }}/> : <MdKeyboardArrowUp onClick={() => setIsUpcomingOpen(!isUpcomingOpen)} style={{
                            color: '#fbff2b',
                            fontSize: 50,
                            verticalAlign: 'bottom',
                            marginLeft: -10,
                            cursor: 'pointer'
                        }}/>
                    }

                    <Typography variant="h3" display="inline" style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginLeft: 2
                    }}>
                        Drops
                    </Typography>

                    <Paper onClick={handleUpcomingSwitch} style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: 15,
                        width: isUpcoming ? 200 : 250,
                        marginTop: 20,
                        cursor: 'pointer'
                    }}>
                    <Typography variant="h3" style={{
                        color: '#fbff2b',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        {!isUpcoming ? 'Upcoming' : 'Archive'}
                    </Typography>
                    </Paper>
                </div>
                <UserEventsList eventsList={isUpcoming ? commonEvents : pastEvents}/>
            </Container>
            <PriceModal handleClose={handleCloseModal} state={openModal} />
            <ContactModal handleClose={handleCloseContactModal} state={openContactModal} />
        </div>
    );
};

