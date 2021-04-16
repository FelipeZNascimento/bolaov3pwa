import {
    http,
} from './utilities';

type TProps = {
    endpoint: string,
    body: string,
};

const postItems = ({
    endpoint,
    body,
}: TProps) => {
    const requestObject = new Request(
        `${endpoint}`,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
            credentials: 'include',
            body
        }
    );

    return http(requestObject)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new Error(error);
        })
};

export default postItems;
