import React, {useCallback, useEffect} from 'react';
import {Paper, Typography} from "@mui/material";
import {Dispatch} from "@reduxjs/toolkit";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getEvents} from "../../redux/actions/event";
import {FaDiscord} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";

export const UserEventsList = () => {
    const dispatch: Dispatch<any> = useDispatch()



    const events = useSelector(
        (state: SelectorState) => state.event.events,
        shallowEqual
    )

    const fetchEvents = useCallback(
        () => dispatch(getEvents()),
        [dispatch]
    )

    useEffect(() => {
        fetchEvents()
    }, [])


    return (
        <div>
            {
                events && events.map((event: IEvent) => (
                    <Paper elevation={12} key={event.id} style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        padding: 10,
                        border: '1px solid #0f151d'
                    }}>
                        <img src={event.image} alt="Wrong img url"
                             style={{
                                 height: 80,
                                 width: 80,
                                 textAlign: 'center',
                                 borderRadius: 10
                             }}/>
                        <div style={{
                            marginLeft: 15,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                        <Typography variant="h5" style={{
                            color: '#fff',
                            fontWeight: 'bold',
                        }}>
                            {event.name}
                        </Typography>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                            <FaDiscord style={{fontSize: 25, color: '#fff', cursor: 'pointer', marginRight: 8
                            }}
                                       onClick={()=> window.open(event.discord, "_blank")} />
                                <Typography variant="body1" style={{
                                color: '#fff',
                                    marginRight: 15,
                                    fontWeight: 'bold'
                                }}>
                                    {
                                        //@ts-ignore
                                        event.discordMembers && event.discordMembers < 1000 ? event.discordMembers : event.discordMembers < 10000 ? `${String(event.discordMembers / 1000).slice(0,3)}k` : event.discordMembers < 100000 ? `${String(event.discordMembers / 1000).slice(0,4)}k` : `${String(event.discordMembers / 1000).slice(0,3)}k`}
                                </Typography>
                            <FaTwitter style={{fontSize: 25, color: '#fff'}}
                                       onClick={()=> window.open(event.twitter, "_blank")}
                            />
                                <Typography variant="body1" style={{
                                    color: '#fff',
                                    marginLeft: 5,
                                    fontWeight: 'bold'
                                }}>
                                {
                                    //@ts-ignore
                                    event.twitterMembers && event.twitterMembers < 1000 ? event.twitterMembers : event.twitterMembers < 10000 ? `${String(event.twitterMembers / 1000).slice(0,3)}k` : event.twitterMembers < 100000 ? `${String(event.twitterMembers / 1000).slice(0,4)}k` : `${String(event.twitterMembers / 1000).slice(0,3)}k`}
                                </Typography>
                            </div>
                        </div>

                    </Paper>

                ))
            }
        </div>
    );
};

