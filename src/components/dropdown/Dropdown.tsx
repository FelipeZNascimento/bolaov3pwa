import { TWeek } from 'components_fa/commonTypes';

// Components
import {
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles.module.scss';

type TProps = {
    currentValue: number;
    label: string,
    options: TWeek[];
    onChange: (value: number) => void;
}

const CustomFormControl = withStyles({
    root: {
        width: '100%',
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#545859"
        }
    }
})(FormControl);

const CustomSelect = withStyles({
    root: {
        color: '#f4b303',
    }
})(Select);


const Dropdown = ({
    currentValue,
    label,
    options,
    onChange
}: TProps) => {
    const onDropdownClick = (event: React.ChangeEvent<{ value: unknown }>) => {
        onChange(event.target.value as number);
    }

    return (
        <CustomFormControl variant="outlined" size="small">
            <CustomSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={currentValue}
                onChange={onDropdownClick}
                MenuProps={{
                    classes: { paper: styles.dropdownStyle },
                    variant: 'menu'
                }}

            >
                {options.map((option) => <MenuItem key={option.num} value={option.num}>{option.display}</MenuItem>)}
            </CustomSelect>
        </CustomFormControl>
    )
};

export default Dropdown;