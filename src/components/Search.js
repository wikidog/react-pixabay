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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as actions from '../actions';

import ImageResults from './ImageResults';

// const styles = theme => ({});

const styles = theme => ({
  root: {
    // display: 'flex',
    margin: theme.spacing.unit,
    position: 'relative',
    overflow: 'hidden',
    // textAlign: 'center',
    // paddingTop: this.props.theme.spacing.unit * 20,
  },
  snackbar: {
    position: 'absolute',
  },
  wrapper: {
    marginTop: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    // color: green[500],
    position: 'absolute',
    top: '50%',
    left: 40,
    marginTop: -12,
    marginLeft: -12,
  },
});

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
  submitForm = values => {
    //
    // this will generate an action
    //
    this.props.fetchImage(values);
  };

  render() {
    const {
      // error,
      closeSnackbar,
      snackbarOpen,
      handleSubmit,
      imageFetching,
      imageError,
      imageResponse,
      classes,
    } = this.props;

    return (
      <form className={classes.root} onSubmit={handleSubmit(this.submitForm)}>
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

        <div className={classes.wrapper}>
          <Button
            variant="raised"
            color="primary"
            type="submit"
            disabled={imageFetching}
          >
            Submit
          </Button>

          {imageFetching && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarOpen}
          // autoHideDuration={4000}
          onClose={closeSnackbar}
          // transition={Fade}
          ContentProps={{
            'aria-describedby': 'message-id',
            className: classes.snackbarContent,
          }}
          message={<span id="message-id">{imageError}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          }
          className={classes.snackbar}
        />

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
    snackbarOpen: image.snackbarOpen,
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
