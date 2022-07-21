import React, {useCallback, useEffect, useState} from 'react';
import {
    Container,
    MenuItem,
    Paper,
    SelectChangeEvent,
    Select,
    Typography,
    TextField,
    InputAdornment
} from "@mui/material";
import {GoPlus} from "react-icons/go";
import {FaTwitter} from "react-icons/fa";
import {MdEmail, MdSearch} from "react-icons/md"
import logo from "../../img/logo.png"


interface Header {
    handleModalOpen: () => void
    handleContactOpen: () => void
    localAction: (type: string) => void
    curEvents: IEvent[] | []
    pastEvents: IEvent[] | []
    isUpcoming: boolean
    setCurEvents: (events: IEvent[]) => void
    setPastEvents: (events: IEvent[]) => void
}

export const Header = (props: Header) => {
    const useFormField = (initialValue: string) => {
        const [value, setValue] = useState(initialValue);
        const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
        return {value, onChange};
    };

    const [submitButtonHover, setSubmitButtonHover] = useState(false)
    const blockchainField = useFormField("ALL")
    const searchField = useFormField("")

    useEffect(() => {
        props.localAction(blockchainField.value)
    }, [blockchainField])


    useEffect(() => {

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
            props.setCurEvents(filtered)
        }
        else {
            let filtered = props.pastEvents.filter(post => {
                if (searchField.value === "") {
                    //if query is empty
                    return post;
                    //@ts-ignore
                } else if (post.name.toLowerCase().includes(searchField.value.toLowerCase())) {
                    return post;
                }
            })
            props.setPastEvents(filtered)
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
                    width: '28%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <TextField
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
                    </TextField>

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
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TextField
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

                    <Paper
                        onClick={props.handleModalOpen}
                        onMouseOver={() => setSubmitButtonHover(true)}
                        onMouseOut={() => setSubmitButtonHover(false)}
                        style={{
                            backgroundColor: submitButtonHover ? 'transparent' : '#fbff2b',
                            border: '1px solid #fbff2b',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}>
                        <GoPlus style={{
                            color: submitButtonHover ? '#fbff2b' : '#424242',
                            fontSize: 25,
                            paddingLeft: 4
                        }}/>
                        <Typography variant="h5" style={{
                            color: submitButtonHover ? '#fbff2b' : '#424242',
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
                               onClick={() => window.open("https://twitter.com/HoneyDropsNFT", "_blank")}
                    />

                    <MdEmail style={{fontSize: 30, cursor: 'pointer', color: '#fff', marginLeft: '1rem',}}
                               onClick={props.handleContactOpen}
                    />
                </div>
            </Container>
        </div>
    );
};

