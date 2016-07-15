import React, { PropTypes } from 'react';
import Paper from '../Paper';

const icon_style = {
    border:'none',
    display:'inline-block',
    height:'24px',
    fill:'white',
}

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style:{
                ...context.palette['primary']['primary'],
                color:'white',
                width:'100%',
                height:'64px',
                lineHeight:'24px',
                left:'0px',
                top:'0px',
                paddingLeft:'0px',
                paddingRight:'0px',
                display:'block',
                position:'absolute',
            },
            title_style: {
                display:'inline-block',
                margin:'0px',
                padding:'0px',
                border:'none',
                color:'white',
                paddingLeft:this.props.icon? '0px':'24px',
                height:'64px',
                lineHeight:'64px',
                fontSize:'24px',
                float:'left'
            }
        }

        if (this.props.handleResize) {
            this.props.handleResize('top', '64px', this);
        }
    }
    static propTypes = {
        role:PropTypes.string.isRequired,
        title:PropTypes.string,
        icon:PropTypes.element,
    };
    static defaultProps = {
        role:"appbar"
    }
    static contextTypes = {
        palette: React.PropTypes.object
    }
    static childContextTypes = {
        backgroundColor: React.PropTypes.object,
        contextName:React.PropTypes.string
    }
    getChildContext = () => {
        return {backgroundColor:this.context.palette['primary'], contextName:'appbar'}
    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.handleResize) {
            //newProps.handleResize('top', this.state.style.height, this)
        }
    }
    render() {
        return(
            <Paper style={this.state.style} depth={4} {...this.props} {...this.defaultProps}>
                <span style={{float:'left'}}>
                {this.props.icon? React.cloneElement(this.props.icon, {...this.props.icon.props, contextName:'appbar'}):null}
                </span>
                <span style={this.state.title_style}>{this.props.title}</span>
                <div style={{position:'relative', paddingRight:'8px', float:'right', paddingTop:'4px', paddingBottom:'4px', display:'block', lineHeight:'48px', height:'48px'}}>
                    {this.props.right }
                </div>
            </Paper>
        );
    }
}


export default Component;
