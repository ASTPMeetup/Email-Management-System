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
      stateChangeAnimation: false,
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
      this.setState({Folder: newFolder, stateChangeAnimation: true});
  }

  //remove animation image after animation is complete
  toggleStateChangeAnimation() {
    if (this.state.stateChangeAnimation) {
      this.setState({stateChangeAnimation: false});
    }
  }

   render(){
      return (
        <tr role="list">
          <td role="listitem" className="checkBox">
            <input type="checkbox" onChange={this.handleCheckBoxEvent.bind(this)} checked={this.state.checkStatus}/>
          </td>

          <td role="listitem">{this.state.Sender}</td>
          <td role="listitem">{this.state.Domain}</td>
          <td role="listitem">{this.state.Email}</td>

          <td role="listitem">{this.state.stateChangeAnimation ?
            <img onAnimationEnd={this.toggleStateChangeAnimation.bind(this)} className="img-responsive status-active" src="../upload.gif" role="presentation" alt="success animation"/>
            : <div className="status-null"></div>}
          </td>

          <td role="listitem" className="rowFolders">
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
