import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Grid, Paper} from "@mui/material";
import {GoPlus} from "react-icons/go";
import {Link} from "react-router-dom";


interface Modal {
    handleClose: () => void,
    state: boolean
}

export const PriceModal = ({handleClose, state}: Modal) => {
    const bigScreenFlag = window.innerWidth > 1600

    const [standardButton, setStandardButton] = useState(false)
    const [featuredButton, setFeaturedButton] = useState(false)
    const [premiumButton, setPremiumButton] = useState(false)

    const handleClick = () => {

    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        height: 'auto',
        minWidth: 800,
        bgcolor: 'background.paper',
        outline: 'none',
        borderRadius: 5,
        boxShadow: 24,
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    };


    return (
        <div>
            <Modal
                open={state}
                sx={{
                    border: 'none'
                }}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant={bigScreenFlag ? 'h3' : 'h4'} style={{
                        fontFamily: 'Pixels',
                        padding: 5,
                        margin: 0,
                        color: '#c80e72',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>
                        Select your plan
                    </Typography>
                   <Grid container spacing={2} style={{
                       height: '100%',
                       marginTop:  0
                   }}>
                       <Grid item xs={12} sm={4} md={4} lg={4} style={{
                           display: 'flex',
                           justifyContent: 'center'
                       }}>
                        <Paper elevation={12} style={{
                            width: '90%',
                            height: '100%',
                            borderRadius: 10,
                            minWidth: 260,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                            <Typography variant={bigScreenFlag ? 'h4' : 'h5'} style={{
                                fontFamily: 'Pixels',
                                padding: bigScreenFlag ? 5 : 3,
                                color: '#366693',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}>
                                Standard
                            </Typography>
                                <Typography variant={bigScreenFlag ? 'h4' : 'h5'} style={{
                                    fontFamily: 'Pixels',
                                    color: '#366693',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}>
                                    Free
                                </Typography>

                            <Typography variant="h6" style={{
                                fontFamily: 'Pixels',
                                padding: bigScreenFlag ? 5 : 3,
                                color: '#366693',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>
                                • Lifetime listing
                            </Typography>

                            <Typography variant="h6" style={{
                                fontFamily: 'Pixels',
                                padding: bigScreenFlag ? 5 : 3,
                                color: '#366693',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>
                                • 48h approval
                            </Typography>

                            <Typography variant="h6" style={{
                                fontFamily: 'Pixels',
                                padding: bigScreenFlag ? 5 : 3,
                                color: '#366693',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>
                                • Tweet in daily mints
                            </Typography>
                            </div>
                            <Link to="/add" state={{promo: 0}} style={{
                                textDecoration: 'none'
                            }}>
                            <Paper
                                onClick={handleClick}
                                onMouseOver={() => setStandardButton(true)}
                                onMouseOut={() => setStandardButton(false)}
                                style={{
                                    backgroundColor: standardButton ? '#294e71' : '#366693',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}>
                                <GoPlus style={{
                                    color: '#fff',
                                    fontSize: 25,
                                    paddingLeft: 4
                                }}/>
                                <Typography variant="h5" style={{
                                    color: '#fff',
                                    fontFamily: 'Pixels',
                                    padding: 5,
                                    paddingLeft: 0,
                                    paddingRight: 7,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}>
                                    Submit drop
                                </Typography>
                            </Paper>
                            </Link>
                        </Paper>
                    </Grid>
                       <Grid item xs={12} sm={4} md={4} lg={4} style={{
                           display: 'flex',
                           justifyContent: 'center'
                       }}>
                           <Paper elevation={12} style={{
                               width: '90%',
                               height: '100%',
                               borderRadius: 10,
                               minWidth: 260,
                               display: 'flex',
                               flexDirection: 'column',
                               justifyContent: 'space-between'
                           }}>
                               <div>
                               <Typography variant={bigScreenFlag ? 'h4' : 'h5'} style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#7965c1',
                                   textAlign: 'center',
                                   fontWeight: 'bold',
                               }}>
                                   Featured
                               </Typography>

                                   <Typography variant={bigScreenFlag ? 'h4' : 'h5'} style={{
                                       fontFamily: 'Pixels',
                                       color: '#7965c1',
                                       textAlign: 'center',
                                       fontWeight: 'bold',
                                   }}>
                                       10$
                                   </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#7965c1',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • Lifetime listing
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#7965c1',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • 24h approval
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#7965c1',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • Tweet in daily mints
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#7965c1',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • 7 days in featured list
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#7965c1',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • Email support
                               </Typography>
                               </div>
                               <Link to="/add" state={{promo: 1}} style={{
                                   textDecoration: 'none'
                               }}>
                               <Paper
                                   onClick={handleClick}
                                   onMouseOver={() => setFeaturedButton(true)}
                                   onMouseOut={() => setFeaturedButton(false)}
                                   style={{
                                       backgroundColor: featuredButton ? '#5f4aab' : '#7965c1',
                                       display: 'flex',
                                       flexDirection: 'row',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       cursor: 'pointer'
                                   }}>
                                   <GoPlus style={{
                                       color: '#fff',
                                       fontSize: 25,
                                       paddingLeft: 4
                                   }}/>
                                   <Typography variant="h5" style={{
                                       color: '#fff',
                                       fontFamily: 'Pixels',
                                       padding: 5,
                                       paddingLeft: 0,
                                       paddingRight: 7,
                                       textAlign: 'center',
                                       fontWeight: 'bold',
                                   }}>
                                       Submit drop
                                   </Typography>
                               </Paper>
                               </Link>
                           </Paper>
                       </Grid>
                       <Grid item xs={12} sm={4} md={4} lg={4} style={{
                           display: 'flex',
                           justifyContent: 'center'
                       }}>
                           <Paper elevation={12} style={{
                               width: '90%',
                               height: '100%',
                               borderRadius: 10,
                               minWidth: 260,
                               display: 'flex',
                               flexDirection: 'column',
                               justifyContent: 'space-between'
                           }}>
                               <div>
                               <Typography variant={bigScreenFlag ? 'h4' : 'h5'} style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#c80e72',
                                   textAlign: 'center',
                                   fontWeight: 'bold',
                               }}>
                                   Premium
                               </Typography>

                                   <Typography variant={bigScreenFlag ? 'h4' : 'h5'} style={{
                                       fontFamily: 'Pixels',
                                       color: '#c80e72',
                                       textAlign: 'center',
                                       fontWeight: 'bold',
                                   }}>
                                       50$
                                   </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#c80e72',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • Lifetime listing
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#c80e72',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • 12h approval
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#c80e72',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • Tweet in daily mints
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#c80e72',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • 7 days in featured list
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#c80e72',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • Email support
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#c80e72',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • 7 days in promo badge
                               </Typography>

                               <Typography variant="h6" style={{
                                   fontFamily: 'Pixels',
                                   padding: bigScreenFlag ? 5 : 3,
                                   color: '#c80e72',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                   marginLeft: 10
                               }}>
                                   • Custom tweet about your collection
                               </Typography>
                               </div>
                               <Link to="/add" state={{promo: 2}} style={{
                                   textDecoration: 'none'
                               }}>
                               <Paper
                                   onClick={handleClick}
                                   onMouseOver={() => setPremiumButton(true)}
                                   onMouseOut={() => setPremiumButton(false)}
                                   style={{
                                       backgroundColor: premiumButton ? '#b10963' : '#c80e72',
                                       display: 'flex',
                                       flexDirection: 'row',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       cursor: 'pointer'
                                   }}>
                                   <GoPlus style={{
                                       color: '#fff',
                                       fontSize: 25,
                                       paddingLeft: 4
                                   }}/>
                                   <Typography variant="h5" style={{
                                       color: '#fff',
                                       fontFamily: 'Pixels',
                                       padding: 5,
                                       paddingLeft: 0,
                                       paddingRight: 7,
                                       textAlign: 'center',
                                       fontWeight: 'bold',
                                   }}>
                                       Submit drop
                                   </Typography>
                               </Paper>
                               </Link>

                           </Paper>
                       </Grid>
                   </Grid>
                </Box>
            </Modal>
        </div>
    );
};
