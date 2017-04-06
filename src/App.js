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

  getSearchResultsList() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();
    const allEmails = this.state.viewController;

    // If our term is an empty string, we want to return all
    if (!term) { return allEmails; }

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
  }

updateViewChange(event) {
  var newFolderViewRequest = event.target.value;
  var all_data = this.state.dataController;

  if(newFolderViewRequest !== this.state.defaultView) {
    var uniqueFolderView = all_data.filter(function(obj){
      return obj.folder === newFolderViewRequest;
    });
    this.setState({...this.state,
      viewController: uniqueFolderView,
      viewHeader: newFolderViewRequest
    });

  }
  else {
    this.setState({...this.state,
      viewController: all_data,
      viewHeader: this.state.defaultView
    });
  }
}

handleSortByHeader(header, e) {
  var objKey = header.toLowerCase();
  var sortedView = this.state.viewController.sort(function(a, b) {
    var A = JSON.stringify(a);
    var B = JSON.stringify(b);

    if(A.objKey < B.objKey) return -1;
    if(A.objKey > B.objKey) return 1;
    return 0;
  });

  this.setState({viewController: sortedView});
}

render() {
  return (

    <main>
      <div id="heading">
        <div className="container">
          <div className="row resources">
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div id="view_selector">
                <form className="form-inline">
                  <span>Folder List Count: ({this.state.viewController.length})</span>



                  <select className="form-control"
                          value={this.state.viewHeader}
                          onChange={this.updateViewChange.bind(this)}>

                    <option value={this.state.defaultView}>{this.state.defaultView}</option>

                    {this.state.folderOptions.map(folder => {
                      return (
                        <option key={folder} value={folder}>{folder}</option>
                      );
                    })}
                </select>
              </form>
            </div>
          </div>
          <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
            <div id="search_bar">
              <form className="form-inline">
                <SearchBar
                  value={this.state.searchText}
                  onFocus="window.scroll(0,0)"
                  onChange={this.handleSearch.bind(this)
                } />
              </form>
            </div>
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
              <th className="list_headers" onClick={this.handleSortByHeader.bind(this, 'sender')}>Sender<span className="caret"></span></th>
              <th className="list_headers" onClick={this.handleSortByHeader.bind(this, 'domain')}>Domain<span className="caret"></span></th>
              <th className="list_headers" onClick={this.handleSortByHeader.bind(this, 'email')}>Email<span className="caret"></span></th>
              <th className="list_headers" onClick={this.handleSortByHeader.bind(this, 'folder')}>Folder</th>
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
      </main>
    );
  }
}

export default App;
