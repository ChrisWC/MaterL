/****************************************************************************
*   Copyright 2016 Christopher W. Catton
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*****************************************************************************/
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
               right:0,
               bottom:0,
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
    static contextTypes = {
        theme: PropTypes.object,
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
            <div role={"layer"} className={this.context.theme.layer.default} style={this.state.style} onClick={this.handleClick}>
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
