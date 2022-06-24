import React, {useCallback, useEffect} from 'react'
import {Dispatch} from "@reduxjs/toolkit"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {getEvents} from "../../redux/actions/event"
import UserEvent from "../UserEvent"

interface List {
    eventsList: IEvent[]
}

export const UserEventsList = ({eventsList}: List) => {


    return (
        <div>
            {
                eventsList && eventsList.map((event: IEvent) => (
                   <UserEvent event={event} key={event.id}/>

                ))
            }
        </div>
    );
};

