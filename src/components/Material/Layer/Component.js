import React, { PropTypes } from 'react';

/**********
 * Simple Container that blocks all elements on screen besides its own
 * children. Will send click events to children if clicked.
 *
 **********/

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           style:{
               width:'100%',
               height:'100%',
               padding:'0px',
               display:'inline-block',
               position:'fixed',
               top:0,
               left:0,
            },
            open:this.props.open,
            clicked:false,
            openElements:0
        }
    }
    static propTypes = {
        showShadows: PropTypes.bool,
        fullscreen: PropTypes.bool,
        width: PropTypes.string,
        foreground: PropTypes.array.isRequired,
        backgroundColor: PropTypes.string,
        open:PropTypes.bool.isRequired,
    }
    static defaultProps = { 
        foreground:new Array(),
        showShadows:true,
        fullscreen:false,
        sheets:[],
        open:false
    }
    handleClick = () => {
        this.setState({clicked:true})
    }
    handleElementClosure = () => {
        if (openElements == 1) {
            this.setState({open:false, openElements:0})
        }
        else {
            this.setState({openElements:(this.state.openElements-1)})
        }
    }
    render() {
        return(
            <div role={"layer"} style={this.state.style} onClick={this.handleClick}>
                {React.Children.map(this.props.foreground, (val, key, arr) => {
                    return React.cloneElement(val, {key:key, 
                        onRequestClose:() => {
                            val.props.onRequestClose();
                            this.handleElementClosure();
                        },
                        externalClick:this.state.clicked, ...val.props})  
                })}
            </div>
        );
    }
}


export default Component;
