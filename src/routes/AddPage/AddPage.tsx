import React, {useState, useCallback, useEffect} from 'react';
import {Button, Container, Grid, MenuItem, Paper, TextField, Typography, CircularProgress} from "@mui/material";
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import {Dispatch} from "@reduxjs/toolkit";
import {addEvent, deleteEvent, getEvents} from "../../redux/actions/event";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import formValidationHandler from "../../formValidationHandler";
import {GoPlus} from "react-icons/go";
import { useLocation } from 'react-router-dom'
import SubmitModal from "../../copmonents/SubmitModal";


export const AddPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const location = useLocation()
    //@ts-ignore
    const { promo } = location.state

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const [submitButtonHover, setSubmitButtonHover] = useState(false)
    const [loading, setLoading] = useState(false)


    const useFormField = (initialValue: string) => {
        const [value, setValue] = useState(initialValue);
        const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
        return {value, onChange};
    };

    const labelField = useFormField("")
    const imageField = useFormField("")
    const supplyField = useFormField("0")
    const priceField = useFormField("0")
    const twitterCountField = useFormField("0")
    const twitterField = useFormField("")
    const discordField = useFormField("")
    const emailField = useFormField("")
    const websiteField = useFormField("")
    const descriptionField = useFormField("")
    const currencyField = useFormField("SOL")

    const [discordMembers, setDiscordMembers] = useState(0)

    const paymentField = useFormField("SOL")
    const transactionField = useFormField("")

    const [date, setDate] = useState<Date>(new Date("01 Jun 2022 9:00:00 GMT"));

    const [error, setError] = useState({
        checked: false,
        name: false,
        image: false,
        email: false,
        price: false,
        supply: false,
        twitter: false,
        twitterMembersCount: false,
        discord: false,
        website: false,
        description: false,
        txSignature: false
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

    const payments = [
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

    const submitHandler = async () => {
        setError((error) => ({
            ...error, checked: false
        }))
        if (!error.name &&
            !error.image &&
            !error.price &&
            !error.supply &&
            !error.twitter &&
            !error.twitterMembersCount &&
            !error.email &&
            !error.discord &&
            !error.txSignature &&
            !error.website &&
            !error.description ) {
            let event: IEvent = {
                id: '',
                listed: false,
                email: emailField.value,
                image: imageField.value,
                name: labelField.value,
                twitter: twitterField.value,
                discord: discordField.value,
                website: websiteField.value,
                supply: parseInt(supplyField.value),
                price: parseFloat(priceField.value),
                discordMembers: discordMembers,
                twitterMembers: parseInt(twitterCountField.value),
                description: descriptionField.value,
                date: date,
                currency: currencyField.value,
                currencyPromo: paymentField.value,
                promo: promo,
                txPromo: transactionField.value,
            }
            setLoading(true)
            try {
                await submitEvent(event)
                setLoading(false);
                setOpenModal(true)
            } catch (err) {
                alert('Something went wrong! Please try again.')
                setLoading(false);
            }
        }
        else {
            setLoading(false)
            alert('Not all the fields are correct!')
        }

    }


    const onSubmitClick = async () => {
        if (discordField.value.length > 1) {
            setLoading(true)
            //@ts-ignore
            await fetcher(discordField.value.split("/").pop())


        }
        formValidationHandler(
            {
                setErr: setError,
                name: labelField.value,
                image: imageField.value,
                supply: supplyField.value,
                price: priceField.value,
                twitterMembersCount: twitterCountField.value,
                twitter: twitterField.value,
                discord: discordField.value,
                email: emailField.value,
                website: websiteField.value,
                description: descriptionField.value,
                txSignature: transactionField.value,
                promo: promo
            }
        )
    }

    useEffect(() => {
        if (error.checked) {
            submitHandler()
        }
    }, [error.checked])


    const onRemoveClick = (id: string) => {
        let event: IEvent = {
            id: id,
        }
        removeEvent(event)
    }


    const fetcher = (url: string) => {
        return fetch(`https://discord.com/api/v9/invites/${url}?with_counts=true&with_expiration=true`, { method: 'get'})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return "Something went wrong!";
                }
            })
            .then((myJson) => {
                setDiscordMembers(myJson.approximate_member_count)
            })

            .catch((err) => {
                console.error(err);
            });
    };


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
        }}>
            <SubmitModal handleClose={handleCloseModal} state={openModal} />
            <Container maxWidth="md" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <Paper elevation={12} style={{
                    height: 200,
                    width: 200,
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
                            <Typography variant="h4" style={{
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>
                                Collection Image
                            </Typography>
                    }
                </Paper>


                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <TextField
                            style={{
                                width: '100%',
                            }}
                            color="secondary"
                            id="outlined-name"
                            label="Name"
                            helperText="e.g. CryptoPunks"
                            sx={{}}
                            onChange={labelField.onChange}
                            onFocus={() => setError({...error, name: false})}
                            error={error.name}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
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
                    <Grid item xs={12} sm={4} md={4} lg={4}>
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
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Price"
                            helperText="e.g. 5. Skip for TBA"
                            required
                            onFocus={() => setError({...error, price: false})}
                            error={error.price}
                            onChange={priceField.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
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
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            id="outlined-name"
                            label="Supply"
                            helperText="e.g. 555. Skip for TBA"
                            required
                            onFocus={() => setError({...error, supply: false})}
                            error={error.supply}
                            onChange={supplyField.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
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
                    <Grid item xs={12} sm={4} md={4} lg={4} style={{
                        textAlign: 'center'
                    }}>
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
                    <Grid item xs={12} sm={4} md={4} lg={4}>
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
                    <Grid item xs={12} sm={6} md={6} lg={6} style={{
                        textAlign: 'center'
                    }}>
                        <TextField
                            style={{
                                width: 260
                            }}
                            id="outlined-name"
                            label="Twitter followers"
                            helperText="e.g. 1000"
                            required
                            onFocus={() => setError({...error, twitter: false})}
                            error={error.twitter}
                            onChange={twitterCountField.onChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6} style={{
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

                    {
                        promo && <>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField
                                    style={{
                                        width: '100%'
                                    }}
                                    id="outlined-select-currency"
                                    select
                                    label={promo > 1 ? "50$ payment chain" : "10$ payment chain"}
                                    helperText="select the chain for promo payment"
                                    value={paymentField.value}
                                    required
                                    onChange={paymentField.onChange}
                                >
                                    {payments.map((option) => (
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
                                    required
                                    label="tx signature"
                                    helperText="your payment transaction signature"
                                    onFocus={() => setError({...error, txSignature: false})}
                                    error={error.txSignature}
                                    onChange={transactionField.onChange}
                                />
                            </Grid>
                        </>
                    }

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
                            helperText="max 750 characters"
                            onFocus={() => setError({...error, description: false})}
                            error={error.description}
                            onChange={descriptionField.onChange}
                        />
                    </Grid>
                </Grid>

                <Paper
                    onClick={onSubmitClick}
                    onMouseOver={() => setSubmitButtonHover(true)}
                    onMouseOut={() => setSubmitButtonHover(false)}
                    style={{
                        backgroundColor: submitButtonHover ? '#fff' : '#c80e72',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        marginTop: '0.7rem'
                    }}>

                    {
                        loading ? <CircularProgress size="2rem" style={{
                            color: submitButtonHover ? '#c80e72' : '#fff',
                            padding: 4
                        }}/> : <GoPlus style={{
                            color: submitButtonHover ? '#c80e72' : '#fff',
                            fontSize: 25,
                            paddingLeft: 4
                        }}/>
                    }


                    <Typography variant="h5" style={{
                        color: submitButtonHover ? '#c80e72' : '#fff',
                        fontFamily: 'Pixels',
                        padding: 5,
                        paddingLeft: 0,
                        paddingRight: 7,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>
                        Submit NFT
                    </Typography>
                </Paper>

            </Container>
        </div>
    );
};

