import {combineReducers} from 'redux';


import { SET_GAMES } from './actions';
import { ADD_GAME } from './actions';
import { GAME_FETCHED, GAME_UPDATED, GAME_DELETED } from './actions';

function games (state = [], action = {} ){
    switch(action.type) {
        case SET_GAMES:
            return action.games;
        case ADD_GAME:
            return [
            ...state,
            action.game
            ];
        case GAME_DELETED:
            return state.filter(item => item._id !== action.gameId);
            
        case GAME_UPDATED:
          return state.map(item => {
            if(item._id === action.game._id) return action.game;
            return item;
          });
          
        case GAME_FETCHED:
      const index = state.findIndex(item => item._id === action.game._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.game._id) return action.game;
          return item;
        });
      } else {
        return [
          ...state,
          action.game
        ];
      }
        default: return state;
    }
}

export default combineReducers({
    games
});