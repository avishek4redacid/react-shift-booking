export const SET_DATA = 'fetch_data';

// default function to display redux action format
export function setData(data) {
    // action object format being return to a reducer
    return {
        type: SET_DATA,
        payload: data
    }
}
