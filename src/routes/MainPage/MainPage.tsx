import React, {useState, useCallback} from 'react';
import {Button, Container, TextField, Typography} from "@mui/material";
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import {Dispatch} from "@reduxjs/toolkit";
import {addEvent} from "../../redux/actions/event";


export const MainPage = () => {
    const dispatch: Dispatch<any> = useDispatch()

    const events = useSelector(
        (state: SelectorState) => state.event.events,
        shallowEqual
    )

    const useFormField = (initialValue = "") => {
        const [value, setValue] = useState(initialValue);
        const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
        return {value, onChange};
    };

    const labelField = useFormField("")


    const submitArticle = useCallback(
        (event: Event) => dispatch(addEvent(event)),
        [dispatch]
    )


    const onButtonClick = () => {
        // @ts-ignore
        let event: Event = {
            id: new Date().getTime(),
            title: labelField.value
        }
        submitArticle(event)
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',

        }}>
            <Container maxWidth="md" style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <TextField
                    style={{
                        margin: 10
                    }}
                    id="outlined-name"
                    label="Label"
                    onChange={labelField.onChange}
                />
                <Button onClick={onButtonClick} variant="contained" style={{
                    margin: 10
                }}>
                    Submit
                </Button>

                {
                   events && events.map((event: Event) => (
                        <Typography variant="h4" key={event.id}>
                            {event.title}
                        </Typography>
                    ))
                }

            </Container>
        </div>
    );
};

