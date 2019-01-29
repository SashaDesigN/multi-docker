import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {

  state = {
  	seenIndexes: [],
  	values: {},
  	index: '' 
  }

  componentDidMount() {
  	this.fetchValues();
  	this.fetchIndexes();
  }

  fetchValues = async () => {
  	const values = await axios.get('/api/values/current');
  	console.log(values);
  	this.setState({ values: values.data })
  }
  
  fetchIndexes = async () => {
  	const indexes = await axios.get('/api/values/all');
  	this.setState({ seenIndexes: indexes.data })
  }

  renderIndexes () {
  	return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues () {
  	const values = [];

  	for (let key in this.state.values) {
  		values.push(
  			<div key={key}>
  				For index {key} I calculated {this.state.values[key]}
  			</div>
  		);
  	}

  	return values;
  }

  handleSubmit = async (event) => {
  	event.preventDefault();

  	await axios.post('/api/values', {
  		index: this.state.index
  	});

  	this.setState({index: ''});
  }

  render() {
    return (
      <div>
      	<form onSubmit={this.handleSubmit}>
      		<label>Enter index:</label>
      		<input value={this.state.index} onChange={event => this.setState({index: event.target.value })} />
      		<button>Submit</button>
      	</form>

      	<h3>Indexes I`ve seen:</h3>
      	{this.renderIndexes()}

      	<h3>Calculated values:</h3>
      	{this.renderValues()}
      </div>
    );
  }
}

export default Fib;