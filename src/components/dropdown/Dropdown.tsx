import { TWeek } from 'components_fa/commonTypes';

// Components
import {
  MenuItem,
  FormControl as MUIFormControl,
  Select as MUISelect
} from '@mui/material';

import styles from './Dropdown.module.scss';

type TProps = {
  currentValue: number;
  label: string;
  options: TWeek[];
  onChange: (value: number) => void;
};

const Dropdown = ({ currentValue, label, options, onChange }: TProps) => {
  const onDropdownClick = (eventValue: number) => {
    onChange(eventValue);
  };

  return (
    <MUIFormControl
      classes={{ root: styles.formControlRoot }}
      variant="outlined"
      size="small"
    >
      <MUISelect
        classes={{ root: styles.selectRoot }}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={currentValue}
        onChange={(event) => onDropdownClick(event.target.value as number)}
        MenuProps={{
          classes: { paper: styles.dropdownStyle },
          variant: 'menu'
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.num} value={option.num}>
            {option.display}
          </MenuItem>
        ))}
      </MUISelect>
    </MUIFormControl>
  );
};

export default Dropdown;
