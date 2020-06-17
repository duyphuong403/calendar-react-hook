import React, { useState, useContext } from 'react';
import moment from 'moment'
import { AppContext } from './App'

const Calender = () => {
    const [dateObject] = useState(moment);
    const {state, dispatch} = useContext(AppContext);
    

    // get days in week
    const daysInWeek = moment.weekdaysShort();

    // get current day
    const currentDay = dateObject.format("D");

    const firstDayOfMonth = moment(dateObject).startOf("month").format("d");

    // create blank cells
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        blanks.push(
            <td>{""}</td>
        )
    }
    // create date cells
    const daysInMonth = dateObject.daysInMonth();

    let daysInMonthCell = [];
    for (let d = 1; d <= daysInMonth; d++) {
        // highlight if is today
        let className = d == currentDay ? "border border-primary" : null;
        daysInMonthCell.push(
            <td key={d} className={className}>
                {d}
            </td>
        )
    }

    // show date and blank in table
    var totalSlots = [...blanks, ...daysInMonthCell];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
        // if i != 7 will create new row
        if (i % 7 !== 0) {
            cells.push(row);
        } else {
            // i = 7 => 
            rows.push(cells); 
            cells = [];
            cells.push(row);
        }
        if (i === totalSlots.length - 1) {
            rows.push(cells);
        }
    });

    // map rows to tr element
    let dayInMonthElements = rows.map((d, i) => {
        return <tr key={i}>{d}</tr>;
    });

    return (
        <table className="table table-bordered table-dark">
            <thead>
                <tr>
                    {daysInWeek.map((eachDay) => { return (<td key={eachDay}>{eachDay}</td>) })}
                </tr>
            </thead>
            <tbody>
                {dayInMonthElements}
            </tbody>
        </table>
    )
}

export { Calender }