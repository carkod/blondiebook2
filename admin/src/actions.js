/* eslint-disable */
export const SET_GIRLS  = 'SET_GIRLS';
export const ADD_GIRL  = 'ADD_GIRL';
export const GIRL_FETCHED = 'GIRL_FETCHED';
export const GIRL_UPDATED = 'GIRL_UPDATED';
export const GIRL_DELETED = 'GIRL_DELETED';
export const GIRL_PASTED = 'GIRL_PASTED';
export const UPDATE_LIST = 'UPDATE_LIST';

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


export function girlFetched(girl) {
  return {
    type: GIRL_FETCHED,
    girl
  }
}

export function girlDeleted(girlId) {
    return {
        type: GIRL_DELETED,
        girlId
    }
}

export function girlUpdated(girl) {
    return {
        type: GIRL_UPDATED,
        girl
    }
}

export function addGirl(girl) {
    return {
        type: ADD_GIRL,
        girl
    }
}

export function girlPasted(girl) {
    return {
        type: GIRL_PASTED,
        girl
    }
}

export function updateList(girls) {
    return {
        type: UPDATE_LIST,
        girls
    }
}

export function deleteGirl(id) {
    return dispatch => {
        return fetch(`/db/girls/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) 
        .then(handleResponse)
        .then(data => dispatch(girlDeleted(id)));   
    }
}


export function copyGirl(data) {
    return dispatch => {
        return fetch('/db/girls', {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        }).then(handleResponse).then(data => dispatch(girlPasted(data.girl)));
    }
    
}

export function updateGirl(data) {
    return dispatch => {
        return fetch(`/db/girls/${data._id}`, {
           method: 'put',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        }) .then(handleResponse)
        .then(data => dispatch(girlUpdated(data.girl)));   
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
        }).then(handleResponse).then(data => dispatch(addGirl(data.girl)));   
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
 
export function filterGirls(id) {
   return dispatch => {
     fetch(`/db/girls/${id}`)
       .then(res => res.json())
       .then(data => dispatch(girlFiltered(data.girl)));
   }
 }