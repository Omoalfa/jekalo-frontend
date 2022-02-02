import { combineReducers } from "redux";
import list from "./list";
import create from './create';
import deletes from './deletes'

const root = combineReducers({
    list,
    create,
    deletes
})

export default root;
