import React, {useCallback, useEffect, useState} from 'react';
import logo from "../../img/logo.png";
import {FaBars, FaTwitter} from "react-icons/fa"
import {Box, InputAdornment, MenuItem, Modal, Paper, TextField, Typography, useTheme} from "@mui/material";
import {MdEmail, MdSearch} from "react-icons/md";
import {GoPlus} from "react-icons/go";
import {Link, useLocation} from "react-router-dom";
import PriceModal from "../PriceModal";
import ContactModal from "../ContactModal";

interface Header {
    localAction?: (type: string) => void
    curEvents?: IEvent[] | []
    pastEvents?: IEvent[] | []
    isUpcoming?: boolean
    setCurEvents?: (events: IEvent[]) => void
    setPastEvents?: (events: IEvent[]) => void
}

export const HeaderMobile = (props: Header) => {
    const [modalOpen, setModalOpen] = useState(false)
    const location = useLocation()
    const theme = useTheme()

    const handleClose = () => {
        setModalOpen(false)
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        bgcolor: 'background.paper',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 24,
        backgroundColor: theme.palette.primary.contrastText,
        borderRadius: 1,
        px: 4,
    };

    const useFormField = (initialValue: string) => {
        const [value, setValue] = useState(initialValue);
        const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
        return {value, onChange};
    };

    const [submitButtonHover, setSubmitButtonHover] = useState(false)
    const blockchainField = useFormField("ALL")
    const searchField = useFormField("")

    //Submit modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    //Contact modal
    const [openContactModal, setOpenContactModal] = useState(false);
    const handleOpenContactModal = () => setOpenContactModal(true);
    const handleCloseContactModal = () => setOpenContactModal(false);

    useEffect(() => {
        if (props.localAction) {
            props.localAction(blockchainField.value)
        }
    }, [blockchainField])


    useEffect(() => {
        if (props.curEvents) {
            if (props.isUpcoming) {
                let filtered = props.curEvents.filter(post => {
                    if (searchField.value === "") {
                        //if query is empty
                        return post;
                        //@ts-ignore
                    } else if (post.name.toLowerCase().includes(searchField.value.toLowerCase())) {
                        return post;
                    }
                })
                //@ts-ignore
                props.setCurEvents(filtered)
            }
            else {
                if (props.pastEvents) {
                    let filtered = props.pastEvents.filter(post => {
                        if (searchField.value === "") {
                            //if query is empty
                            return post;
                            //@ts-ignore
                        } else if (post.name.toLowerCase().includes(searchField.value.toLowerCase())) {
                            return post;
                        }
                    })
                    //@ts-ignore
                    props.setPastEvents(filtered)
                }
            }
        }
    }, [searchField.value])

    const currencies = [
        {
            value: 'ALL',
            label: 'Upcomnig NFT',
        },
        {
            value: 'SOL',
            label: 'Solana NFT',
        },
        {
            value: 'ETH',
            label: 'Ethereum NFT',
        },
        {
            value: 'MATIC',
            label: 'Polygon NFT',
        },
        {
            value: 'ADA',
            label: 'Cardano NFT',
        },
    ];


    return (
        <div style={{
            width: '100%',
            position: 'fixed',
            top: 0,
            zIndex: 999
        }}>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#22293b',
                boxShadow: 'rgb(0 0 0 / 30%) 5px 5px 10px',
                zIndex: 999
            }}>
            <img src={logo} alt="logo" style={{
                height: 35,
                padding: 10
            }}/>

<div>

    <FaTwitter style={{fontSize: 25, cursor: 'pointer', color: '#fff',   padding: 10,}}
               onClick={() => window.open("https://twitter.com/HoneyDropsNFT", "_blank")}
    />

    <MdEmail style={{fontSize: 25, cursor: 'pointer', color: '#fff',   padding: 10,}}
             onClick={handleOpenContactModal}
    />

    <FaBars
        onClick={() => setModalOpen(true)}
        style={{
            fontSize: 25,
            padding: 10,
            color: '#fff'
        }}/>
</div>
            </div>

            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                style={{
                    width: '70%',
                    marginLeft: '15%',
                    outline: 'none'
                }}
            >
                <Box sx={{ ...style }}>
                    {
                        location.pathname === "/" ?  <TextField
                            variant="standard"
                            sx={{
                                minWidth: 100,
                                marginTop: 0.7,
                                textAlign: 'center'
                            }}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            id="outlined-select-blockchain"
                            select
                            value={blockchainField.value}
                            onChange={blockchainField.onChange}

                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> : <Link to="/" style={{
                            textDecoration: 'none'
                        }}>
                            <Typography variant="h5"
                                        style={{
                                            color: '#fff',
                                            fontFamily: 'Pixels',
                                            padding: 5,
                                            paddingRight: 7,
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}>
                                Upcoming NFT
                            </Typography>
                        </Link>
                    }


                    <Typography variant="h5"
                                onClick={() => window.open("https://medium.com/@honeyblog", "_blank")}
                                style={{
                                    color: '#fff',
                                    fontFamily: 'Pixels',
                                    padding: 5,
                                    paddingRight: 7,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>
                        Blog
                    </Typography>

                    <Link to="news" style={{
                        textDecoration: 'none'
                    }}>
                        <Typography variant="h5"
                                    style={{
                                        color: '#fff',
                                        fontFamily: 'Pixels',
                                        padding: 5,
                                        paddingRight: 7,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}>
                            News
                        </Typography>
                    </Link>


                    {
                        location.pathname === "/" &&     <TextField
                            style={{
                                width: '100%',
                                marginBottom: '1.5rem',
                                marginTop: '0.5rem'
                            }}
                            id="outlined-search"
                            onChange={searchField.onChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleClose()
                                }
                            }}
                            onSubmit={handleClose}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MdSearch
                                            onClick={handleClose}
                                            style={{
                                                color: '#fff',
                                                fontSize: 25
                                            }}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    }


                    <Paper
                        onClick={handleOpenModal}
                        onMouseOver={() => setSubmitButtonHover(true)}
                        onMouseOut={() => setSubmitButtonHover(false)}
                        style={{
                            backgroundColor: submitButtonHover ? 'transparent' : theme.palette.primary.contrastText,
                            border: `1px solid ${theme.palette.primary.contrastText}`,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            marginBottom: '1rem',
                            width: '100%'
                        }}>
                        <GoPlus style={{
                            color: submitButtonHover ? theme.palette.primary.contrastText : '#424242',
                            fontSize: 25,
                            paddingLeft: 4
                        }}/>
                        <Typography variant="h5" style={{
                            color: submitButtonHover ? theme.palette.primary.contrastText : '#424242',
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

                </Box>
            </Modal>

            <PriceModal handleClose={handleCloseModal} state={openModal} />
            <ContactModal handleClose={handleCloseContactModal} state={openContactModal} />
        </div>
    );
};

