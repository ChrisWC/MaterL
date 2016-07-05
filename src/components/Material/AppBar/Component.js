import React, { PropTypes } from 'react';
import Paper from '../Paper';

const icon_style = {
    border:'none',
    display:'inline-block',
    height:'24px',
    margin:'8px 8px',
    padding:'12px',
    fill:'white',
    'float':'left'
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style:{
                ...context.palette['primary']['900'],
                color:'white',
                width:'100%',
                height:'64px',
                left:'0px',
                top:'0px',
                paddingLeft:'8px',
                paddingRight:'0px',
                display:'block',
                position:'absolute'
            },
            title_style: {
                display:'inline-block',
                margin:'0px',
                padding:'0px',
                border:'none',
                color:'white',
                paddingLeft:'8px',
                height:'24px',
                lineHeight:'64px',
                fontSize:'24px',
                float:'left',
                verticalAlign:'middle',
                position:'relative',
            }
        }

        if (this.props.handleResize) {
            this.props.handleResize('top', '64px', this);
        }
    }
    static propTypes = {
        role:PropTypes.string.isRequired
    };
    static defaultProps = {
        role:"appbar"
    }
    static contextTypes = {
        palette: React.PropTypes.object
    } 
    componentWillReceiveProps = (newProps) => {
        if (newProps.handleResize) {
            //newProps.handleResize('top', this.state.style.height, this)
        }
    }
    render() {
        return(
            <Paper style={this.state.style} depth={4} {...this.props} {...this.defaultProps}>
                <div style={{position:'relative', float:'left', paddingTop:'4px', paddingBottom:'4px', display:'inline-block', lineHeight:'48px', height:'48px'}}>
                    {React.cloneElement(this.props.icon, {style:icon_style, ...this.props.icon.props})}
                </div>
                {this.props.left}
                <div style={this.state.title_style}><span><strong>Title</strong></span></div>
                <div style={{position:'relative', paddingRight:'8px', float:'right', paddingTop:'4px', paddingBottom:'4px', display:'block', lineHeight:'48px', height:'48px'}}>
                    {this.props.right }
                </div>
            </Paper>
        );
    }
}


export default Component;
