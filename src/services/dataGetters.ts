import Axios from "axios";

type TProps = {
    endpoint: string
};

const fetchItems = ({
    endpoint
}: TProps) => {
    return Axios
        .get(endpoint, { withCredentials: true })
        .then(response => response.data)
        .catch((error) => {
            throw new Error(error.response.data);
        });
};

export default fetchItems;
