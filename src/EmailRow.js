import React, { Component } from 'react';

class EmailRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      Organize: this.props.organize,
      Sender: this.props.sender,
      Domain: this.props.domain,
      Email: this.props.email,
      Folder: this.props.folder,
      SelectOptions: this.props.folderOptions,
      CheckBox: true
    };
  }

  componentDidMount() {
    var otherOptions = this.state.SelectOptions.filter(option => option !== this.state.Folder);
    this.setState({...this.state, SelectOptions: otherOptions});
  }

   render(){
      return (
        <tr role="list" className="people_list">
          <td role="listitem"><strong>#</strong></td>
          <td role="listitem">{this.state.Sender}</td>
          <td role="listitem">{this.state.Domain}</td>
          <td role="listitem">{this.state.Email}</td>
          <td role="listitem">
            <select className="form-control" name="folder options">
            <option value={this.state.Folder}>{this.state.Folder}</option>
            {this.state.SelectOptions.map(folderOption => {
              return (
                <option value={folderOption}>{folderOption}</option>
              );
            })}
            </select>
          </td>
        </tr>
      );
   }
}

export default EmailRow;
