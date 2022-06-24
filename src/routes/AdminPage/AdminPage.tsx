import React, {useCallback, useEffect} from 'react';
import {Dispatch} from "@reduxjs/toolkit";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {deleteEvent, getUnslitedEvents, listEvent} from "../../redux/actions/event";
import UserEvent from "../../copmonents/UserEvent";
import {Button, Container, Grid, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";


export const AdminPage = () => {
    const dispatch: Dispatch<any> = useDispatch()

    const events = useSelector(
        (state: SelectorState) => state.event.unlisted,
        shallowEqual
    )

    const fetchEvents = useCallback(
        () => dispatch(getUnslitedEvents()),
        [dispatch]
    )

    useEffect(() => {
        fetchEvents()
    }, [])


    const removeEvent = useCallback(
        (event: IEvent) => dispatch(deleteEvent(event)),
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
        removeEvent(event)
    }

    const onListClick = (id: string) => {
        let event: IEvent = {
            id: id,
        }
        applyEvent(event)
    }

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

            <Container maxWidth="md">
            {
                events && events.map((event: IEvent) => (
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
                        <Typography variant="body1" style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            paddingTop: 10,
                            paddingLeft: 10,
                            paddingBottom: 5
                        }}>
                            {`Email: ${event.email}`}
                        </Typography>
                        {
                            Number(event.promo) > 0 && <div style={{
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
                              <Button color="success" variant="contained" onClick={() => onListClick(event.id)} style={{
                                  width: '100%'
                              }}>
                                  Submit
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Button color="error" variant="contained" onClick={() => onRemoveClick(event.id)} style={{
                                    width: '100%'
                                }}>
                                    Decline
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                ))
            }
            </Container>
        </div>
    );
};

