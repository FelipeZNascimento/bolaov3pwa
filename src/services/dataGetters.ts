import Axios from "axios";

// import {
//     http,
// } from './utilities';

type TProps = {
    endpoint: string
};

const fetchItems = ({
    endpoint
}: TProps) => {
    return Axios
        .get(endpoint, { withCredentials: true })
        .then(response => response.data);


    // Axios({
    //     method: "GET",
    //     url: endpoint,
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // }).then((response) => {
    //     return response;
    // }).catch(function (error) {
    //     throw new Error(error);
    // });


    // const requestObject = new Request(
    //     `${endpoint}`,
    //     {
    //         method: 'get',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': 'Content-Type',
    //         },
    //     }
    // );

    // return http(requestObject)
    //     .then((response) => {
    //         // controller = null;
    //         return response;
    //     })
    //     .catch((error) => {
    //         throw new Error(error);
    //     })
};

export default fetchItems;
