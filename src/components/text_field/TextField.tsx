import { TextField as MUITextField } from '@mui/material';
import styles from './TextField.module.scss';

const TextField = (props: any) => {
  return (
    <MUITextField
      {...props}
      className={styles.textField}
      InputProps={{
        classes: {
          root: styles.inputRoot,
          focused: styles.inputRootFocused
        }
      }}
      InputLabelProps={{
        classes: {
          root: styles.labelRoot,
          filled: styles.labelRootFilled,
          focused: styles.labelRootFilled,
        }
      }}
    />
  );
};

export default TextField;
