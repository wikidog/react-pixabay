import React, { Component } from 'react';
import { TextField, Select } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui';

const styles = theme => ({});

class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '8783992-06499d83b0b376f06affd8505',
    images: [],
  };

  handleChange_search = e => {
    this.setState({ searchText: e.target.value });
  };

  handleChange_amount = e => {
    this.setState({ amount: e.target.value });
  };

  render() {
    return (
      <form>
        <TextField
          label="Search Image"
          value={this.state.searchText}
          onChange={this.handleChange_search.bind(this)}
          type="search"
          fullWidth
          margin="normal"
        />
        <FormControl>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <Select
            value={this.state.amount}
            onChange={this.handleChange_amount.bind(this)}
            inputProps={{
              name: 'amount',
              id: 'amount',
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(Search);
