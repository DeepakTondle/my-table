import axios from "axios";
const axiosInstance = axios.create({});

export const getTableData = () => {
    return dispatch => {
        let apiUrl = `https://jsonplaceholder.typicode.com/todos`;
        const result = axiosInstance.get(apiUrl);
        result.then((response) => {
            dispatch({
                type: "GET_TABLE_DATA",
                payload: response.data
            });
        }).catch(() => {
            dispatch({
                type: "GET_TABLE_DATA",
                payload: []
            });
        });
    };
};

export const removeData = (data, selectedRows) => {
    let selected = data.filter((item) => {
        return !selectedRows.includes(item.id);
    });
    return {
        type: "REMOVE_DATA",
        payload: selected
    };
};
