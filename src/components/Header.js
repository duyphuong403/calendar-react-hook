import React, { useState, useContext } from 'react'
import moment from 'moment'
import { AppContext } from './App'

export const Header = () => {
    const { state, dispatch } = useContext(AppContext)

    const allMonths = moment.months()
    const [showMonthTable, setShowMonthTable] = useState(false)
    const [showDateTable, setShowDateTable] = useState(false)

    const currentMonth = state.dateObject.format("MMMM")
    const currentYear = state.dateObject.format("YYYY")

    const setMonth = (month) => {
        let monthNo = allMonths.indexOf(month)
        dispatch({ type: 'CHANGE_MONTH', data: { dateObject: state.dateObject, monthNo: monthNo } })
        setShowDateTable(!showDateTable)
        setShowMonthTable(!showMonthTable)
    }

    const monthList = () => {
        let months = []
        allMonths.map((eachMonth) => {
            let currentMonthStyle = eachMonth === moment().format("MMMM") ? "border border-primary" : null
            return months.push(
                <td key={eachMonth + 20} onClick={() => { setMonth(eachMonth) }} className={currentMonthStyle} style={{cursor: "pointer"}}>
                    {eachMonth}
                </td>
            )
        })

        // Create list of cells to contain month name
        let rows = []
        let cells = []

        months.forEach((row, i) => {
            if (i % 4 !== 0 || i === 0) {
                cells.push(row)
            } else {
                rows.push(cells)
                cells = []
                cells.push(row)
            }
        })
        rows.push(cells)
        let monthlist = rows.map((d, i) => {
            return <tr key={i + 30}>{d}</tr>
        })

        return (
            <tbody>
                <tr>
                    <th colSpan="4" onClick={() => setShowMonthTable(!showMonthTable)}>Select a Month</th>
                </tr>
                {monthlist}
            </tbody>
        )
    }

    return (
        <table className="table table-dark" style={{ margin: 0, textAlign: "center" }}>
            <thead className="thead-light">
                {!showMonthTable && (
                    <tr>
                        <td style={{ textAlign: "left" }}><button onClick={() => dispatch({ type: 'PREV_MONTH', data: { dateObject: state.dateObject.subtract(1, "month") } })} className="btn btn-secondary">Prev</button></td>
                        <td>
                            <button className="btn btn-secondary" onClick={() => setShowMonthTable(!showMonthTable)}><b>{currentMonth} {currentYear}</b></button>
                        </td>
                        <td colSpan="3"><button className="btn btn-secondary" onClick={() => dispatch({ type: 'TODAY' })}>Today</button></td>
                        <td style={{ textAlign: "right" }}><button onClick={() => dispatch({ type: 'PREV_MONTH', data: { dateObject: state.dateObject.add(1, "month") } })} className="btn btn-secondary">Next</button></td>
                    </tr>
                )}
            </thead>
            {showMonthTable && (monthList())}
        </table>
    )
}