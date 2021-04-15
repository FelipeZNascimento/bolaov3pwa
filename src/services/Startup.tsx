import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { fetchDefaultConfig } from 'store/app/actions';

const Startup = (props: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDefaultConfig());
    }, [dispatch]);

    return props.children;
};

export default Startup;