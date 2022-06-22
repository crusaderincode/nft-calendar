import React, {useState} from 'react';
import {Paper, Typography} from "@mui/material";
import {FaDiscord, FaTwitter} from "react-icons/fa";
import {MdPublic} from "react-icons/md";

interface UserEvent {
    event: IEvent
}

export const UserEvent = ({event}: UserEvent) => {
    const [flag, setFlag] = useState(false)

    const flagHandler = () => setFlag(!flag)


    const strStamp: any = event.date?.toString()
    const strCutStamp = strStamp.substr(18,10)
    const timeStamp = Number(strCutStamp)
    const date = new Date(Number(timeStamp * 1000))
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const formattedDate = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear()


    return (
        <Paper elevation={12} key={event.id} style={{
            marginTop: '1rem',
            marginBottom: '1rem',
            backgroundColor: 'rgba(255,255,255,0.04)',
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            border: '1px solid #0f151d',
            maxHeight: flag ? 300 : 80,
            overflow: 'hidden',
            transition: "all 0.5s ease-in-out",
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
            <div style={{
                display: 'flex'
            }}>
                <img src={event.image} alt="Wrong img url"
                     onClick={flagHandler}
                     style={{
                         height: 80,
                         width: 80,
                         textAlign: 'center',
                         borderRadius: 10,
                         cursor: 'pointer'
                     }}/>
                <div style={{
                    marginLeft: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h5"
                                onClick={flagHandler}
                                style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        {event.name}
                    </Typography>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <FaDiscord style={{fontSize: 25, color: '#fff', cursor: 'pointer', marginRight: 8
                        }}
                                   onClick={()=> window.open(event.discord, "_blank")} />
                        <Typography variant="body1" style={{
                            color: '#fff',
                            marginRight: 15,
                            fontWeight: 'bold'
                        }}>
                            {
                                //@ts-ignore
                                event.discordMembers && event.discordMembers < 1000 ? event.discordMembers : event.discordMembers < 10000 ? `${String(event.discordMembers / 1000).slice(0,3)}k` : event.discordMembers < 100000 ? `${String(event.discordMembers / 1000).slice(0,4)}k` : `${String(event.discordMembers / 1000).slice(0,3)}k`}
                        </Typography>
                        <FaTwitter style={{fontSize: 25, color: '#fff'}}
                                   onClick={()=> window.open(event.twitter, "_blank")}
                        />
                        <Typography variant="body1" style={{
                            color: '#fff',
                            marginLeft: 5,
                            fontWeight: 'bold'
                        }}>
                            {
                                //@ts-ignore
                                event.twitterMembers && event.twitterMembers < 1000 ? event.twitterMembers : event.twitterMembers < 10000 ? `${String(event.twitterMembers / 1000).slice(0,3)}k` : event.twitterMembers < 100000 ? `${String(event.twitterMembers / 1000).slice(0,4)}k` : `${String(event.twitterMembers / 1000).slice(0,3)}k`}
                        </Typography>

                        {
                            //@ts-ignore
                          event.website.length > 0 && <MdPublic style={{fontSize: 25, color: '#fff', cursor: 'pointer', marginLeft: 8
                          }}
                                                                   onClick={()=> window.open(event.website, "_blank")} />
                        }


                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6" style={{
                    color: 'gray',
                    marginLeft: 5,
                }}>
                    Price
                </Typography>

                <Typography variant="h6" style={{
                    color: '#fff',
                    marginLeft: 5,
                    fontWeight: 'bold'
                }}>
                    {Number(event.price) > 0 ? `${event.price} ${event.currency}` : `TBA ${event.currency}`}
                </Typography>

            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6" style={{
                    color: 'gray',
                    marginLeft: 5,
                }}>
                    Supply
                </Typography>

                <Typography variant="h6" style={{
                    color: '#fff',
                    marginLeft: 5,
                    fontWeight: 'bold'
                }}>
                    {Number(event.supply) > 0 ? event.supply : 'TBA'}
                </Typography>

            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: '1rem'
            }}>
                <Typography variant="h6" style={{
                    color: 'gray',
                    marginLeft: 5,
                }}>
                    Date
                </Typography>

                <Typography variant="h6" style={{
                    color: '#fff',
                    marginLeft: 5,
                    fontWeight: 'bold'
                }}>
                    {formattedDate}
                </Typography>

            </div>
            </div>

            <div>

                <Typography variant="h5"
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginTop: '0.5rem'
                            }}>
                  Description
                </Typography>
                <Typography variant="h6" style={{
                    color: '#fff',
                    marginLeft: 5,
                }}>
                    {event.description}
                </Typography>
            </div>
        </Paper>
    );
};

