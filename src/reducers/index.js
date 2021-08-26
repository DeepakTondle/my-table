const initialState = {
    tableData: [],
    updatedTableData: []
};

const RootReduer = (state, action) => {
    if (state && Object.keys(state).length === 0) {
        state = initialState;
    }
    switch (action.type) {
        case "GET_TABLE_DATA":
            return { ...state, tableData: action.payload };
        case "REMOVE_DATA":
            return { ...state, updatedTableData: action.payload };
        default: return state;
    }
}

export default RootReduer;