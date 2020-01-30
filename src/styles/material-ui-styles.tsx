import { makeStyles, createStyles } from '@material-ui/core/styles';
const drawerWidth = 180;
const drawerChildWidth = drawerWidth - 20;

// Color Palettes: https://colorhunt.co/palette/2763
// 222831 393e46 00adb5 eeeeee
let colorFromPalettes1 = '#222831'
let colorFromPalettes2 = '#393e46'
let colorFromPalettes3 = '#00adb5'
let colorFromPalettes4 = '#eeeeee'

// @ts-ignore 
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        backgroundColor: '#1b262c'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
        backgroundColor: '#1b262c'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        // alignContent: 'center',
        // alignItems: 'center',
        // direction: 'column',
        // justify: 'center'
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: colorFromPalettes2,
        color: colorFromPalettes4,
        // alignContent: 'center',
        alignItems: 'center',
        // justify: 'center'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: colorFromPalettes1,
        padding: theme.spacing(3),
        height: 2000
    },
    textField: {
        color: colorFromPalettes4,
        multilineColor: {
            color: 'red'
        },
    },
    drawerButton: {
        width: drawerChildWidth
    }
}));

export default useStyles;