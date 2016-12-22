/**
 * Created by muratguney on 21/12/2016.
 */
import axios from 'axios';
export const fetchDataItems = "FETCH_DATAITEMS";

const API_URL = "http://127.0.0.1:8080/";
export function fetchData(name){
    let data = axios.get(API_URL+name.name);
    return{
        type:fetchDataItems,
        payload:data
    }
}