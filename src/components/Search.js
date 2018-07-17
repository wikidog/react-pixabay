import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import axios from 'axios';

import ImageResults from './ImageResults';

const styles = theme => ({});

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <FormControl fullWidth error={touched && error ? true : false}>
    <InputLabel htmlFor={input.name}>{label}</InputLabel>
    <Input id={input.name} {...input} {...custom} />
    <FormHelperText id={`${input.name}-text`}>
      {touched ? error : ''}
    </FormHelperText>
  </FormControl>
);
const renderSelectField = ({ label, input: { name, ...rest }, children }) => (
  <FormControl>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Select {...rest} children={children} />
  </FormControl>
);

class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '8783992-06499d83b0b376f06affd8505',
    images: [],
  };

  // with this syntax, React will bound 'this' automatically to the method
  handleChangeSearch = e => {
    const val = e.target.value;

    this.setState({ searchText: val }, () => {
      if (!val) {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&$image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(e => console.log(e));
      }
    });
  };

  handleChangeAmount = e => {
    this.setState({ amount: e.target.value });
  };

  submitForm = values => {};

  render() {
    const { error, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        <div>
          <Field
            name="searchText"
            component={renderTextField}
            label="Search Image *"
          />
        </div>

        <div>
          <Field name="amount" component={renderSelectField} label="Amount">
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Field>
        </div>

        <div />
        <Button
          variant="raised"
          color="primary"
          type="submit"
          // disabled={submitting}
        >
          Submit
        </Button>

        <div>
          {this.state.images ? (
            <ImageResults images={this.state.images} />
          ) : null}
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.searchText) {
    errors.searchText = 'Enter search text';
  }

  // console.log('validate errors:', errors);

  return errors;
}

export default withStyles(styles)(
  reduxForm({
    form: 'searchForm',
    validate,
    initialValues: { amount: 5 },
  })(Search)
);
