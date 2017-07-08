import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  createPlaylist: PropTypes.func.isRequired,
};

class CreatePlaylist extends Component {
  state = {
    name: '',
    active: false,
  }

  handleCreate = () => {
    this.props.createPlaylist(this.state.name);
    this.setState({ active: false, name: '' });
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  }

  handleCancel = () => {
    this.setState({ active: false, name: '' });
  }

  handleActivation = () => {
    this.setState({ active: true }, () => {
      // Auto-focus the input after state has been set
      this.nameInput.focus();
    });
  }

  render() {
    const { active, name } = this.state;

    return (
      <CreatePlaylistWrapper>
        {active ?
          <CreatePlaylistForm onSubmit={this.handleCreate}>
            <PlaylistNameInput
              value={name}
              onChange={this.handleNameChange}
              innerRef={node => { this.nameInput = node; }}
            />
            <ButtonsWrapper>
              <ConfirmButton onClick={this.handleCreate}>
                Add
              </ConfirmButton>
              <CancelButton onClick={this.handleCancel}>
                Cancel
              </CancelButton>
            </ButtonsWrapper>
          </CreatePlaylistForm>
          :
          <CreatePlaylistActivation onClick={this.handleActivation}>
            <PlusIcon className="mdi mdi-plus" />
            New playlist
          </CreatePlaylistActivation>
        }
      </CreatePlaylistWrapper>
    );
  }
}

const CreatePlaylistWrapper = styled.div`
  border-bottom: 1px solid #000;
  height: 42px;
  padding: 8px;
  display: flex;
  align-items: center;
  position: relative;
`;
const CreatePlaylistForm = styled.form`
  display: flex;
  width: 100%;
`;
const PlaylistNameInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #fff;
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 4px;
  background-color: ${props => props.theme.primaryColorDark};
`;
const ButtonsWrapper = styled.div`
  position: absolute;
  padding: 8px 8px 16px 8px;
  top: 50px;
  right: 0;
  left: 0;
  background-color: ${props => props.theme.primaryColorDarkest};
  z-index: 999;
`;
const ButtonBase = styled.button`
  border-radius: 6px;
  border: 1px solid ${props => props.theme.primaryColorDark};
  padding: 8px 16px;
  color: #fff;
`;
const ConfirmButton = styled(ButtonBase)`
  margin-right: 16px;
  background-color: ${props => props.theme.primaryColorDark};
`;
const CancelButton = styled(ButtonBase)`
  background-color: transparent;
`;
const CreatePlaylistActivation = styled.div`
  display: flex;
  align-items: center;
`;
const PlusIcon = styled.i`
  font-size: 24px;
  color: #fff;
  margin-right: 16px;
`;


CreatePlaylist.propTypes = propTypes;

export default CreatePlaylist;
