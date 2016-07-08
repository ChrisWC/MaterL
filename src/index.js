
import public_content from './public'

//console.log(require.context)
var publicContent = require.context('./public', true, /^\/\/.*\.ttf$/)
publicContent = publicContent.keys().map(publicContent);
export {AppBar, Button, Theme, Palette, Menu, Drawer, Paper, Icon} from  './components';

