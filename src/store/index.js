import { createStore, combineReducers } from "redux";
import { tasksReducer } from "./tasksReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer
})

export const store = createStore(rootReducer)