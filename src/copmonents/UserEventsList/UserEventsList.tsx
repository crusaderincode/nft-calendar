import React, {useCallback, useEffect} from 'react'
import {Dispatch} from "@reduxjs/toolkit"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {getEvents} from "../../redux/actions/event"
import UserEvent from "../UserEvent"

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
                   <UserEvent event={event} key={event.id}/>

                ))
            }
        </div>
    );
};

