import React, { Component } from 'react';
import EmailRow from './EmailRow';
import FolderMenu from './FolderMenu';
import SearchBar from './SearchBar';
import localJSON from '../mock_rp_data.json';
// import axios from 'axios' when attaching application to server-side;

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
      //give all json objects unqiue ids
      obj['_id'] = uniqueId;

      //search all objects to compile folder categories based on avaiable options
      if (uniqueFolders.indexOf(obj.folder) < 0) {
        uniqueFolders.push(obj.folder);
      }
      uniqueId++;
    });

    this.setState({...this.state, folderOptions: uniqueFolders, viewController: data,
                    dataController: data, viewHeader: this.state.defaultView});

  }

  //complies search results
  getSearchResultsList() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();
    const allEmails = this.state.viewController;

    // If our term is an empty string, we want to return all
    if (!term) { return allEmails; }

    // Filter will return a new array for email list. If searched text has
    // an index value in a email in email list, it will return those respective emails.
    return allEmails.filter(obj => {
      return obj.sender.toLowerCase().search(term) >= 0;
    });
  }

  //handles search
  handleSearch(event) {
    this.setState({
      viewController: this.state.viewController,
      searchText: event.target.value
    });
  }

  //to update single row folder view
  updateFolderView(newViewRequest, FolderId) {
    const all_emails = this.state.dataController;
    const all_ids = all_emails.map(email => email._id);
    const emailToEditIndex = all_ids.indexOf(FolderId);

    all_emails[emailToEditIndex].folder = newViewRequest;
    this.setState({ ...this.state, dataController: all_emails});
  }

  // to update entire view based on folder selection
  updateViewChange(newViewRequest, FolderId) {
    var all_data = this.state.dataController;

    //filter view by folder category unless the selection option is 'Show All'
    if(newViewRequest !== this.state.defaultView) {
      var uniqueFolderView = all_data.filter(function(obj){
        return obj.folder === newViewRequest;
      });
      this.setState({...this.state,
        viewController: uniqueFolderView,
        viewHeader: newViewRequest
      });

    }
    else {
      this.setState({...this.state,
        viewController: all_data,
        viewHeader: this.state.defaultView
      });
    }
  }

  render() {
    return (

     <main>
       <section id="heading">
        <div className="container">
          <div className="row resources">
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div id="view_selector">
                <form className="form-inline">
                  <span>Folder Count: ({this.state.viewController.length})</span>
                  <FolderMenu
                    header={this.state.viewHeader}
                    defaultView={this.state.defaultView}
                    folders={this.state.folderOptions}
                    updateView={this.updateViewChange.bind(this)}
                    folderId="null"
                  />
              </form>
            </div>
          </div>
          <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
            <div id="search_bar">
              <form className="form-inline">
                <SearchBar
                  value={this.state.searchText}
                  onFocus="window.scroll(0,0)"
                  onChange={this.handleSearch.bind(this)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      </section>
      <br />
      <section className="table-responsive">
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
                    updateFolder={this.updateFolderView.bind(this)}
                  />
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    );
  }
}

export default App;