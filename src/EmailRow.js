import React, { Component } from 'react';

class EmailRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Organize: this.props.organize,
      Sender: this.props.sender,
      Domain: this.props.domain,
      Email: this.props.email,
      Folder: this.props.folder
    };
  }

   render(){
      return (
        <tr role="list" className="people_list">
          <td role="listitem"><strong>#</strong></td>
          <td role="listitem">{this.state.Sender}</td>
          <td role="listitem">{this.state.Domain}</td>
          <td role="listitem">{this.state.Email}</td>
          <td role="listitem">{this.state.Folder}</td>
        </tr>
      );
   }
}

export default EmailRow;
