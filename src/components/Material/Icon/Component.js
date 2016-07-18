import React, { PropTypes } from 'react';
import s from './Component.css';

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                fill:this.props.style.fill,
                ...this.props.style,
            },
            clientActive:false,
        }
    }
    static propTypes = {
        resolution:PropTypes.string,
        context:PropTypes.string,
        component:PropTypes.string,
        style:PropTypes.object,
    };
    static defaultProps = {
        resolution:'24px',
        style:{
            fill:'black',
        }
    };
    getIcon = () => {
        var icon = null;
        try {
            icon = require('!raw!material-design-icons/' + this.props.context + '/svg/production/ic_'+this.props.component+'_'+'24px'+'.svg')//icons.svg[this.props.resolution]
        }
        catch (e) {
            console.log(e)
        }
        return icon;
    }
    componentDidMount = () => {
    }
    render() {
        return (
            <div onClick={this.props.onClick} className={this.props.className} style={{...this.state.style}}  dangerouslySetInnerHTML={{__html:this.getIcon()}}/>
        );
    }
}


export default Component;
