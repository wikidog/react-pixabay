import React, { Component } from 'react';
import { TextField, Select } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui';
import axios from 'axios';

import ImageResults from './ImageResults';

const styles = theme => ({});

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

  render() {
    return (
      <div>
        <TextField
          label="Search Image"
          value={this.state.searchText}
          onChange={this.handleChangeSearch}
          type="search"
          fullWidth
          margin="normal"
        />
        <FormControl>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <Select
            value={this.state.amount}
            onChange={this.handleChangeAmount}
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
        {this.state.images ? <ImageResults images={this.state.images} /> : null}
      </div>
    );
  }
}

export default withStyles(styles)(Search);
