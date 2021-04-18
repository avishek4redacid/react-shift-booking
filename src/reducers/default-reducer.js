// default reducer
// Note: You can remove this reducer and create your own reducer

import { SET_DATA } from '../actions';


const initialState = {
    data: {},
    items: [],
    location: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            var initialItems = action.payload.map((item, i) => { return { id: i.toString(), name: item.name, type: item.type }; });
            return {
                ...state,
                data: { children: action.payload },
                items: initialItems,
            }
        default:
            return state;
    }


}



