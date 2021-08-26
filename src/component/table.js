import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { getTableData, removeData } from "../action/index";
import ModalPopup from "./modal";
import Loader from "./spinner";

const Table = () => {
    /**
     * state variables
     */
    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [show, setShow] = useState(false);
    const [columns, setColumns] = useState([]);
    const [loadFlag, setLoader] = useState(true);
    /**
     * Hide and Show modal popup handler
     */
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /**
     * Dispatch instance
     */
    const dispatch = useDispatch();
    /**
     * selectors
     */
    const tableDataSelector = useSelector((state) =>
        state.tableData
    );
    const updatedTableDataSelector = useSelector((state) =>
        state.updatedTableData
    );
    /**
     * use effect hook on component mount
     */
    useEffect(() => {
        dispatch(getTableData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /**
     * use effect hook executed for table data change
     */
    useEffect(() => {
        setTableData(tableDataSelector);
        setColumns(tableDataSelector && tableDataSelector.length > 0 && Object.keys(tableDataSelector[0]));
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, [tableDataSelector]);
    /**
     * use effect hook executed after data is removed
     */
    useEffect(() => {
        setTableData(updatedTableDataSelector);
    }, [updatedTableDataSelector]);

    /**
     * select all click handler
     */
    const handleSelectAll = () => {
        let selected = [];
        if (tableData && tableData.length > 0 && !selectAll) {
            tableData.forEach((item) => {
                selected.push(item.id);
            });
            setSelectedRows(selected);
        } else {
            setSelectedRows([]);
        }
        setSelectAll(!selectAll);
    };
    /**
     * checkbox click handler
     */
    const checkHandler = (selectedDetail) => {
        let flg = false;
        let selected = [];
        selected = selectedRows.filter((id) => {
            if (id === selectedDetail.id) {
                flg = true;
                return false;
            }
            return true;
        });
        if (!flg) {
            selected = [...selectedRows];
            selected.push(selectedDetail.id);
        }
        setSelectedRows(selected);
        selected.length === tableData.length ? setSelectAll(true) : setSelectAll(false);
    };
    /**
     * Remove data handler
     */
    const removeDataHandler = () => {
        handleClose();
        setLoader(true);
        dispatch(removeData(tableData, selectedRows));
        setSelectAll(false);
        setSelectedRows([]);
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    };
    /**
     * set table columns configuration
     */
    const getColumnConfiguration = () => {
        let dynamicColumns = [];
        columns.length > 0 && columns.forEach((item) => {
            let obj = {
                Header: item.toUpperCase(),
                accessor: item,
                sort: true,
                filterable: true,
                headerClassName: "RT-HR-cls"
            };
            if (item === 'completed') {
                dynamicColumns.push({
                    ...obj,
                    Cell: ({ original }) => {
                        return (
                            <span>
                                {original.completed ? "Yes" : "No"}
                            </span>
                        );
                    },
                })
            } else {
                dynamicColumns.push(obj);
            }
        })
        return [
            {
                //for the select all header
                Header: () => {
                    return (
                        <div className="round">
                            <input
                                type="checkbox"
                                id="select-all"
                                checked={selectAll}
                                onClick={() => handleSelectAll()}
                            />
                            <label htmlFor="select-all"></label>
                        </div>
                    );
                },
                //for checkbox
                Cell: ({ original }) => {
                    return (
                        <div className="round">
                            <input
                                type="checkbox"
                                className="select-row"
                                id={original.id}
                                checked={
                                    selectedRows.indexOf(original.id) >= 0
                                        ? true
                                        : false
                                }
                                onChange={() => checkHandler(original)}
                            />
                            <label htmlFor={original.id}></label>
                        </div>
                    );
                },

                sortable: false,
                filterable: false,
                accessor: "id",
                width: 40,
                show: true,
                style: {
                    textAlign: "center",
                },
            },
            ...dynamicColumns
        ];
    }
    return (
        <Container>
            <Row>
                <Col sm={12} className="text-right mb-3 mt-3">
                    {selectedRows.length > 0 && <Button variant="danger" onClick={() => handleShow()}>Remove</Button>}
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="text-center">
                    {loadFlag ? <Loader /> :
                        <ReactTable
                            columns={getColumnConfiguration()}
                            data={tableData}
                            minRows={5}
                        />}
                </Col>
            </Row>
            <ModalPopup show={show} handleClose={handleClose} remove={removeDataHandler} />
        </Container>
    )
}

export default Table;
