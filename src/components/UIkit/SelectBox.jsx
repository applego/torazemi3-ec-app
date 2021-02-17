import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * @props helpertext
 * @props id
 * @props label
 * @props name
 * @props onChange function
 * @props options
 * @props value
 */
const SelectBox = (props) => {
  const classes = useStyles();
  // const [state, setState] = React.useState({
  //   age: '',
  //   name: 'hai',
  // });

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
  const name = props.name;
  const id = props.id;
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='age-native-helper'>{props.label}</InputLabel>
        <NativeSelect
          value={props.value}
          onChange={props.onChange}
          inputProps={{
            name: name,
            id: id,
          }}
        >
          <option aria-label='None' value='' />
          {props.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </NativeSelect>
        <FormHelperText>{props.helpertext}</FormHelperText>
      </FormControl>
    </div>
  );
};
export default SelectBox;
