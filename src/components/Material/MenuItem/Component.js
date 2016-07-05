import React, { PropTypes } from 'react';

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style:{
                backgroundColor:'white',
                position:'relative',
            }
        }
    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.active) {
            this.setState({'style':{...this.state.style, backgroundColor:'grey'}});
        }
        else {
            this.setState({'style':{...this.state.style, backgroundColor:'white'}});
        }
    }
    static propTypes = {
        primaryText:PropTypes.string,
        active:PropTypes.bool,
    };
    render() {
        return(
            <div style={this.state.style} onClick={() => {
                this.props.onClick()
                console.log("TEST MENU BUTTON")
                }}>
                <span style={{position:'relative'}}>{this.props.primaryText}</span>
            </div>
        );
    }
}

export default Component;
