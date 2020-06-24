import React, { useContext, useState } from 'react'
import moment from 'moment'
import { AppContext } from './App'
import Data from '../todo_data.json'
import SweetAlert from 'react-bootstrap-sweetalert'

const Calender = () => {
    const { state } = useContext(AppContext)

    const daysInWeek = moment.weekdaysShort()
    const currentDay = state.dateObject.format("D")
    const firstDayOfMonth = moment(state.dateObject).startOf("month").format("d")

    const currentMonth = moment().format("MM")
    const currentMonthFromReducer = state.dateObject.format("MM")

    const currentYear = moment().format("YYYY")
    const currentYearFromReducer = state.dateObject.format("YYYY")

    // Import data from json file to events
    const events = []
    for (const year in Data) {
        for (const element in Data[year]) {
            events.push({
                date: Data[year][element].date,
                title: Data[year][element].title,
                description: Data[year][element].description,
                status: Data[year][element].status
            })
        }
    }

    const [eventList] = useState(events)
    // create blank cells
    let blanks = []
    for (let i = 0; i < firstDayOfMonth; i++) {
        blanks.push(
            <td key={i}>{""}</td>
        )
    }

    // create date cells
    const daysInMonth = state.dateObject.daysInMonth()
    let daysInMonthCell = []

    const setTaskClassName = (status) => {
        switch (status) {
            case "not started yet":
                return "not-started-yet"
            case "pending":
                return "pending"
            case "in progress":
                return "in-progress"
            case "completed":
                return "completed"
            case "not completed":
                return "not-completed"
            default:
                return null
        }
    }

    // Sweetalert to show more details
    const [alert, setAlert] = useState(null)
    const hideAlert = () => {
        setAlert(null)
    }

    const handleEventClick = (event) => {
        const getAlert = () => (
            <SweetAlert
                title={event.date}
                onConfirm={() => hideAlert()}
            >
                <p>status: <b>{event.status}</b></p>
                <h3>{event.title}</h3>
                <br />
                {event.description}
            </SweetAlert>
        )
        setAlert(getAlert())
    }

    for (let d = 1; d <= daysInMonth; d++) {
        // highlight if is today
        let className = d === parseInt(currentDay) && currentMonth === currentMonthFromReducer && currentYear === currentYearFromReducer ? "border border-primary" : undefined

        // re-format date
        const currentDateFullFormat = `${currentYearFromReducer}-${currentMonthFromReducer}-${d}`

        const eventElement = []
        for (let i = 0; i < eventList.length; i++) {
            if (currentDateFullFormat === eventList[i].date) {
                eventElement.push(
                    <h5
                        className={setTaskClassName(eventList[i].status)}
                        key={eventList[i].date}
                        title={`${eventList[i].title} - ${eventList[i].description}`}
                        onClick={() => handleEventClick(eventList[i])}>
                        {eventList[i].title}
                    </h5>
                )
            }
        }
        daysInMonthCell.push(
            <td key={d + 40} className={className}>
                <div className="day-in-month">
                    {d}
                </div>
                <div>
                    {eventElement}
                </div>
            </td>
        )
    }

    // show date and blank in table
    var totalSlots = [...blanks, ...daysInMonthCell]
    let rows = []
    let cells = []

    totalSlots.forEach((row, i) => {
        // if i != 7 will create new row
        if (i % 7 !== 0) {
            cells.push(row)
        } else {
            // i = 7 => 
            rows.push(cells)
            cells = []
            cells.push(row)
        }
        if (i === totalSlots.length - 1) {
            rows.push(cells)
        }
    })
    // map rows to tr element
    let dayInMonthElements = rows.map((d, i) => {
        return <tr key={i + 100}>{d}</tr>
    })

    return (
        <>
            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        {daysInWeek.map((eachDay, i) => {
                            return (
                                <td key={i + 10}><b>{eachDay}</b></td>
                            )
                        })}
                    </tr>
                </thead>
                <tbody key={40}>
                    {dayInMonthElements}
                </tbody>
            </table>
            {alert}
        </>
    )
}

export { Calender }