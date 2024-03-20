import { combineReducers } from "redux";
import authReducer from "./authReducer";
// import ticketsReducers from "./ticketReducer";
// import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    // tickets: ticketsReducers,
    // admin: adminReducer
})

export default rootReducer;