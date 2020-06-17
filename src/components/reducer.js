import moment from 'moment'

export const initialState = {
  dateObject: moment,
};

export function reducer(state, action) {
    console.log(initialState.dateObject)
    switch (action.type) {
      case 'CHANGE_MONTH':
        return {
          dateObject: action.data
        };
  
  
      default:
        return initialState;
    }
  }