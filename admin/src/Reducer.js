import {combineReducers} from 'redux';
import { SET_GIRLS, ADD_GIRL, GIRL_FETCHED, GIRL_UPDATED, GIRL_DELETED, GIRL_PASTED } from './actions';

function girls (state = [], action = {} ){
    switch(action.type) {
        case SET_GIRLS:
            return action.girls;
        case ADD_GIRL:
            return [
            ...state,
            action.girl
            ];
        case GIRL_DELETED:
            return state.filter(item => item._id !== action.girlId);
            
        case GIRL_PASTED:
              return [
            ...state,
            action.girl]
            
        case GIRL_UPDATED:
          return state.map(item => {
            if(item._id === action.girl._id) return action.girl;
            return item;
          });
          
        case GIRL_FETCHED:
      const index = state.findIndex(item => item._id === action.girl._id);
      
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.girl._id) return action.girl;
          return item;
        });
      } else {
        return [
          ...state,
          action.girl
        ];
      }
        default: return state;
    }
}

export default combineReducers({
    girls
});