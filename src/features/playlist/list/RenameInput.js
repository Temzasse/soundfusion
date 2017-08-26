import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

class RenameInput extends Component {
  state = {
    value: ''
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onConfirm(this.state.value);
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  render() {
    const { value } = this.state;

    return (
      <RenameForm onSubmit={this.handleSubmit}>
        <Input value={value} onChange={this.handleChange} />
        <Icon
          className="mdi mdi-check-circle"
          onClick={this.handleSubmit}
        />
        <Icon
          className="mdi mdi-cancel"
          onClick={this.handleCancel}
        />
      </RenameForm>
    );
  }
}

const RenameForm = styled.form`
  display: flex;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${props => props.theme.primaryColorDark};
`;
const Icon = styled.i`
  font-size: 16px;
  margin-left: 8px;
  opacity: 0.5;
  color: #fff;
  transition: all 0.2 ease;

  &:hover {
    opacity: 1;
    color: ${props => props.theme.primaryColorLight};
  }
`;

RenameInput.propTypes = propTypes;

export default RenameInput;
