import React, { Component, PropTypes } from 'react';
import ariaSelect from 'aria-listbox';

class FolderMenu extends Component {

  componentDidMount() {
    ariaSelect(document.querySelector('select'), {
      nextKeys: ['s', 'd', 37, 38],
      prevKeys: ['a', 'w', 39, 40],
      selectKeys: [13, 32]
    });
  }

  handleSelectFolderChange(event) {
    this.props.updateView(event.target.value, this.props.folderId);

    //update individual folder view if component is child of <EmailRow />
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

        <option role="option" value={this.props.defaultView}>{this.props.defaultView}</option>

        {this.props.folders.map(folder => {
          return (<option role="option" key={folder} value={folder}>{folder}</option>);
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
