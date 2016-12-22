/**
 * Created by muratguney on 21/12/2016.
 */
import {fetchDataItems} from './actions'

export default function (state = {}, action) {
    switch (action.type) {
        case fetchDataItems:
            return Object.assign({}, state, {data: action.payload.data});
    }
    return state;
}