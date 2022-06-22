import React, {useCallback, useEffect} from 'react';
import {Dispatch} from "@reduxjs/toolkit";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUnslitedEvents} from "../../redux/actions/event";
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
                        {
                            Number(event.promo) > 0 && <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 10
                            }}>
                            <Typography variant="h6" style={{
                                color: '#fff',
                                fontWeight: 'bold',
                            }}>
                                {`Currency: ${event.currencyPromo}`}
                            </Typography>

                                <Typography variant="h6" style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                }}>
                                    {
                                        //@ts-ignore
                                        event.promo > 1 ? "Promo type: 50$" : "Promo type: 10$"}
                                </Typography>

                                <Typography variant="h6" style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                }}>
                                    {`Tx: ${event.txPromo}`}
                                </Typography>
                            </div>
                        }
                        <Typography variant="h6" style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            padding: 10
                        }}>
                            {`Email: ${event.email}`}
                        </Typography>

                        <Grid container spacing={3} style={{
                            paddingBottom: 15,
                            paddingLeft: 5,
                            paddingRight: 5
                        }}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Button color="success" variant="contained" style={{
                                  width: '100%'
                              }}>
                                  Submit
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Button color="error" variant="contained"  style={{
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

