import React, {useCallback, useEffect} from 'react';
import {Paper, Typography} from "@mui/material";
import {Dispatch} from "@reduxjs/toolkit";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getEvents} from "../../redux/actions/event";

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
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: 10
                    }}>
                        <Typography variant="h4">
                            {event.name}
                        </Typography>

                    </Paper>

                ))
            }
        </div>
    );
};

