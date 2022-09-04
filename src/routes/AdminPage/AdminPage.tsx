import React, {useCallback, useEffect, useState} from 'react';
import {Dispatch} from "@reduxjs/toolkit";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
    deleteEvent,
    deleteUnlistedEvent,
    getEvents,
    getPastEvents,
    getUnslitedEvents,
    listEvent,
    verifyEvent
} from "../../redux/actions/event";
import UserEvent from "../../copmonents/UserEvent";
import {Button, CircularProgress, Container, Dialog, Grid, Paper, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import {MdEmail} from "react-icons/md"
import {FaListAlt} from "react-icons/fa"
import {TiDelete} from "react-icons/ti"
import {BsFillPlusSquareFill} from "react-icons/bs"
import {deleteTicket, getTickets} from "../../redux/actions/ticket";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import AdminLogin from "../../copmonents/AdminLogin";
import { useNavigate } from 'react-router-dom';
import PromoModal from "../../copmonents/PromoModal";
import {deletePromo, getPromos} from "../../redux/actions/promo";
import {deleteNews, getNews} from "../../redux/actions/news";
import NewsModal from '../../copmonents/NewsModal';


export const AdminPage = () => {
    const theme = useTheme()
    const dispatch: Dispatch<any> = useDispatch()

    //Authentication
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState("")

    const auth = getAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            setLoading(false)
            user && setAdmin(user.uid)
        })
    }, [])


    console.log(JSON.stringify(auth))

    const navigate = useNavigate();

    const logOutHandler = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            alert(error)
        });
    }

    //Tickets
    const [ticketsOpen, setTicketsOpen] = useState(false)

    const handleTicketsClose = () => {
        setTicketsOpen(false)
    }

    const tickets = useSelector(
        (state: SelectorTicketsState) => state.contact.tickets,
        shallowEqual
    )

    const fetchTickets = useCallback(
        () => dispatch(getTickets()),
        [dispatch]
    )

    const removeTicket = useCallback(
        (ticket: ITicket) => dispatch(deleteTicket(ticket)),
        [dispatch]
    )

    const onRemoveTicketClick = (id: string) => {
        let ticket: ITicket = {
            id: id,
        }
        removeTicket(ticket)
    }


    //Promo
        //Add
    const [promoOpen, setPromoOpen] = useState(false)

    const handlePromoClose = () => {
        setPromoOpen(false)
    }

        //Get
    const [promoListOpen, setPromoListOpen] = useState(false)

    const promo = useSelector(
        (state: SelectorPromoState) => state.promo.promos,
        shallowEqual
    )

    const fetchPromo = useCallback(
        () => dispatch(getPromos()),
        [dispatch]
    )

    const removePromo = useCallback(
        (promo: IPromo) => dispatch(deletePromo(promo)),
        [dispatch]
    )

    const onRemovePromoClick = (id: string) => {
        let promo: IPromo = {
            id: id,
        }
        removePromo(promo)
    }

    //News
     //Add
     const [newsOpen, setNewsOpen] = useState(false)

     const handleNewsClose = () => {
         setNewsOpen(false)
     }
 
         //Get
     const [newsListOpen, setNewsListOpen] = useState(false)
 
     const news = useSelector(
         (state: SelectorNewsState) => state.new.news,
         shallowEqual
     )
 
     const fetchNews = useCallback(
         () => dispatch(getNews()),
         [dispatch]
     )
 
     const removeNews = useCallback(
         (news: INews) => dispatch(deleteNews(news)),
         [dispatch]
     )
 
     const onRemoveNewsClick = (id: string) => {
         let news: INews = {
             id: id,
         }
         removeNews(news)
     }

    //Events
    const [isUnlisted, setIsUnlisted] = useState(true)
    const [curEvents, setCurEvents] = useState<IEvent[] | []>([])

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

    const removeEvent = useCallback(
        (event: IEvent) => dispatch(deleteEvent(event)),
        [dispatch]
    )

    const removeUnlistedEvent = useCallback(
        (event: IEvent) => dispatch(deleteUnlistedEvent(event)),
        [dispatch]
    )

    const applyEvent = useCallback(
        (event: IEvent) => dispatch(listEvent(event)),
        [dispatch]
    )

    const approveEvent = useCallback(
        (event: IEvent) => dispatch(verifyEvent(event)),
        [dispatch]
    )

    const onRemoveClick = (id: string) => {
        let event: IEvent = {
            id: id,
        }

        isUnlisted ? removeUnlistedEvent(event) :  removeEvent(event)
    }

    const onListClick = (id: string) => {
        let event: IEvent = {
            id: id,
        }
        applyEvent(event)
    }

    const onVerifyClick = (id: string, verified: number) => {
        let opposite = verified > 0 ? 0 : 1
        let event: IEvent = {
            id: id,
            verified: opposite
        }
        approveEvent(event)
    }

    //UseEffect for setState after fetching
    useEffect(() => {
        setCurEvents(isUnlisted ? unlistedEvents : listedEvents.concat(listedPastEvents))
    }, [unlistedEvents, isUnlisted, listedEvents, listedPastEvents])

    useEffect(() => {
        fetchUnlistedEvents()
        fetchListedEvents()
        fetchListedPastEvents()
        fetchTickets()
        fetchPromo()
        fetchNews()
    }, [])

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CircularProgress size="5rem" style={{
                    color: '#fff',
                }}/>
            </div>

        )
    }

    if (admin) {
        return (
            <div>
                <Link to="/" style={{
                    textDecoration: 'none'
                }}>
                    <Button variant="contained" style={{
                        position: 'absolute',
                        top: '0.5rem',
                        left: '0.5rem',
                        backgroundColor: theme.palette.primary.contrastText,
                        color: '#262b36'
                    }}>
                        Go Back
                    </Button>
                </Link>

                <MdEmail style={{fontSize: 30,
                    cursor: 'pointer',
                    color: tickets.length > 0 ? theme.palette.primary.contrastText : '#fff',
                    position: 'absolute',
                    top: '0.6rem',
                    left: '8rem',}}
                         onClick={() => setTicketsOpen(true)}
                />

                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        top: '0.5rem',
                        left: '11rem',
                        borderRadius: 5,
                        border: '1px solid #fff',
                        padding: 5
                    }}>
             <Typography variant="body1" style={{
                                    color: "#fff",
                                    fontWeight: 'bold',
                                    fontFamily: 'Pixels',
                                    margin: 0,
                                    padding: 0,
                                    marginRight: '0.5rem'
                                }}>
                                    Promo: 
                                </Typography>

                <BsFillPlusSquareFill style={{fontSize: 25,
                    cursor: 'pointer',
                    color: '#fff',}}
                         onClick={() => setPromoOpen(true)}
                />

                <FaListAlt style={{fontSize: 25,
                    cursor: 'pointer',
                    color: '#fff',
                    marginLeft: '1rem'
                  }}
                           onClick={() => setPromoListOpen(true)}
                />
                    </div>

                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        top: '0.5rem',
                        left: '21rem',
                        borderRadius: 5,
                        border: '1px solid #fff',
                        padding: 5
                    }}>
             <Typography variant="body1" style={{
                                    color: "#fff",
                                    fontWeight: 'bold',
                                    fontFamily: 'Pixels',
                                    margin: 0,
                                    padding: 0,
                                    marginRight: '0.5rem'
                                }}>
                                    News: 
                                </Typography>

                <BsFillPlusSquareFill style={{fontSize: 25,
                    cursor: 'pointer',
                    color: '#fff',}}
                         onClick={() => setNewsOpen(true)}
                />

                <FaListAlt style={{fontSize: 25,
                    cursor: 'pointer',
                    color: '#fff',
                    marginLeft: '1rem'
                  }}
                           onClick={() => setNewsListOpen(true)}
                />
                    </div>

                

                <Button variant="contained" onClick={() => logOutHandler()} style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: theme.palette.primary.contrastText,
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
                                    outline: isUnlisted ? 'none' : `2px solid ${theme.palette.primary.contrastText}`,
                                    backgroundColor: isUnlisted ? theme.palette.primary.contrastText : 'transparent'
                                }}>
                                <Typography variant="h5" style={{
                                    color: isUnlisted ? '#161d30' : theme.palette.primary.contrastText,
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
                                    outline: isUnlisted ? `2px solid ${theme.palette.primary.contrastText}` : 'none' ,
                                    backgroundColor: isUnlisted ? 'transparent' : theme.palette.primary.contrastText
                                }}>
                                <Typography variant="h5" style={{
                                    color: isUnlisted ? theme.palette.primary.contrastText : '#161d30',
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
                                width: '100%',
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
                                        paddingBottom: 5,
                                        textAlign: 'left'
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
                                            textAlign: 'left'
                                        }}>
                                            {`Currency: ${event.currencyPromo}`}
                                        </Typography>

                                        <Typography variant="body1" style={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            textAlign: 'left'
                                        }}>
                                            {
                                                //@ts-ignore
                                                event.promo > 1 ? "Promo type: 50$" : "Promo type: 10$"}
                                        </Typography>

                                        <Typography variant="body1" style={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            textAlign: 'left'
                                        }}>
                                            Tx:
                                        </Typography>
                                        <Typography variant="body2" style={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            textAlign: 'left'
                                        }}>
                                            {event.txPromo}
                                        </Typography>

                                        {
                                            Number(event.promo) > 1 && <Typography variant="body2" style={{
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                textAlign: 'left'
                                            }}>
                                                {event.banner}
                                            </Typography>
                                        }

                                    </div>
                                }


                                <Grid container spacing={3} style={{
                                    paddingBottom: 15,
                                    paddingLeft: 5,
                                    paddingRight: 5
                                }}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        {
                                            isUnlisted &&  <Button color="success" variant="contained" onClick={() => onListClick(event.id)} style={{
                                                width: '100%'
                                            }}>
                                                Submit
                                            </Button>
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        {
                                            <Button  variant="contained" onClick={() => onVerifyClick(event.id,
                                                //@ts-ignore
                                                event.verified)} style={{
                                                width: '100%',
                                                backgroundColor: '#0063cc',
                                            }}>
                                                { //@ts-ignore
                                                    event.verified > 0 ? "Unverify" : "Verify"}
                                            </Button>
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
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
                    <NewsModal handleClose={handleNewsClose} state={newsOpen}/>

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
                        open={promoListOpen && promo.length > 0}
                        maxWidth="md"
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                        onClose={() => setPromoListOpen(false)}
                        scroll='body'
                    >
                        {
                            promo.map((item: IPromo) => (
                                <Paper key={item.id} style={{
                                    backgroundColor: '#161d30',
                                    padding: 0,
                                    display: 'flex',
                                    position: 'relative',
                                    flexDirection: 'column',
                                    margin: 10,
                                    borderRadius: 20
                                }}>
                                    <img src={item.image} style={{
                                        width: '100%',
                                        borderRadius: 10
                                    }}/>
                                    <TiDelete
                                        onClick={() => onRemovePromoClick(item.id)}
                                        style={{
                                        position: 'absolute',
                                        top: '0.2rem',
                                        right: '0.2rem',
                                        fontSize: 35,
                                        cursor: 'pointer',
                                        color: '#F32013'
                                    }}/>
                                </Paper>
                            ))
                        }
                    </Dialog>

                    <Dialog
                        open={newsListOpen && news.length > 0}
                        maxWidth="md"
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                        onClose={() => setNewsListOpen(false)}
                        scroll='body'
                    >
                        {
                            news.map((item: INews) => (
                                <Paper key={item.id} style={{
                                    backgroundColor: '#161d30',
                                    padding: 0,
                                    display: 'flex',
                                    position: 'relative',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 10,
                                    borderRadius: 10
                                }}>
                                    <img src={item.image} alt="img" style={{
                                        width: 250,
                                        borderRadius: 10
                                    }}/>

                            <Typography variant="body1" style={{
                                        color: theme.palette.primary.contrastText,
                                        fontWeight: 'bold',
                                        marginTop: '0.5rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                    {item.header}
                                    </Typography>

                                    <TiDelete
                                        onClick={() => onRemoveNewsClick(item.id)}
                                        style={{
                                        position: 'absolute',
                                        top: '0.2rem',
                                        right: '0.2rem',
                                        fontSize: 35,
                                        cursor: 'pointer',
                                        color: '#F32013'
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
     return <AdminLogin setIsLoggedIn={setAdmin}/>
    }
};

