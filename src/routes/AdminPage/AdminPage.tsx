import React, {useCallback, useEffect, useState} from 'react';
import {Dispatch} from "@reduxjs/toolkit";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
    deleteEvent,
    deleteUnlistedEvent,
    getEvents,
    getPastEvents,
    getUnslitedEvents,
    listEvent
} from "../../redux/actions/event";
import UserEvent from "../../copmonents/UserEvent";
import {Button, Container, Dialog, Grid, Paper, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import {MdEmail} from "react-icons/md"
import {BsFillPlusSquareFill} from "react-icons/bs"
import {deleteTicket, getTickets} from "../../redux/actions/ticket";
import { getAuth, signOut } from "firebase/auth";
import AdminLogin from "../../copmonents/AdminLogin";
import { useNavigate } from 'react-router-dom';
import PromoModal from "../../copmonents/PromoModal";


export const AdminPage = () => {
    const theme = useTheme()
    const dispatch: Dispatch<any> = useDispatch()

    const [ticketsOpen, setTicketsOpen] = useState(false)
    const [ticketsListOpen, setTicketsListOpen] = useState(false)
    const [promoOpen, setPromoOpen] = useState(false)
    const [isUnlisted, setIsUnlisted] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [curEvents, setCurEvents] = useState<IEvent[] | []>([])

    const handleTicketsClose = () => {
        setTicketsOpen(false)
    }

    const handlePromoClose = () => {
        setPromoOpen(false)
    }

    const unlistedEvents = useSelector(
        (state: SelectorState) => state.event.unlisted,
        shallowEqual
    )

    const listedEvents = useSelector(
        (state: SelectorState) => state.event.events,
        shallowEqual
    )

    const listedPastEvents = useSelector(
        (state: SelectorState) => state.event.past,
        shallowEqual
    )

    const promo = useSelector(
        (state: SelectorPromoState) => state.promo.promos,
        shallowEqual
    )

    useEffect(() => {
        setCurEvents(isUnlisted ? unlistedEvents : listedEvents.concat(listedPastEvents))
    }, [unlistedEvents, isUnlisted, listedEvents, listedPastEvents])


    const tickets = useSelector(
        (state: SelectorTicketsState) => state.contact.tickets,
        shallowEqual
    )

    const fetchUnlistedEvents = useCallback(
        () => dispatch(getUnslitedEvents()),
        [dispatch]
    )

    const fetchListedEvents = useCallback(
        () => dispatch(getEvents()),
        [dispatch]
    )

    const fetchListedPastEvents = useCallback(
        () => dispatch(getPastEvents()),
        [dispatch]
    )

    const fetchTickets = useCallback(
        () => dispatch(getTickets()),
        [dispatch]
    )

    useEffect(() => {
        fetchUnlistedEvents()
        fetchListedEvents()
        fetchListedPastEvents()
        fetchTickets()
    }, [])


    const removeEvent = useCallback(
        (event: IEvent) => dispatch(deleteEvent(event)),
        [dispatch]
    )

    const removeUnlistedEvent = useCallback(
        (event: IEvent) => dispatch(deleteUnlistedEvent(event)),
        [dispatch]
    )

    const removeTicket = useCallback(
        (ticket: ITicket) => dispatch(deleteTicket(ticket)),
        [dispatch]
    )

    const applyEvent = useCallback(
        (event: IEvent) => dispatch(listEvent(event)),
        [dispatch]
    )

    const onRemoveClick = (id: string) => {
        let event: IEvent = {
            id: id,
        }

        isUnlisted ? removeUnlistedEvent(event) :  removeEvent(event)
    }

    const onRemoveTicketClick = (id: string) => {
        let ticket: ITicket = {
            id: id,
        }
        removeTicket(ticket)
    }

    const onListClick = (id: string) => {
        let event: IEvent = {
            id: id,
        }
        applyEvent(event)
    }

    const auth = getAuth();
    const user = auth.currentUser;

    const navigate = useNavigate();

    const logOutHandler = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            alert(error)
        });
    }

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
        }
    }, [user])

    if (isLoggedIn) {
        return (
            <div>
                <Link to="/" style={{
                    textDecoration: 'none'
                }}>
                    <Button variant="contained" style={{
                        position: 'absolute',
                        top: '0.5rem',
                        left: '0.5rem',
                        backgroundColor: '#fbff2b',
                        color: '#262b36'
                    }}>
                        Go Back
                    </Button>
                </Link>

                <MdEmail style={{fontSize: 30,
                    cursor: 'pointer',
                    color: tickets.length > 0 ? '#fbff2b' : '#fff',
                    position: 'absolute',
                    top: '0.6rem',
                    left: '8rem',}}
                         onClick={() => setTicketsOpen(true)}
                />

                <BsFillPlusSquareFill style={{fontSize: 25,
                    cursor: 'pointer',
                    color: '#fff',
                    position: 'absolute',
                    top: '0.8rem',
                    left: '11rem',}}
                         onClick={() => setPromoOpen(true)}
                />

                <Button variant="contained" onClick={() => logOutHandler()} style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: '#fbff2b',
                    color: '#262b36'
                }}>
                   Log out
                </Button>

                <Container maxWidth="md" style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Grid container spacing={6} style={{
                        marginTop: '3rem',
                        width: '100%'
                    }}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Paper
                                onClick={() => setIsUnlisted(true)}
                                style={{
                                    width: '100%',
                                    padding: 5,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    outline: isUnlisted ? 'none' : '2px solid #fbff2b',
                                    backgroundColor: isUnlisted ? '#fbff2b' : 'transparent'
                                }}>
                                <Typography variant="h5" style={{
                                    color: isUnlisted ? '#161d30' : '#fbff2b',
                                    fontWeight: 'bold',
                                    fontFamily: 'Pixels'
                                }}>
                                    Unlisted
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={6} md={12} lg={6}>
                            <Paper
                                onClick={() => setIsUnlisted(false)}
                                style={{
                                    width: '100%',
                                    cursor: 'pointer',
                                    padding: 5,
                                    textAlign: 'center',
                                    outline: isUnlisted ? '2px solid #fbff2b' : 'none' ,
                                    backgroundColor: isUnlisted ? 'transparent' : '#fbff2b'
                                }}>
                                <Typography variant="h5" style={{
                                    color: isUnlisted ? '#fbff2b' : '#161d30',
                                    fontWeight: 'bold',
                                    fontFamily: 'Pixels'
                                }}>
                                    Listed
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Typography variant="h3" style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: 'Pixels',
                        textAlign: 'center',
                        marginTop: '3rem'
                    }}>
                        {`${isUnlisted ? "Unlisted " : "Listed "} events`}
                    </Typography>

                    {
                        curEvents && curEvents.map((event: IEvent) => (
                            <Paper key={event.id} style={{
                                backgroundColor: 'transparent',
                                paddingLeft: 15,
                                paddingRight: 15,
                                margin: 20,
                                marginBottom: 40,
                                borderRadius: 20,
                                border: '1px solid #fff'
                            }}>
                                <UserEvent event={event} />

                                {
                                    isUnlisted && <Typography variant="body1" style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        paddingTop: 10,
                                        paddingLeft: 10,
                                        paddingBottom: 5
                                    }}>
                                        {`Email: ${event.email}`}
                                    </Typography>
                                }

                                {
                                    isUnlisted && Number(event.promo) > 0 && <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        paddingBottom: 10,
                                        paddingLeft: 10,
                                        paddingRight: 10
                                    }}>
                                        <Typography variant="body1" style={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                        }}>
                                            {`Currency: ${event.currencyPromo}`}
                                        </Typography>

                                        <Typography variant="body1" style={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                        }}>
                                            {
                                                //@ts-ignore
                                                event.promo > 1 ? "Promo type: 50$" : "Promo type: 10$"}
                                        </Typography>

                                        <Typography variant="body1" style={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                        }}>
                                            Tx:
                                        </Typography>
                                        <Typography variant="body2" style={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                        }}>
                                            {event.txPromo}
                                        </Typography>
                                    </div>
                                }


                                <Grid container spacing={3} style={{
                                    paddingBottom: 15,
                                    paddingLeft: 5,
                                    paddingRight: 5
                                }}>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        {
                                            isUnlisted &&  <Button color="success" variant="contained" onClick={() => onListClick(event.id)} style={{
                                                width: '100%'
                                            }}>
                                                Submit
                                            </Button>
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Button color="error" variant="contained" onClick={() => onRemoveClick(event.id)} style={{
                                            width: '100%'
                                        }}>
                                            {isUnlisted ? "Decline" : "Delete"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>

                        ))
                    }

                    <PromoModal handleClose={handlePromoClose} state={promoOpen} />

                    <Dialog
                        open={ticketsOpen && tickets.length > 0}
                        maxWidth="md"
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                        onClose={handleTicketsClose}
                        scroll='body'
                    >
                        {
                            tickets.map((ticket: ITicket) => (
                                <Paper key={ticket.id} style={{
                                    backgroundColor: '#161d30',
                                    padding: 10,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: 10
                                }}>
                                    <Typography variant="body1" style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        marginTop: '0.5rem'
                                    }}>
                                        {`Email: ${ticket.email}`}
                                    </Typography>

                                    <Typography variant="body1" style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        marginTop: '0.5rem'
                                    }}>
                                        {`Issue: ${ticket.ticket}`}
                                    </Typography>

                                    <Button color="error" variant="contained" onClick={() => onRemoveTicketClick(ticket.id)} style={{
                                        marginTop: '0.5rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Delete
                                    </Button>
                                </Paper>
                            ))
                        }
                    </Dialog>

                    <Dialog
                        open={promoOpen && promo.length > 0}
                        maxWidth="md"
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                        onClose={() => setPromoOpen(false)}
                        scroll='body'
                    >
                        {
                            promo.map((item: IPromo) => (
                                <Paper key={item.id} style={{
                                    backgroundColor: '#161d30',
                                    padding: 10,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: 10
                                }}>
                                    <img src={item.image} style={{
                                        width: '100%'
                                    }}/>
                                </Paper>
                            ))
                        }
                    </Dialog>

                </Container>
            </div>
        );
    }
    else {
     return <AdminLogin setIsLoggedIn={setIsLoggedIn}/>
    }
};

