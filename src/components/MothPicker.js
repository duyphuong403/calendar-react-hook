import React, { useState, useEffect, useReducer } from 'react';
import moment from 'moment'

export const MonthPicker = () => {
    const [allMonths] = useState(moment.months())
    const [dateObject, setObjetDate] = useState(moment);
    const [showMonthTable, setShowMonthTable] = useState(false);
    const [showDateTable, setShowDateTable] = useState(false);

    const currentMonth = dateObject.format("MMMM");

    const setMonth = (month) => {
        let monthNo = allMonths.indexOf(month);
        let dateObject = Object.assign({}, dateObject);
        dateObject = moment(dateObject).set("month", monthNo);
        setObjetDate(dateObject)
        setShowDateTable(!showDateTable);
        setShowMonthTable(!showMonthTable);
    }

    const monthList = () => {
        let months = [];
        allMonths.map((eachMonth) => {
            return months.push(
                <td
                    key={eachMonth}
                    onClick={() => {
                        setMonth(eachMonth);
                    }}
                >
                    {eachMonth}
                </td>
            );
        })

        // Create list of cells to contain month name
        let rows = [];
        let cells = [];

        months.forEach((row, i) => {
            if (i % 4 !== 0 || i == 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });
        rows.push(cells);
        let monthlist = rows.map((d, i) => {
            return <tr key={d}>{d}</tr>;
        });

        return (
            <tbody>
                <tr>
                    <th colSpan="4">Select a Month</th>
                </tr>
                {monthlist}
            </tbody>
        );
    }

    // useEffect(() => {
    //     setShowMonthTable(!showMonthTable);
    //     // alert(showMonthTable)
    // },[showMonthTable])

    return (
        <table className="table table-bordered" style={{ margin: 0, textAlign: "center" }}>
            <thead className="thead-light">
                {!showMonthTable && (
                    <tr>
                        <td style={{ textAlign: "left" }}><button className="btn btn-primary">Prev</button></td>
                        <td>
                            <h3 onClick={() => setShowMonthTable(!showMonthTable)}>{currentMonth}</h3>
                        </td>
                        <td style={{ textAlign: "right" }}><button className="btn btn-primary">Next</button></td>
                    </tr>
                )}
            </thead>
            {showMonthTable && (monthList())}
        </table>
    )
}