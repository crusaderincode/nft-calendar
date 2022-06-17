import React, {useState, useCallback, useEffect} from 'react';
import {Button, Container, Grid, MenuItem, Paper, TextField, Typography} from "@mui/material";
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import {Dispatch} from "@reduxjs/toolkit";
import {addEvent, deleteEvent, getEvents} from "../../redux/actions/event";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import formValidationHandler from "../../formValidationHandler";


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
    const emailField = useFormField("")
    const websiteField = useFormField("")
    const descriptionField = useFormField("")
    const currencyField = useFormField("SOL")

    const [date, setDate] = useState<Date>(new Date());

    const [error, setError] = useState({
        name: false,
        image: false,
        email: false,
        price: false,
        supply: false,
        twitter: false,
        discord: false,
        website: false,
        description: false
    })

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

        formValidationHandler(
            {
                setErr: setError,
                name: labelField.value,
                image: imageField.value,
                supply: supplyField.value,
                price: priceField.value,
                twitter: twitterField.value,
                discord: discordField.value,
                email: emailField.value,
                website: websiteField.value,
                description: descriptionField.value
            }
    )


        if (Object.values(error).every(x => !x)) {
            let event: IEvent = {
                id: '',
                listed: false,
                email: emailField.value,
                name: labelField.value,
                twitter: twitterField.value,
                discord: discordField.value,
                website: websiteField.value,
                supply: parseInt(supplyField.value),
                price: parseFloat(priceField.value),
                description: descriptionField.value,
                date: date,
                currency: currencyField.value
            }
            submitEvent(event)
        }
        else {
            alert('Not all the fields are correct!')
        }
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
            minHeight: '100vh',
            width: '100vw',

        }}>
            <Container maxWidth="sm" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography variant="h4" style={{
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    Submit NFT collection
                </Typography>

                <Paper elevation={12} style={{
                    height: 150,
                    width: 150,
                    margin: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                {

                imageField.value.length > 0 ? <img src={imageField.value} alt="Wrong img url"
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    borderRadius: 5
                                                }}/> :
                    <Typography variant="h5" style={{
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        Collection Image
                    </Typography>
                }
                </Paper>


                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            style={{
                                width: '100%',
                            }}
                            id="outlined-name"
                            label="Name"
                            helperText="e.g. CryptoPunks"
                            onChange={labelField.onChange}
                            onFocus={() => setError({...error, name: false})}
                            error={error.name}
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
                            helperText="e.g. https://imgur.com/gallery/myimage"
                            required
                            onFocus={() => setError({...error, image: false})}
                            error={error.image}
                            onChange={imageField.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            style={{
                                width: '100%',
                            }}
                            id="outlined-name"
                            label="email"
                            helperText="e.g. myemail@email.com"
                            required
                            onFocus={() => setError({...error, email: false})}
                            error={error.email}
                            onChange={emailField.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Price"
                            helperText="e.g. 5"
                            required
                            onFocus={() => setError({...error, price: false})}
                            error={error.price}
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
                        helperText="e.g. SOL"
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
                            helperText="e.g. 555"
                            required
                            onFocus={() => setError({...error, supply: false})}
                            error={error.supply}
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
                            helperText="e.g. https://twitter.com/MyNFTProject"
                            required
                            onFocus={() => setError({...error, twitter: false})}
                            error={error.twitter}
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
                            helperText="e.g. https://discord.com/invite/XXXXXX"
                            onFocus={() => setError({...error, discord: false})}
                            error={error.discord}
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
                            helperText="e.g. https://my-website.com"
                            onFocus={() => setError({...error, website: false})}
                            error={error.website}
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
                            onFocus={() => setError({...error, description: false})}
                            error={error.description}
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

