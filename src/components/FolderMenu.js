import React, { Component, PropTypes } from 'react';

class FolderMenu extends Component {

  handleSelectFolderChange(event) {
    this.props.updateView(event.target.value, this.props.folderId);

    //update individual folder if child of email row
    if(this.props.folderId !== "null") {
      this.updateRowState(event.target.value);
    }
  }

  updateRowState(newFolder) {
    this.props.updateRow(newFolder);

  }

  render(){
    return (
      <select className="form-control"
        name="folder options"
        value={this.props.header}
        onChange={this.handleSelectFolderChange.bind(this)}>
        <option value={this.props.defaultView}>{this.props.defaultView}</option>

        {this.props.folders.map(folder => {
          return (
            <option key={folder} value={folder}>{folder}</option>
          );
        })}
      </select>
    );
  }
}

FolderMenu.PropTypes = {
  updateView: React.PropTypes.func.isRequired,
  updateRow: React.PropTypes.func.isRequired
};

export default FolderMenu;
