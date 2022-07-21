import React, {useCallback, useEffect, useState,} from 'react';
import {Button, Container, Paper, Typography} from "@mui/material";
import Header from "../../copmonents/Header";
import UserEventsList from "../../copmonents/UserEventsList";
import PriceModal from "../../copmonents/PriceModal";
import {Dispatch} from "@reduxjs/toolkit";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getEvents, getPastEvents} from "../../redux/actions/event";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import ContactModal from "../../copmonents/ContactModal";
import Footer from "../../copmonents/Footer";
import {getPromos} from "../../redux/actions/promo";
import HeaderMobile from "../../copmonents/HeaderMobile";
import isMobile from "../../copmonents/isMobile"





export const MainPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const mobile: boolean = isMobile()

    //Get from store
    const events = useSelector(
        (state: SelectorState) => state.event.events,
        shallowEqual
    )

    const featuredEvents = events.filter((e) => Number(e.promo) > 0)
    const commonEvents = events.filter((e) => Number(e.promo) === 0)

    const pastEvents = useSelector(
        (state: SelectorState) => state.event.past,
        shallowEqual
    )

    const promo = useSelector(
        (state: SelectorPromoState) => state.promo.promos,
        shallowEqual
    )

    const fetchEvents = useCallback(
        () => dispatch(getEvents()),
        [dispatch]
    )

    const fetchPromo = useCallback(
        () => dispatch(getPromos()),
        [dispatch]
    )

    const fetchPastEvents = useCallback(
        () => dispatch(getPastEvents()),
        [dispatch]
    )

    //Main state
    const [selectedEvents, setSelectedEvents] = useState(events)
    const [filteredEvents, setFilteredEvents] = useState<IEvent[] | []>([])
    const [mintedEvents, setMintedEvents] = useState<IEvent[] | []>(pastEvents)
    const [mintedFilteredEvents, setMintedFilteredEvents] = useState<IEvent[] | []>([])

        //UseEffect for setState after fetching
    useEffect(() => {
        setSelectedEvents(commonEvents)
        setFilteredEvents(commonEvents)
    }, [events])

    useEffect(() => {
        setMintedEvents(pastEvents)
        setMintedFilteredEvents(pastEvents)
    }, [pastEvents])

    useEffect(() => {
        setFilteredEvents(selectedEvents)
    }, [selectedEvents])


    //Filters
    const [isUpcomingOpen, setIsUpcomingOpen] = useState(true)
    const [isUpcoming, setIsUpcoming] = useState(true)
    const [blockchain, setBlockchain] = useState('ALL')

    const handleUpcomingSwitch = () => {
        setIsUpcoming(!isUpcoming)
        setIsUpcomingOpen(!isUpcomingOpen)
    }

    const localAction = (selected: string) => {
        setBlockchain(selected)
    }

    useEffect(() => {
        switch (blockchain) {
            case "SOL": setSelectedEvents(commonEvents.filter(e => e.currency === "SOL")); break;
            case "ETH": setSelectedEvents(commonEvents.filter(e => e.currency === "ETH")); break;
            case "MATIC": setSelectedEvents(commonEvents.filter(e => e.currency === "MATIC")); break;
            case "ADA": setSelectedEvents(commonEvents.filter(e => e.currency === "ADA")); break;
            default: setSelectedEvents(commonEvents); break;

        }
    }, [blockchain])

    //Submit modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    //Contact modal
    const [openContactModal, setOpenContactModal] = useState(false);
    const handleOpenContactModal = () => setOpenContactModal(true);
    const handleCloseContactModal = () => setOpenContactModal(false);

    //Main useEffect
    useEffect(() => {
        if (
            selectedEvents.length === 0
        ) {
            fetchEvents()
            fetchPastEvents()
            fetchPromo()
        }

    }, [])

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100vw',
        }}>

            {
                mobile ? <HeaderMobile
                    handleModalOpen={handleOpenModal}
                    handleContactOpen={handleOpenContactModal}
                    localAction={localAction}
                    curEvents={selectedEvents}
                    pastEvents={mintedEvents}
                    setPastEvents={setMintedFilteredEvents}
                    isUpcoming={isUpcoming}
                    setCurEvents={setFilteredEvents}
                /> : <Header
                    handleModalOpen={handleOpenModal}
                    handleContactOpen={handleOpenContactModal}
                    localAction={localAction}
                    curEvents={selectedEvents}
                    pastEvents={mintedEvents}
                    setPastEvents={setMintedFilteredEvents}
                    isUpcoming={isUpcoming}
                    setCurEvents={setFilteredEvents}
                />
            }

            <Container maxWidth="md" style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                marginTop: mobile ? '5rem' : '8rem'
            }}>
                {
                   promo && promo.map((promo: IPromo) => (
                      <img src={promo.image}
                           onClick={() => window.open(promo.url, "_blank")}
                           key={promo.id} style={{
                          width: '100%',
                          marginBottom: '1rem',
                          cursor: 'pointer',
                          borderRadius: 10
                      }}/>
                    ))
                }
                <div style={{
                    marginTop: mobile ? '1rem' : '2rem'
                }}>
                    <Typography variant={mobile ? "h5" : "h4"} display="inline" style={{
                        color: '#fbff2b',
                        fontWeight: 'bold'
                    }}>
                        Featured
                        <Typography variant={mobile ? "h5" : "h4"} display="inline" style={{
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
                    marginTop: mobile ? '1rem' : '2rem',
                    height: mobile ? isUpcomingOpen ? 40 : 80 : isUpcomingOpen ? 60 : 140,
                    overflow: 'hidden',
                    transition: "all 0.3s ease-in-out",
                }}>
                    <Typography variant={mobile ? "h5" : "h4"} display="inline" onClick={() => setIsUpcomingOpen(!isUpcomingOpen)} style={{
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
                            fontSize: mobile ? 30 : 40,
                            verticalAlign: 'bottom',
                            marginLeft: -8,
                            cursor: 'pointer'
                        }}/> : <MdKeyboardArrowUp onClick={() => setIsUpcomingOpen(!isUpcomingOpen)} style={{
                            color: '#fbff2b',
                            fontSize: mobile ? 30 : 40,
                            verticalAlign: 'bottom',
                            marginLeft: -8,
                            cursor: 'pointer'
                        }}/>
                    }

                    <Typography variant={mobile ? "h5" : "h4"} display="inline" style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginLeft: 2
                    }}>
                        Drops
                    </Typography>

                    <Paper onClick={handleUpcomingSwitch} style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: 15,
                        width: isUpcoming ? 150 : 200,
                        marginTop: mobile ? 10 : 20,
                        cursor: 'pointer'
                    }}>
                        <Typography variant={mobile ? "h5" : "h4"} style={{
                        color: '#fbff2b',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        {!isUpcoming ? 'Upcoming' : 'Archive'}
                    </Typography>
                    </Paper>
                </div>
                <UserEventsList eventsList={isUpcoming ? filteredEvents : mintedFilteredEvents}/>
            </Container>
            <PriceModal handleClose={handleCloseModal} state={openModal} />
            <ContactModal handleClose={handleCloseContactModal} state={openContactModal} />

            <Footer handleContactOpen={handleOpenContactModal}/>
        </div>
    );
};

