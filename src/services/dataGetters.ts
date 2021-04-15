// import {
//     apiBaseUrl,
//     objectTypeInfo,
// } from 'constants/general';

import {
    http,
    // stringifyQueryParams
} from './utilities';

type TProps = {
    endpoint: string,
    // currentPage?: number | null,
    // orderBy?: string,
    // sort?: string,
    // searchField?: string,
};

// let controller: (AbortController & { requestUrl?: string }) | null = null;

const fetchItems = ({
    endpoint,
    // currentPage = 0,
    // orderBy = 'description',
    // sort = 'ASC',
    // searchField = '',
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
            method: "get",
            // signal,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
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
