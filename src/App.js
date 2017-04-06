import React, { Component } from 'react';
import './App.css';
import EmailRow from './EmailRow';
import SearchBar from './SearchBar';
import localJSON from '../json/mock_rp_data.json';
// import axios from 'axios';

class App extends Component {

  constructor() {
  super();
  this.state = {
    dataController: localJSON,
    viewController: [],
    folderOptions: [],
    defaultView: 'Show All',
    searchText: '',
    viewHeader: ''
    };
  }

  componentDidMount() {
    var data = this.state.dataController;
    var uniqueFolders = [];
    var uniqueId = 0;
    data.forEach(function(obj){
      obj['_id'] = uniqueId;
      if (uniqueFolders.indexOf(obj.folder) < 0) {
        uniqueFolders.push(obj.folder);
      }
      uniqueId++;
    });

    this.setState({...this.state, folderOptions: uniqueFolders, viewController: data,
                    dataController: data, viewHeader: this.state.defaultView});
  }

  componentDidUpdate() {
    console.log(this.state.viewController.length);
  }

getSearchResultsList() {
  // Remove any white space, and convert the searchText to lowercase
  const term = this.state.searchText.trim().toLowerCase();
  const allEmails = this.state.viewController;

  // If our term is an empty string, we want to return all
  if (!term) { return allEmails;  }

  // Filter will return a new array for email list. If searchText has
  // an index value in a email in email list, it will return those email.
  return allEmails.filter(obj => {
    return obj.sender.toLowerCase().search(term) >= 0;
  });
}

handleSearch(event) {
  this.setState({
    viewController: this.state.viewController,
    searchText: event.target.value
  });
}

updateFolders(updatedFolder, editId) {
  const all_emails = this.state.dataController;
  const all_ids = all_emails.map(email => email._id);
  const emailToEditIndex = all_ids.indexOf(editId);

  all_emails[emailToEditIndex].folder = updatedFolder;
  this.setState({ ...this.state, dataController: all_emails});
  console.log(all_emails[emailToEditIndex].folder);
}

updateViewChange(event) {
  var newFolderViewRequest = event.target.value;
  var all_data = this.state.dataController;

  if(newFolderViewRequest !== this.state.defaultView) {
    var uniqueFolderView = all_data.filter(function(obj){
      return obj.folder === newFolderViewRequest;
    });
    this.setState({...this.state, viewController: uniqueFolderView, viewHeader: newFolderViewRequest});
  }
  else {
    this.setState({...this.state, viewController: all_data, viewHeader: this.state.defaultView});
  }
}

render() {
    return (
      <div className="App">
        <div className="container">
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="container">
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div id="view_selector">
                  <select className="form-control" value={this.state.viewHeader} onChange={this.updateViewChange.bind(this)}>
                    <option value={this.state.defaultView}>{this.state.defaultView}</option>

                    {this.state.folderOptions.map(folder => {
                      return (
                        <option value={folder}>{folder}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div id="search_bar">
                  <SearchBar value={this.state.searchText}
                              onFocus="window.scroll(0,0)"
                              onChange={this.handleSearch.bind(this)
                  } />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="list_headers">Organize</th>
                  <th className="list_headers">Sender<span className="caret"></span></th>
                  <th className="list_headers">Domain<span className="caret"></span></th>
                  <th className="list_headers">Email<span className="caret"></span></th>
                  <th className="list_headers">Folder</th>
                </tr>
              </thead>
              <tbody role="main">
                  {this.getSearchResultsList().map(emailRw => {
                    return (
                      <EmailRow
                        key={emailRw._id}
                        _id={emailRw._id}
                        folderOptions={this.state.folderOptions}
                        organize={emailRw.organize}
                        sender={emailRw.sender}
                        domain={emailRw.domain}
                        email={emailRw.email}
                        folder={emailRw.folder}
                        updateFolder={this.updateFolders.bind(this)}
                      />
                    );
                  })}
                </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
    );
  }
}

export default App;
