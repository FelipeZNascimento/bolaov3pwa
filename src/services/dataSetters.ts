import Axios from 'axios';
import { apiBaseUrl } from 'services/endpoints';
import { guidGenerator } from 'services/helpers';
import TRequest from './types';

type TProps = {
  endpoint: string;
  body: any;
};

const CancelToken = Axios.CancelToken;
let requests: TRequest[] = [];

const postItems = ({ endpoint, body }: TProps) => {
  const currentRequestInfo = endpoint
    .replace(apiBaseUrl, '')
    .split('/')
    .splice(0, 2);
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

  const isUpdatingBet =
    currentRequest.endpoint === 'bets' && currentRequest.params === 'update';
  // Find a request with same endpoint and param
  const sameRequest = requests.filter(
    (request) =>
      request.endpoint === currentRequest.endpoint &&
      request.params === currentRequest.params &&
      !isUpdatingBet
  );

  if (sameRequest.length > 0) {
    sameRequest[0].cancel();
    requests = requests.filter((request) => request.id !== currentRequest.id);
  }

  return Axios.post(endpoint, body, {
    headers: {
      'Content-Type': 'application/json'
    },
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

export default postItems;
