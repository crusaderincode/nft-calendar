import React, {useRef, useState} from 'react';
import isMobile from "../isMobile";
import {Paper, useTheme, Typography} from "@mui/material";


interface NewsItem {
    item: INews
}

export const NewsItem = ({item}: NewsItem) => {
    const mobile = isMobile()
    const theme = useTheme()

    const [flag, setFlag] = useState(false)

    const flagHandler = () => setFlag(!flag)


    const strStamp: any = item.date?.toString()
    const strCutStamp = strStamp.substr(18,10)
    const timeStamp = Number(strCutStamp)
    const date = new Date(Number(timeStamp * 1000))


    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const formattedDate = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear()




    return (
        <Paper elevation={12} key={item.id} style={{
            marginTop: '1rem',
            marginBottom: '1rem',
            backgroundColor: 'rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            padding: 10,
            border: '1px solid #262b36',
            maxHeight: mobile ? flag ? 800 : 450 : flag ? 500 : 245,
            overflow: 'hidden',
            transition: "all 0.5s ease-in-out",
            position: 'relative'
        }}
               sx={{ "&:hover": { transform: "scale3d(1.02, 1.02, 1.02)" },
                   transition: "transform 0.25s ease-in-out",}}>


<div>
    {
        mobile && <Typography variant={mobile ? 'h5' : 'h4'}
                               onClick={flagHandler}
                               style={{
                                   color: theme.palette.primary.contrastText,
                                   fontWeight: 'bold',
                                   cursor: 'pointer',
                                   marginBottom: '1rem',
                                   textAlign: 'center'
                               }}>
            {item.header}
        </Typography>
    }
                    <img src={item.image} alt="Wrong img url"
                         onClick={flagHandler}
                         style={{
                             height: mobile ? '80%' : 240,
                             width: mobile ? '80%' : 240,
                             marginLeft: mobile ? '10%' : 0,
                             objectFit: 'cover',
                             textAlign: 'center',
                             borderRadius: 10,
                             cursor: 'pointer',
                             textOverflow: 'ellipsis'
                         }}/>

            {(flag && !mobile && (item.url !== "")) && <Typography
                variant={mobile ? 'h6' : 'h5'}
                onClick={() => window.open(item.url, "_blank")}
                style={{
                color: theme.palette.primary.contrastText,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '0.5rem',
                    textDecoration: 'underline',
                    cursor: 'pointer'
            }}>
                Know more
            </Typography>}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: mobile ? '1rem' : '1rem',
                marginRight: mobile ? '1rem' : 0,
                marginTop: mobile ? '1rem' : 0
            }}>
                {
                    !mobile && <Typography variant={mobile ? 'h6' : 'h4'}
                                           onClick={flagHandler}
                                           style={{
                                               color: theme.palette.primary.contrastText,
                                               fontWeight: 'bold',
                                               cursor: 'pointer',
                                               marginBottom: '1rem'
                                           }}>
                        {item.header}
                    </Typography>
                }

                <Typography variant={mobile ? 'body1' : 'h6'} style={{
                    color: '#fff',
                    marginLeft: mobile ? 0 : 5,
                    textAlign: 'justify'
                }}>
                    {//@ts-ignore
                       flag ? item.text : (item.text.length > (mobile ? 100 : 290)) ? item.text.slice(0, mobile ? 100 : 290).replace(/\w+[.!?]?$/, '') + '...' : item.text}
                </Typography>
            </div>

            {(flag && mobile && (item.url !== "")) && <Typography
                variant={mobile ? 'h6' : 'h5'}
                onClick={() => window.open(item.url, "_blank")}
                style={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '0.5rem',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }}>
                Know more
            </Typography>}
            <Typography variant={mobile ? 'body2' : 'body1'} style={{
                color: theme.palette.primary.contrastText,
                position: 'absolute',
                bottom: 0,
                right: 7
            }}>
                {formattedDate}
            </Typography>


        </Paper>
    );
};

