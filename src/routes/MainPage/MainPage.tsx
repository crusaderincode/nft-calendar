import React, {useState, useCallback, useEffect} from 'react';
import {Button, Container, Grid, MenuItem, Paper, TextField, Typography} from "@mui/material";
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import {Dispatch} from "@reduxjs/toolkit";
import {addEvent, deleteEvent, getEvents} from "../../redux/actions/event";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";


export const MainPage = () => {
    const dispatch: Dispatch<any> = useDispatch()

    const events = useSelector(
        (state: SelectorState) => state.event.events,
        shallowEqual
    )

    const useFormField = (initialValue: string) => {
        const [value, setValue] = useState(initialValue);
        const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
        return {value, onChange};
    };

    const labelField = useFormField("")
    const imageField = useFormField("")
    const supplyField = useFormField("0")
    const priceField = useFormField("0")
    const twitterField = useFormField("")
    const discordField = useFormField("")
    const websiteField = useFormField("")
    const descriptionField = useFormField("")
    const currencyField = useFormField("SOL")

    const [date, setDate] = React.useState<Date>(new Date());

    const currencies = [
        {
            value: 'SOL',
            label: 'SOL',
        },
        {
            value: 'ETH',
            label: 'ETH',
        },
        {
            value: 'MATIC',
            label: 'MATIC',
        },
        {
            value: 'ADA',
            label: 'ADA',
        },
    ];

    const handleDate = (newDate: Date | null) => {
        if (newDate) {
            setDate(newDate);
        }
    };


    const submitEvent = useCallback(
        (event: IEvent) => dispatch(addEvent(event)),
        [dispatch]
    )

    const removeEvent = useCallback(
        (event: IEvent) => dispatch(deleteEvent(event)),
        [dispatch]
    )

    const fetchEvents = useCallback(
        () => dispatch(getEvents()),
        [dispatch]
    )

    useEffect(() => {
        fetchEvents()
    }, [])

    const onSubmitClick = () => {

        let event: IEvent = {
            id: '',
            name: labelField.value,
            twitter: twitterField.value,
            discord: discordField.value,
            website: twitterField.value,
            supply: parseInt(supplyField.value),
            price: parseInt(priceField.value),
            description: descriptionField.value,
            date: date,
            currency: currencyField.value
        }
        submitEvent(event)
    }

    const onRemoveClick = (id: string) => {
        let event: IEvent = {
            id: id,
        }
        removeEvent(event)
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',

        }}>
            <Container maxWidth="sm" style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Name"
                            onChange={labelField.onChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Image url"
                            required
                            onChange={imageField.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Price"
                            required
                            onChange={priceField.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                        style={{
                            width: '100%'
                        }}
                        id="outlined-select-currency"
                        select
                        label="Currency"
                        value={currencyField.value}
                        required
                        onChange={currencyField.onChange}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Supply"
                            required
                            onChange={supplyField.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Twitter"
                            required
                            onChange={twitterField.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Discord"
                            onChange={discordField.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Website"
                            onChange={websiteField.onChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} style={{
                        textAlign: 'center'
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Date&Time"
                            value={date}
                            onChange={handleDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            style={{
                                width: '100%',
                            }}
                            multiline
                            required
                            rows={3}
                            id="outlined-name"
                            label="Short Description"
                            onChange={descriptionField.onChange}
                        />
                    </Grid>
                </Grid>

                <Button onClick={onSubmitClick} variant="contained" style={{
                    margin: 10
                }}>
                    Submit
                </Button>

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

                           <Button variant="contained" color="error" onClick={() => onRemoveClick(event.id)}>
                               X
                           </Button>
                       </Paper>

                    ))
                }

            </Container>
        </div>
    );
};

