import React, {useCallback, useEffect} from 'react';
import {Paper, Typography} from "@mui/material";
import {Dispatch} from "@reduxjs/toolkit";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getEvents} from "../../redux/actions/event";
import {FaDiscord} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";
import {MdPublic} from "react-icons/md";
import UserEvent from "../UserEvent";

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
                   <UserEvent event={event} />

                ))
            }
        </div>
    );
};

