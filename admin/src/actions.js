/* eslint-disable */
export const SET_GIRLS  = 'SET_GIRLS';
export const ADD_GIRL  = 'ADD_GIRL';
//export const GAME_FETCHED = 'GAME_FETCHED';
//export const GAME_UPDATED = 'GAME_UPDATED';
//export const GAME_DELETED = 'GAME_DELETED';

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function setGirls(girls) {
    return {
        type: SET_GIRLS,
        girls
    }
}


export function addGame(girls) {
    return {
        type: ADD_GAME,
        girls
    }
}

export function girlFetched(girl) {
  return {
    type: GIRL_FETCHED,
    girl
  }
}

export function girlsDeleted(girlsId) {
    return {
        type: GAME_DELETED,
        girlsId
    }
}

export function girlsUpdated(girls) {
    return {
        type: GAME_UPDATED,
        girls
    }
}

export function deleteGame(id) {
    return dispatch => {
        return fetch(`/api/girlss/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) .then(handleResponse)
        .then(data => dispatch(girlsDeleted(id)));   
    }
}

export function updateGame(data) {
    return dispatch => {
        return fetch(`/api/girlss/${data._id}`, {
           method: 'put',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        }) .then(handleResponse).then(data => dispatch(addGame(data.girls)));   
    }
}

export function addGirl(girl) {
    return {
        type: ADD_GIRL,
        girl
    }
}

export function saveGirl(data) {
    return dispatch => {
        return fetch('/db/girls', {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        }).then(console.log(data)).then(handleResponse).then(data => dispatch(addGirl(data.girls)));   
    }
}

export function fetchGirls() {
    return dispatch => {
        fetch('/db/girls')
        .then(res => res.json())
        .then(data => dispatch(setGirls(data.girls)))
    }
}

export function fetchGirl(id) {
   return dispatch => {
     fetch(`/db/girls/${id}`)
       .then(res => res.json())
       .then(data => dispatch(girlFetched(data.girl)));
   }
 }