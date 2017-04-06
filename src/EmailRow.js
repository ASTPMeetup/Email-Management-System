import React, { Component } from 'react';

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

  componentDidUpdate(){
    this.handleUpdatedFolder();
  }

  handleCheckBoxEvent(event) {
    this.setState({checkStatus: event.target.checked});
  }

  handleUpdateFolder(stateName, e) {
      this.setState({...this.state, updatedFolder: true, [stateName]: e.target.value});
  }

  handleUpdatedFolder(props) {
    if (this.state.updatedFolder) {
      this.props.updateFolder(this.state.Folder, this.state._id);
      this.setState({updatedFolder: false});
    }
  }

   render(){

      return (
        <tr role="list" className="people_list">
          <td role="listitem" className="checkBox"><input type="checkbox" onChange={this.handleCheckBoxEvent.bind(this)} checked={this.state.checkStatus}/></td>
          <td role="listitem">{this.state.Sender}</td>
          <td role="listitem">{this.state.Domain}</td>
          <td role="listitem">{this.state.Email}</td>
          <td role="listitem">
            <select className="form-control" name="folder options" value={this.state.Folder} onChange={this.handleUpdateFolder.bind(this, 'Folder')}>

            {this.state.SelectOptions.map(folderOption => {
              return (
                <option value={folderOption}>{folderOption}</option>
              );
            })}

            <option value="None">None</option>
            </select>
          </td>
        </tr>
      );
   }
}

EmailRow.PropTypes = {
  updateFolder: React.PropTypes.func.isRequired
};

export default EmailRow;
