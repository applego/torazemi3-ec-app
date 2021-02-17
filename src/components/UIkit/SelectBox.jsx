import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  formControl: {
    marginBotton: 16,
    minWidth: 128,
    width: '100%',
  },
});

/**
 * @props label
 * @props onChange function
 * @props options {id:,name:}
 * @props required
 * @props value
 */
const SelectBox = (props) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          required={props.required}
          value={props.value}
          onChange={(event) => props.select(event.target.value)}
        >
          {props.options.map((option) => {
            console.log(option.id);
            return (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
export default SelectBox;
