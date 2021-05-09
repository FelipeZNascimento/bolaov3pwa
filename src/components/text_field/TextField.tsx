import { withStyles } from '@material-ui/core/styles';
import {
    TextField as MUITextField,
} from '@material-ui/core';

const CustomTextField = withStyles({
    root: {
        marginTop: '8px',
        marginRight: '0px',
        marginBottom: '8px',
        marginLeft: '0px',
        '& label': {
            color: 'lightgrey',
        },
        '& label.Mui-focused': {
            color: 'grey',
        },
        '& .MuiOutlinedInput-root': {
            '& input': {
                color: 'white'
            },
            '& fieldset': {
                borderColor: 'grey',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
})(MUITextField);

const TextField = (props: any) => {
    return (
        <CustomTextField {...props}/>
    )
};

export default TextField;
