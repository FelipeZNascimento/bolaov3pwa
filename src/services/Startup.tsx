import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCSS } from "fg-loadcss";

// Actions
import { fetchDefaultConfig } from 'store/app/actions';

const Startup = (props: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDefaultConfig());
        loadCSS("https://use.fontawesome.com/releases/v5.1.0/css/all.css");
    }, [dispatch]);

    return props.children;
};

export default Startup;