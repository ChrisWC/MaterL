/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Paper from '../Paper'

const icon_style = {
    border:'none',
    display:'inline-block',
    height:'24px',
    margin:'8px 8px',
    padding:'12px',
    fill:'white',
    'float':'left'
}
const colors = {
    'red':{
        '50':{
            backgroundColor:'#FFEBEE',
            color:'black',
        },
        '100':{
            backgroundColor:'#FFCDD2',
            color:'black',
        },
        '200':{
            backgroundColor:'#EF9A9A',
            color:'black',
        },
        '300':{
            backgroundColor:'#E57373',
            color:'black',
        },
        '400':{
            backgroundColor:'#EF5350',
            color:'black',
        },
        '500':{
            backgroundColor:'#F44336',
            color:'black',
        },
        '600':{
            backgroundColor:'#E53935',
            color:'black',
        },
        '700':{
            backgroundColor:'#D32F2F',
            color:'black',
        },
        '800':{
            backgroundColor:'#C62828',
            color:'black',
        },
        '900':{
            backgroundColor:'#B71C1C',
            color:'black',
        },
        'a100':{
            backgroundColor:'#FF8A80',
            color:'black',
        },
        'a200':{
            backgroundColor:'#FF5252',
            color:'black',
        },
        'a400':{
            backgroundColor:'#FF1744',
            color:'black',
        },
        'a700':{
            backgroundColor:'#D50000',
            color:'black',
        }
    },
    'pink':{
        '50':{
            backgroundColor:'#FCE4EC',
            color:'black',
        },
        '100':{
            backgroundColor:'#F8BBD0',
            color:'black',
        },
        '200':{
            backgroundColor:'#F48FB1',
            color:'black',
        },
        '300':{
            backgroundColor:'#F06292',
            color:'black',
        },
        '400':{
            backgroundColor:'#EC407A',
            color:'black',
        },
        '500':{
            backgroundColor:'#E91E63',
            color:'black',
        },
        '600':{
            backgroundColor:'#D81B60',
            color:'black',
        },
        '700':{
            backgroundColor:'#C2185B',
            color:'black',
        },
        '800':{
            backgroundColor:'#AD1457',
            color:'black',
        },
        '900':{
            backgroundColor:'#880E4F',
            color:'black',
        },
        'a100':{
            backgroundColor:'#FF80AB',
            color:'black',
        },
        'a200':{
            backgroundColor:'#FF4081',
            color:'black',
        },
        'a400':{
            backgroundColor:'#F50057',
            color:'black',
        },
        'a700':{
            backgroundColor:'#C51162',
            color:'black',
        }
    },
    'purple':{
        '50':{
            backgroundColor:'#F3E5F5',
            color:'black',
        },
        '100':{
            backgroundColor:'#E1BEE7',
            color:'black',
        },
        '200':{
            backgroundColor:'#CE93D8',
            color:'black',
        },
        '300':{
            backgroundColor:'#BA68C8',
            color:'black',
        },
        '400':{
            backgroundColor:'#AB47BC',
            color:'black',
        },
        '500':{
            backgroundColor:'#9C27B0',
            color:'black',
        },
        '600':{
            backgroundColor:'#8E24AA',
            color:'black',
        },
        '700':{
            backgroundColor:'#7B1FA2',
            color:'black',
        },
        '800':{
            backgroundColor:'#6A1B9A',
            color:'black',
        },
        '900':{
            backgroundColor:'#4A148C',
            color:'black',
        },
        'a100':{
            backgroundColor:'#E480FC',
            color:'black',
        },
        'a200':{
            backgroundColor:'#E040FB',
            color:'black',
        },
        'a400':{
            backgroundColor:'#D500F9',
            color:'black',
        },
        'a700':{
            backgroundColor:'#AA00FF',
            color:'black',
        }
    },
    'deepPurple':{
        '50':{
            backgroundColor:'#EDE7F6',
            color:'black',
        },
        '100':{
            backgroundColor:'#D1C4E9',
            color:'black',
        },
        '200':{
            backgroundColor:'#B39DDB',
            color:'black',
        },
        '300':{
            backgroundColor:'#9575CD',
            color:'black',
        },
        '400':{
            backgroundColor:'#7E57C2',
            color:'black',
        },
        '500':{
            backgroundColor:'#673AB7',
            color:'black',
        },
        '600':{
            backgroundColor:'#5E35B1',
            color:'black',
        },
        '700':{
            backgroundColor:'#512DA8',
            color:'black',
        },
        '800':{
            backgroundColor:'#4527A0',
            color:'black',
        },
        '900':{
            backgroundColor:'#311B92',
            color:'black',
        },
        'a100':{
            backgroundColor:'#B388FF',
            color:'black',
        },
        'a200':{
            backgroundColor:'#7C4DFF',
            color:'black',
        },
        'a400':{
            backgroundColor:'#651FFF',
            color:'black',
        },
        'a700':{
            backgroundColor:'#6200EA',
            color:'black',
        }
    },
    'indigo':{
       '50':{
            backgroundColor:'#E8EAF6',
            color:'black',
       },
       '100':{
            backgroundColor:'#C5CAE9',
            color:'black',
       },
       '200':{
            backgroundColor:'#9FA8DA',
            color:'black',
       },
       '300':{
            backgroundColor:'#7986CB',
            color:'black',
       },
       '400':{
            backgroundColor:'#5C6BC0',
            color:'black',
       },
       '500':{
            backgroundColor:'#3F51B5',
            color:'black',
       },
       '600':{
            backgroundColor:'#3949AB',
            color:'black',
       },
       '700':{
            backgroundColor:'#303F9F',
            color:'black',
       },
       '800':{
            backgroundColor:'#283593',
            color:'black',
       },
       '900':{
            backgroundColor:'#1A237E',
            color:'black',
       },
       'a100':{
            backgroundColor:'#8C9EFF',
            color:'black',
       },
       'a200':{
            backgroundColor:'#536DFE',  
            color:'black',
       },
       'a400':{
            backgroundColor:'#3D5AFE',
            color:'black',
       },
       'a700':{
            backgroundColor:'#304FFE',
            color:'black',
       },
    },
    'blue':{
        '50':{
            backgroundColor:'#E3F2FD',
            color:'black',
        },
        '100':{
            backgroundColor:'#BBDEFB',
            color:'black',
        },
        '200':{
            backgroundColor:'#90CAF9',
            color:'black',
        },
        '300':{
            backgroundColor:'#64B5F6',
            color:'black',
        },
        '400':{
            backgroundColor:'#42A5F5',
            color:'black',
        },
        '500':{
            backgroundColor:'#2196F3',
            color:'white',
        },
        '600':{
            backgroundColor:'#1E88E5',
            color:'white',
        },
        '700':{
            backgroundColor:'#1976D2',
            color:'white',
        },
        '800':{
            backgroundColor:'#1565C0',
            color:'white',
        },
        '900':{
            backgroundColor:'#0D47A1',
            color:'white',
        },
        'a100':{
            backgroundColor:'#82B1FF',
            color:'black',
        },
        'a200':{
            backgroundColor:'#448AFF',
            color:'white',
        },
        'a400':{
            backgroundColor:'#2979FF',
            color:'white',
        },
        'a700':{
            backgroundColor:'#2962FF',
            color:'white',
        },
    },
    'lightBlue':{
        '50':{
            backgroundColor:'#E1F5FE',
            color:'black',
        },
        '100':{
            backgroundColor:'#B3E5FC',
            color:'black',
        },
        '200':{
            backgroundColor:'#81D4FA',
            color:'black',
        },
        '300':{
            backgroundColor:'#4FC3F7',
            color:'black',
        },
        '400':{
            backgroundColor:'#29B6F6',
            color:'black',
        },
        '500':{
            backgroundColor:'#03A9F4',
            color:'black',
        },
        '600':{
            backgroundColor:'#039BE5',
            color:'white',
        },
        '700':{
            backgroundColor:'#0288D1',
            color:'white',
        },
        '800':{
            backgroundColor:'#0277BD',
            color:'white',
        },
        '900':{
            backgroundColor:'#01579B',
            color:'white',
        },
        'a100':{
            backgroundColor:'#80D8FF',
            color:'black',
        },
        'a200':{
            backgroundColor:'#40C4FF',
            color:'black',
        },
        'a400':{
            backgroundColor:'#00B0FF',
            color:'black',
        },
        'a700':{
            backgroundColor:'#0091EA',
            color:'white',
        },
    },
    'cyan':{
        '50':{
            backgroundColor:'#E0F7FA',
            color:'black',
        },
        '100':{
            backgroundColor:'#B2EBF2',
            color:'black',
        },
        '200':{
            backgroundColor:'#80DEEA',
            color:'black',
        },
        '300':{
            backgroundColor:'#4DD0E1',
            color:'black',
        },
        '400':{
            backgroundColor:'#26C6DA',
            color:'black',
        },
        '500':{
            backgroundColor:'#00BCD4',
            color:'black',
        },
        '600':{
            backgroundColor:'#00ACC1',
            color:'black',
        },
        '700':{
            backgroundColor:'#0097A7',
            color:'black',
        },
        '800':{
            backgroundColor:'#00838F',
            color:'black',
        },
        '900':{
            backgroundColor:'#006064',
            color:'black',
        },
        'a100':{
            backgroundColor:'#84FFFF',
            color:'black',
        },
        'a200':{
            backgroundColor:'#18FFFF',
            color:'black',
        },
        'a400':{
            backgroundColor:'#00E5FF',
            color:'black',
        },
        'a700':{
            backgroundColor:'#00B8D4',
            color:'black',
        },
    },
    'teal':{
        '50':{
            backgroundColor:'#E0F2F1',
            color:'black',
        },
        '100':{
            backgroundColor:'#B2DFDB',
            color:'black',
        },
        '200':{
            backgroundColor:'#80CBC4',
            color:'black',
        },
        '300':{
            backgroundColor:'#4DB6AC',
            color:'black',
        },
        '400':{
            backgroundColor:'#26A69A',
            color:'black',
        },
        '500':{
            backgroundColor:'#009688',
            color:'black',
        },
        '600':{
            backgroundColor:'#00897B',
            color:'black',
        },
        '700':{
            backgroundColor:'#00796B',
            color:'black',
        },
        '800':{
            backgroundColor:'#00695C',
            color:'black',
        },
        '900':{
            backgroundColor:'#004D40',
            color:'black',
        },
        'a100':{
            backgroundColor:'#A7FFEB',
            color:'black',
        },
        'a200':{
            backgroundColor:'#64FFDA',
            color:'black',
        },
        'a400':{
            backgroundColor:'#1DE9B6',
            color:'black',
        },
        'a700':{
            backgroundColor:'#00BFA5',
            color:'black',
        },
    },
    'green':{
        '50':{
            backgroundColor:'#E8F5E9',
            color:'black',
        },
        '100':{
            backgroundColor:'#C8E6C9',
            color:'black',
        },
        '200':{
            backgroundColor:'#A5D6A7',
            color:'black',
        },
        '300':{
            backgroundColor:'#81C784',
            color:'black',
        },
        '400':{
            backgroundColor:'#66BB6A',
            color:'black',
        },
        '500':{
            backgroundColor:'#4CAF50',
            color:'black',
        },
        '600':{
            backgroundColor:'#43A047',
            color:'black',
        },
        '700':{
            backgroundColor:'#388E3C',
            color:'black',
        },
        '800':{
            backgroundColor:'#2E7D32',
            color:'black',
        },
        '900':{
            backgroundColor:'#1B5E20',
            color:'black',
        },
        'a100':{
            backgroundColor:'#B9F6CA',
            color:'black',
        },
        'a200':{
            backgroundColor:'#69F0AE',
            color:'black',
        },
        'a400':{
            backgroundColor:'#00E676',
            color:'black',
        },
        'a700':{
            backgroundColor:'#00C853',
            color:'black',
        },
    },
    'lightGreen':{
        '50':{
            backgroundColor:'#F1F8E9',
            color:'black',
        },
        '100':{
            backgroundColor:'#DCEDC8',
            color:'black',
        },
        '200':{
            backgroundColor:'#C5E1A5',
            color:'black',
        },
        '300':{
            backgroundColor:'#AED581',
            color:'black',
        },
        '400':{
            backgroundColor:'#9CCC65',
            color:'black',
        },
        '500':{
            backgroundColor:'#8BC34A',
            color:'black',
        },
        '600':{
            backgroundColor:'#7CB342',
            color:'black',
        },
        '700':{
            backgroundColor:'#689F38',
            color:'black',
        },
        '800':{
            backgroundColor:'#558B2F',
            color:'black',
        },
        '900':{
            backgroundColor:'#33691E',
            color:'black',
        },
        'a100':{
            backgroundColor:'#CCFF90',
            color:'black',
        },
        'a200':{
            backgroundColor:'#B2FF59',
            color:'black',
        },
        'a400':{
            backgroundColor:'#76FF03',
            color:'black',
        },
        'a700':{
            backgroundColor:'#64DD17',
            color:'black',
        },
    },
    'lime':{
        '50':{
            backgroundColor:'#F9FBE7',
            color:'black',
        },
        '100':{
            backgroundColor:'#F0F4C3',
            color:'black',
        },
        '200':{
            backgroundColor:'#E6EE9C',
            color:'black',
        },
        '300':{
            backgroundColor:'#DCE775',
            color:'black',
        },
        '400':{
            backgroundColor:'#D4E157',
            color:'black',
        },
        '500':{
            backgroundColor:'#CDDC39',
            color:'black',
        },
        '600':{
            backgroundColor:'#C0CA33',
            color:'black',
        },
        '700':{
            backgroundColor:'#AFB42B',
            color:'black',
        },
        '800':{
            backgroundColor:'#9E9D24',
            color:'black',
        },
        '900':{
            backgroundColor:'#827717',
            color:'black',
        },
        'a100':{
            backgroundColor:'#F4FF81',
            color:'black',
        },
        'a200':{
            backgroundColor:'#EEFF41',
            color:'black',
        },
        'a400':{
            backgroundColor:'#C6FF00',
            color:'black',
        },
        'a700':{
            backgroundColor:'#AEEA00',
            color:'black',
        },
    },
    'yellow':{
        '50':{
            backgroundColor:'#FFFDE7',
            color:'black',
        },
        '100':{
            backgroundColor:'#FFF9C4',
            color:'black',
        },
        '200':{
            backgroundColor:'#FFF59D',
            color:'black',
        },
        '300':{
            backgroundColor:'#FFF176',
            color:'black',
        },
        '400':{
            backgroundColor:'#FFEE58',
            color:'black',
        },
        '500':{
            backgroundColor:'#FFEB3B',
            color:'black',
        },
        '600':{
            backgroundColor:'#FDD835',
            color:'black',
        },
        '700':{
            backgroundColor:'#FBC02D',
            color:'black',
        },
        '800':{
            backgroundColor:'#F9A825',
            color:'black',
        },
        '900':{
            backgroundColor:'#F57F17',
            color:'black',
        },
        'a100':{
            backgroundColor:'#FFFF8D',
            color:'black',
        },
        'a200':{
            backgroundColor:'#FFFF00',
            color:'black',
        },
        'a400':{
            backgroundColor:'#FFEA00',
            color:'black',
        },
        'a700':{
            backgroundColor:'#FFD600',
            color:'black',
        },
    },
    'amber':{
        '50':{
            backgroundColor:'#FFF8E1',
            color:'black',
        },
        '100':{
            backgroundColor:'#FFECB3',
            color:'black',
        },
        '200':{
            backgroundColor:'#FFE082',
            color:'black',
        },
        '300':{
            backgroundColor:'#FFD54F',
            color:'black',
        },
        '400':{
            backgroundColor:'#FFCA28',
            color:'black',
        },
        '500':{
            backgroundColor:'#FFC107',
            color:'black',
        },
        '600':{
            backgroundColor:'#FFB300',
            color:'black',
        },
        '700':{
            backgroundColor:'#FFA000',
            color:'black',
        },
        '800':{
            backgroundColor:'#FF8F00',
            color:'black',
        },
        '900':{
            backgroundColor:'#FF6F00',
            color:'black',
        },
        'a100':{
            backgroundColor:'#FFE57F',
            color:'black',
        },
        'a200':{
            backgroundColor:'#FFD740',
            color:'black',
        },
        'a400':{
            backgroundColor:'#FFC400',
            color:'black',
        },
        'a700':{
            backgroundColor:'#FFAB00',
            color:'black',
        },
    },
    'orange':{
        '50':{
            backgroundColor:'#FFF3E0',
            color:'black',
        },
        '100':{
            backgroundColor:'#FFE0B2',
            color:'black',
        },
        '200':{
            backgroundColor:'#FFCC80',
            color:'black',
        },
        '300':{
            backgroundColor:'#FFB74D',
            color:'black',
        },
        '400':{
            backgroundColor:'#FFA726',
            color:'black',
        },
        '500':{
            backgroundColor:'#FF9800',
            color:'black',
        },
        '600':{
            backgroundColor:'#FB8C00',
            color:'black',
        },
        '700':{
            backgroundColor:'#F57C00',
            color:'black',
        },
        '800':{
            backgroundColor:'#EF6C00',
            color:'black',
        },
        '900':{
            backgroundColor:'#E65100',
            color:'black',
        },
        'a100':{
            backgroundColor:'#FFD180',
            color:'black',
        },
        'a200':{
            backgroundColor:'#FFAB40',
            color:'black',
        },
        'a400':{
            backgroundColor:'#FF9100',
            color:'black',
        },
        'a700':{
            backgroundColor:'#FF6D00',
            color:'black',
        },
    },
    'deepOrange':{
        '50':{
            backgroundColor:'#FBE9E7',
            color:'black',
        },
        '100':{
            backgroundColor:'#FFCCBC',
            color:'black',
        },
        '200':{
            backgroundColor:'#FFAB91',
            color:'black',
        },
        '300':{
            backgroundColor:'#FF8A65',
            color:'black',
        },
        '400':{
            backgroundColor:'#FF7043',
            color:'black',
        },
        '500':{
            backgroundColor:'#FF6722',
            color:'black',
        },
        '600':{
            backgroundColor:'#F4511E',
            color:'black',
        },
        '700':{
            backgroundColor:'#E64A19',
            color:'black',
        },
        '800':{
            backgroundColor:'#D84315',
            color:'black',
        },
        '900':{
            backgroundColor:'#BF360C',
            color:'black',
        },
        'a100':{
            backgroundColor:'#FF9E80',
            color:'black',
        },
        'a200':{
            backgroundColor:'#FF6E40',
            color:'black',
        },
        'a400':{
            backgroundColor:'#FF3D00',
            color:'black',
        },
        'a700':{
            backgroundColor:'#DD2C00',
            color:'black',
        },
    },
    'brown':{
        '50':{
            backgroundColor:'#EFEBE9',
            color:'black',
        },
        '100':{
            backgroundColor:'#D7CCC8',
            color:'black',
        },
        '200':{
            backgroundColor:'#BCAAA4',
            color:'black',
        },
        '300':{
            backgroundColor:'#A1887F',
            color:'black',
        },
        '400':{
            backgroundColor:'#8D6E63',
            color:'black',
        },
        '500':{
            backgroundColor:'#795548',
            color:'black',
        },
        '600':{
            backgroundColor:'#6D4C41',
            color:'black',
        },
        '700':{
            backgroundColor:'#5D4037',
            color:'black',
        },
        '800':{
            backgroundColor:'#4E342E',
            color:'black',
        },
        '900':{
            backgroundColor:'#3E2723',
            color:'black',
        },
    },
    'grey':{
        '50':{
            backgroundColor:'#FAFAFA',
            color:'black',
        },
        '100':{
            backgroundColor:'#F5F5F5',
            color:'black',
        },
        '200':{
            backgroundColor:'#EEEEEE',
            color:'black',
        },
        '300':{
            backgroundColor:'#E0E0E0',
            color:'black',
        },
        '400':{
            backgroundColor:'#BDBDBD',
            color:'black',
        },
        '500':{
            backgroundColor:'#9E9E9E',
            color:'black',
        },
        '600':{
            backgroundColor:'#757575',
            color:'white',
        },
        '700':{
            backgroundColor:'#616161',
            color:'white',
        },
        '800':{
            backgroundColor:'#424242',
            color:'white',
        },
        '900':{
            backgroundColor:'#212121',
            color:'white',
        },
    },
    'blueGrey':{
        '50':{
            backgroundColor:'#ECEFF1',
            color:'black',
        },
        '100':{
            backgroundColor:'#CFD8DC',
            color:'black',
        },
        '200':{
            backgroundColor:'#B0BEC5',
            color:'black',
        },
        '300':{
            backgroundColor:'#90A4AE',
            color:'black',
        },
        '400':{
            backgroundColor:'#78909C',
            color:'black',
        },
        '500':{
            backgroundColor:'#607D8B',
            color:'black',
        },
        '600':{
            backgroundColor:'#546E7A',
            color:'black',
        },
        '700':{
            backgroundColor:'#455A64',
            color:'black',
        },
        '800':{
            backgroundColor:'#37474F',
            color:'black',
        },
        '900':{
            backgroundColor:'#263238',
            color:'black',
        },
    },
    'black':{
        '500':{
            backgroundColor:'#000000',
            color:'white',
        },
    },
    'white':{
        '500':{
            backgroundColor:'#FFFFFF',
            color:'black',
        },
    }
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style:{
                backgroundColor:colors.white["500"],
                color:colors.black["500"],
                width:'360px',
                paddingLeft:'0px',
                paddingRight:'0px',
                display:'inline-block',
                position:'relative',
            },
            swatch_style:{
                width:'330px',
                height:'16px',
                display:'block',
                paddingLeft:'15px',
                paddingRight:'15px',
                paddingTop:'15px',
                paddingBottom:'15px',
            }
        }
    }
    static propTypes = {
        role:PropTypes.string.isRequired,
        color:PropTypes.string,
        primary:PropTypes.string,
        secondary:PropTypes.string,
        default:PropTypes.string
    };
    static defaultProps = {
        role:"palatte",
        priority:"primary",
        color:'blue',
        primary:'500',
        secondary:'700',
        default:'800'
    }
    static contextTypes = {
        palette: React.PropTypes.object
    }
    static childContextTypes = {
        palette: React.PropTypes.object
    }

    getChildContext = () => {
        return {
            palette:{
                ...this.context.palette,
                [this.props.priority]:{
                    primary:{...colors[this.props.color][this.props.primary], fill:colors[this.props.color][this.props.primary].color},
                    secondary:{...colors[this.props.color][this.props.secondary], fill:colors[this.props.color][this.props.primary].color},
                    default:{...colors[this.props.color][this.props.default], fill:colors[this.props.color][this.props.primary].color}
                }
            }
        }
    }
    render() {
        return(
            <div>
                {React.Children.map(this.props.children, (val, key, arr)=>{
                    return React.cloneElement(val, {key:key, ...val.props})
                })}
            </div>
        );
    }
}


export default Component;
