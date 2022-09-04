import React, {useCallback, useEffect, useState} from 'react';
import {Container, Paper, Typography} from "@mui/material";
import {GoPlus} from "react-icons/go";
import {IoMdArrowRoundBack} from "react-icons/io"
import logo from "../../img/logo.png";
import isMobile from "../../copmonents/isMobile";
import HeaderMobile from "../../copmonents/HeaderMobile";
import Header from "../../copmonents/Header";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {getNews} from "../../redux/actions/news";
import NewsItem from "../../copmonents/NewsItem";
import Footer from "../../copmonents/Footer";

export const NewsPage = () => {
    const mobile = isMobile()
    const dispatch: Dispatch<any> = useDispatch()

    const news = useSelector(
        (state: SelectorNewsState) => state.new.news,
        shallowEqual
    )

    const fetchNews = useCallback(
        () => dispatch(getNews()),
        [dispatch]
    )

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100vw',
        }}>
            {
                mobile ? <HeaderMobile
                /> : <Header
                />
            }

            <Container maxWidth="md" style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                marginTop: mobile ? '4rem' : '6rem'
            }}>
                {
                    news && news.map((event: INews) => (
                        <NewsItem item={event} key={event.id}/>

                    ))
                }
            </Container>
                <Footer />
        </div>
    );
};

