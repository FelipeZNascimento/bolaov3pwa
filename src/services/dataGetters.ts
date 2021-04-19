import Axios from "axios";

type TProps = {
    endpoint: string
};

const fetchItems = ({
    endpoint
}: TProps) => {
    return Axios
        .get(endpoint, { withCredentials: true })
        .then(response => response.data);
};

export default fetchItems;
