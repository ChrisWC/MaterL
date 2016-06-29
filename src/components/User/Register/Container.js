import { connect } from 'react-redux';
import Component from './Component';

const mapStateToProps = (state, ownProps) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
        return {
                    //dispatch(loggedIn(dispatch.username, dispatch.token));
        }
};
const Register = connect(mapStateToProps, mapDispatchToProps)(Component);
export default Register;
