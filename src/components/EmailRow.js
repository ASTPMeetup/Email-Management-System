import React, { Component } from 'react';
import FolderMenu from './FolderMenu';

class EmailRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props._id,
      Organize: this.props.organize,
      Sender: this.props.sender,
      Domain: this.props.domain,
      Email: this.props.email,
      Folder: this.props.folder,
      SelectOptions: this.props.folderOptions,
      CheckBox: true,
      checkStatus: true,
      updatedFolder: false
    };
  }

  //handle check box checked event
  handleCheckBoxEvent(event) {
    var targetRow = event.target.parentNode.parentNode;
    var rowSelectBox = targetRow.lastChild.firstChild;

    //toggle row view and select box functionality based on check box event
    rowSelectBox.disabled = !rowSelectBox.disabled;
    targetRow.classList.toggle('disabled_row');

    this.setState({checkStatus: event.target.checked});
  }

  //update folder view if FolderMenu component updates
  handleUpdateFolder(newFolder) {
      this.setState({Folder: newFolder});
  }

   render(){
      return (
        <tr role="list">
          <td role="listitem" className="checkBox"><input type="checkbox" onChange={this.handleCheckBoxEvent.bind(this)} checked={this.state.checkStatus}/></td>
          <td role="listitem">{this.state.Sender}</td>
          <td role="listitem">{this.state.Domain}</td>
          <td role="listitem">{this.state.Email}</td>
          <td role="listitem">
            <FolderMenu
              header={this.state.Folder}
              defaultView="None"
              updateView={this.props.updateFolder}
              updateRow={this.handleUpdateFolder.bind(this)}
              folders={this.state.SelectOptions}
              folderId={this.state._id}
            />
          </td>
        </tr>
      );
   }
}

EmailRow.PropTypes = {
  updateFolder: React.PropTypes.func.isRequired
};

export default EmailRow;
