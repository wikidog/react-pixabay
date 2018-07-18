import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import * as actions from '../actions';

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

const renderSelectField = ({ label, input, children }) => (
  <FormControl>
    <InputLabel htmlFor={input.name}>{label}</InputLabel>
    <Select {...input} children={children} />
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

  submitForm = values => {
    //
    // this will generate an action
    //
    this.props.fetchImage(values);
  };

  render() {
    const {
      error,
      handleSubmit,
      imageFetching,
      imageError,
      imageResponse,
    } = this.props;

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
          disabled={imageFetching}
        >
          Submit
        </Button>

        <div>
          {imageResponse ? <ImageResults images={imageResponse} /> : null}
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.searchText) {
    errors.searchText = 'Enter search text';
  }

  // console.log('validate errors:', errors);

  return errors;
};

const mapStateToProps = ({ image }) => {
  return {
    imageFetching: image.fetching,
    imageError: image.error,
    imageResponse: image.response,
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actions // see ../actions/index.js
  )(
    reduxForm({
      form: 'searchForm',
      validate,
      initialValues: { amount: 5 },
    })(Search)
  )
);
