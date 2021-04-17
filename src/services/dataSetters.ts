import Axios from "axios";
// import {
//     http,
// } from './utilities';

type TProps = {
    endpoint: string,
    body: any,
};

const postItems = ({
    endpoint,
    body,
}: TProps) => {
    return Axios.post(endpoint, ...body, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then(response => response.data);

    // const requestObject = new Request(
    //     `${endpoint}`,
    //     {
    //         method: 'post',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': 'Content-Type',
    //         },
    //         body
    //     }
    // );

    // return http(requestObject)
    //     .then((response) => {
    //         return response;
    //     })
    //     .catch((error) => {
    //         throw new Error(error);
    //     })
};

export default postItems;
