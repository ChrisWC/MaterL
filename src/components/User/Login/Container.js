import { connect } from 'react-redux';
import Component from './Component';

const mapStateToProps = (state, ownProps) => {
    if (state.user === undefined) {
        return {}
    }
    return {
        user:{
            username:state.user.username,
        }
    }
};

const mapDispatchToProps = (dispatch) => {
        return {
            login: (username, password) => {

            }
        }
};
const Login = connect(mapStateToProps, mapDispatchToProps)(Component);
export default Login;
