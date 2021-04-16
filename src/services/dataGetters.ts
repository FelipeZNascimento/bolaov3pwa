import {
    http,
} from './utilities';

type TProps = {
    endpoint: string
};

// let controller: (AbortController & { requestUrl?: string }) | null = null;

const fetchItems = ({
    endpoint
}: TProps) => {
    // let requestUrl = endpoint;

    // if (controller && requestUrl === controller.requestUrl) {
    //     controller.abort();
    // }

    // controller = new AbortController();
    // controller.requestUrl = endpoint;
    // const signal = controller.signal;

    // requestUrl += stringifyQueryParams(currentPage, orderBy, sort, searchField);

    const requestObject = new Request(
        `${endpoint}`,
        {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
                'credentials': 'include'
            }

        }
    );

    return http(requestObject)
        .then((response) => {
            // controller = null;
            return response;
        })
        .catch((error) => {
            throw new Error(error);
        })
};

export default fetchItems;
