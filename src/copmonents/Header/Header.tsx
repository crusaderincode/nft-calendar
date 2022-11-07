import React, {useCallback, useEffect, useState} from 'react';
import {
    Container,
    MenuItem,
    Paper,
    SelectChangeEvent,
    Select,
    Typography,
    TextField,
    InputAdornment,
    useTheme
} from "@mui/material";
import {GoPlus} from "react-icons/go";
import {FaTwitter} from "react-icons/fa";
import {MdEmail, MdSearch} from "react-icons/md"
import logo from "../../img/logo.png"
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

export const Header = (props: Header) => {
    const useFormField = (initialValue: string) => {
        const [value, setValue] = useState(initialValue);
        const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
        return {value, onChange};
    };

    const location = useLocation()
    const theme = useTheme()

    console.log(location.pathname === "/")

    //Submit modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    //Contact modal
    const [openContactModal, setOpenContactModal] = useState(false);
    const handleOpenContactModal = () => setOpenContactModal(true);
    const handleCloseContactModal = () => setOpenContactModal(false);

    const [submitButtonHover, setSubmitButtonHover] = useState(false)
    const blockchainField = useFormField("ALL")
    const searchField = useFormField("")

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
            value: 'APT',
            label: 'Aptos NFT',
        },
    ];

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            paddingTop: 20,
            width: '100%'
        }}>
            <Container maxWidth="lg" style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

              <img src={logo} alt="logo" style={{
                  height: 50,
              }}/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '35%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {
                        location.pathname === "/" ?  <TextField
                            variant="standard"
                            sx={{
                                minWidth: 100,
                                marginTop: 0.7
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
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {
                        location.pathname === "/" &&     <TextField
                            style={{
                                width: 170,
                                marginRight: '2rem'
                            }}
                            id="outlined-search"
                            onChange={searchField.onChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MdSearch style={{
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
                            cursor: 'pointer'
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

                    <FaTwitter style={{fontSize: 30, cursor: 'pointer', color: '#fff', marginLeft: '2rem',}}
                               onClick={() => window.open("https://twitter.com/HoneyDrops_NFT", "_blank")}
                    />

                    <MdEmail style={{fontSize: 30, cursor: 'pointer', color: '#fff', marginLeft: '1rem',}}
                               onClick={handleOpenContactModal}
                    />
                </div>
            </Container>
            <PriceModal handleClose={handleCloseModal} state={openModal} />
            <ContactModal handleClose={handleCloseContactModal} state={openContactModal} />
        </div>
    );
};

