import moment from 'moment'

export let initialState = {
  dateObject: moment()
}

export function reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_MONTH':
        return {
          dateObject: moment(action.data.dateObject).set("month", action.data.monthNo)
        } 
        case 'PREV_MONTH':
          return {
            dateObject: action.data.dateObject
          } 
        case 'NEXT_MONTH':
          return {
            dateObject: action.data.dateObject
          }
          case 'TODAY':
            return {
              dateObject: moment(initialState.dateObject).set("year", moment().format("YYYY")).set("month", moment().format("MMMM"))
            }
      default:
        throw new Error()
    }
  }