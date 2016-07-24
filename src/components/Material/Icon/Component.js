import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Component.css';
import classNames from 'classnames';

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                fill:this.props.style.fill,
                display:'inline-block',
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
        var css = "material-icons md-24"
        try {
            icon = (<i style={{height:'100%', verticalAlign:'middle'}} className={css}>{this.props.component}</i>)//require('material-design-icons/' + this.props.context + '/svg/production/ic_'+this.props.component+'_'+'24px'+'.svg')//icons.svg[this.props.resolution]
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
            <div onClick={this.props.onClick} className={this.props.className} style={{...this.state.style}}>
                {this.getIcon()}
            </div>
        );
    }
}


export default withStyles(s)(Component);
