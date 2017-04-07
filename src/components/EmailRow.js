import React, { Component } from 'react';
import FolderMenu from './FolderMenu';

class EmailRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.id,
      Organize: this.props.organize,
      Sender: this.props.sender,
      Domain: this.props.domain,
      Email: this.props.email,
      Folder: this.props.folder,
      SelectOptions: this.props.folderOptions,
      CheckBox: true,
      successDisplay: false,
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
      this.setState({Folder: newFolder, successDisplay: true});
  }

  resetSuccessDisplay() {
    if (this.state.successDisplay) {
      this.setState({successDisplay: false});
    }
  }

   render(){
      return (
        <tr role="list">
          <td role="listitem" className="checkBox"><input type="checkbox" onChange={this.handleCheckBoxEvent.bind(this)} checked={this.state.checkStatus}/></td>
          <td role="listitem">{this.state.Sender}</td>
          <td role="listitem">{this.state.Domain}</td>
          <td role="listitem">{this.state.Email}</td>
          <td role="listitem">{this.state.successDisplay ? <img className="img-responsive status-active" src="../upload.gif"/> : <div className="status-null"></div>}</td>
          <td role="listitem" className="rowFolders" onMouseOver={this.resetSuccessDisplay.bind(this)}>


            <FolderMenu
              header={this.state.Folder}
              folders={this.state.SelectOptions}
              folderId={this.state._id}
              defaultView="None"
              updateView={this.props.updateFolder}
              updateRow={this.handleUpdateFolder.bind(this)}
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
