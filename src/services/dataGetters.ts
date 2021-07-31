import Axios from "axios";
import { apiBaseUrl } from 'services/endpoints';
import { guidGenerator } from 'services/helpers';

type TProps = {
    endpoint: string
};

type TRequest = {
    id: string;
    endpoint: string;
    params: string;
    cancel: any;
};

const CancelToken = Axios.CancelToken;
let requests: TRequest[] = [];

const fetchItems = ({
    endpoint
}: TProps) => {
    const currentRequestInfo = endpoint.replace(apiBaseUrl, '').split('/').splice(0, 2);
    let currentRequest: TRequest = {
        id: guidGenerator(),
        endpoint: '',
        params: '',
        cancel: null
    };

    if (currentRequestInfo.length > 0) {
        currentRequest.endpoint = currentRequestInfo[0];
    }

    if (currentRequestInfo.length > 1) {
        currentRequest.params = currentRequestInfo[1];
    }

    // Find a request with same endpoint and param
    const sameRequest = requests.filter((request) => request.endpoint === currentRequest.endpoint
        && request.params === currentRequest.params);

    if (sameRequest.length > 0) {
        sameRequest[0].cancel();
        requests = requests.filter((request) => request.id !== currentRequest.id);
    }

    return Axios
        .get(endpoint, {
            cancelToken: new CancelToken(function executor(c) {
                currentRequest.cancel = c;
                requests.push(currentRequest);
            }),
            withCredentials: true
        })
        .then((response) => {
            requests = requests.filter((request) => request.id !== currentRequest.id);
            return response.data;
        })
        .catch((error) => {
            requests = requests.filter((request) => request.id !== currentRequest.id);
            if (Axios.isCancel(error)) {
                throw new Error(undefined);
            } else {
                throw new Error(error.response.data);
            }
        });
};

export default fetchItems;
