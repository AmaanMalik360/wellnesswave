import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    admin: adminReducer
})

export default rootReducer;