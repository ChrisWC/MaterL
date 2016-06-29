import { combineReducers } from 'redux';
import navigation from './Navigation';
import user from '../components/User/Reducer'
const personalApp = combineReducers({
    navigation,
    user,
})

export default personalApp;
