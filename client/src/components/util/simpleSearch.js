// SimpleSearchInput has an input field
// for Simple Search.
// Simple Search looks for search keywords in recipe and ingredient
// and returns matching recipes

import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

class SimpleSearchInput extends Component {
  render() {
    return (
      <Form.Field style={{ width: '90%' }} className="searchNote">
        <Input
          type="input"
          onChange={this.props.handleInputChange}
          value={this.props.query}
          name="query"
          placeholder="Search keyword or ingredient"
          style={{ width: '100%' }}
        />
      </Form.Field>
    );
  }
}

export default SimpleSearchInput;
