import React, { Component } from 'react';
import EmailRow from './EmailRow';
import FolderMenu from './FolderMenu';
import SearchBar from './SearchBar';
import axios from 'axios';
const serverURL = "https://openws.herokuapp.com/email-manager";
const appKey = "?apiKey=8fa0e46f0361117d65d91d6032391324";

class App extends Component {

  constructor() {
    super();
    this.state = {
      dataController: [],
      viewController: [],
      folderOptions: [],
      defaultView: 'Show All',
      searchText: '',
      viewHeader: ''
    };
  }

  componentDidMount() {
    axios.get(serverURL + appKey).then((res)=> {
        var data = res.data;
        var uniqueFolders = [];

        data.forEach(function(obj){

          //search all objects to compile folder categories based on avaiable folder options, with "None"
          // being an invalid folders category
          if (uniqueFolders.indexOf(obj.folder) < 0 && obj.folder !== "None") {
            uniqueFolders.push(obj.folder);
          }
        });

        this.setState({...this.state, folderOptions: uniqueFolders, viewController: data,
                        dataController: data, viewHeader: this.state.defaultView});
    })
    .catch(function(error){console.log(error);});
  }

  //handles search results change
  getSearchResultsList() {
    const searchInput = this.state.searchText.trim().toLowerCase();
    const allEmails = this.state.viewController;

    // If nothing is being search for, we want to return all
    if (!searchInput) { return allEmails; }

    // Filter will return a new array for the EmailRow components. If searched text has
    // an index value in a sender listed, it will return those respective email rows.
    return allEmails.filter(obj => {
      return obj.sender.toLowerCase().search(searchInput) >= 0;
    });
  }

  //handles search input change
  handleSearch(event) {
    this.setState({
      viewController: this.state.viewController,
      searchText: event.target.value
    });
  }

  //to update single row folder view
  updateFolderView(newFolderRequest, FolderId) {
    const all_emails = this.state.dataController;
    const all_ids = all_emails.map(email => email._id);
    const emailToEditIndex = all_ids.indexOf(FolderId);

    all_emails[emailToEditIndex].folder = newFolderRequest;

    // update object with it's unique folder id and index value
    axios.put(serverURL +'/'+ FolderId + appKey, all_emails[emailToEditIndex]).then((res)=> {
        this.setState({ ...this.state, dataController: all_emails});
    })
    .catch(function(error){console.log(error);});
  }

  // to update entire view based on folder selection
  updateViewChange(newViewRequest, FolderId) {
    var all_data = this.state.dataController;
    var viewControllerFolder = this.state.defaultView;
    var uniqueFolderView = [];

    //filter view by folder category unless the selection option is 'Show All'
    if(newViewRequest !== this.state.defaultView) {
      uniqueFolderView = all_data.filter(function(obj){
        return obj.folder === newViewRequest;
      });
      viewControllerFolder = newViewRequest;
    }
    else { uniqueFolderView = all_data; }

    this.setState({...this.state,
      viewController: uniqueFolderView,
      viewHeader: viewControllerFolder
    });
  }

  render() {
    return (

     <main>
       <section id="heading">
        <div className="container">
          <div className="row resources">
            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4">
              <div id="view_selector">
                <form className="form-inline">
                  <span id="counter">Folder Count: ({this.state.viewController.length})</span>
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
          <div className="col-xs-12 col-sm-6 col-md-7 col-lg-8">
            <div id="search_bar">
              <form className="form-inline">
                <SearchBar
                  value={this.state.searchText}
                  onChange={this.handleSearch.bind(this)}
                  onFocus="window.scroll(0,0)"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      </section>
      <br/>
      <section className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="list_headers">Organize</th>
              <th className="list_headers">Sender</th>
              <th className="list_headers">Domain</th>
              <th className="list_headers">Email</th>
              <th className="list_headers"></th>
              <th className="list_headers">Folder</th>
            </tr>
          </thead>
          <tbody role="main">
              {this.getSearchResultsList().map(emailRw => {
                return (
                  <EmailRow
                    key={emailRw._id}
                    id={emailRw._id}
                    organize={emailRw.organize}
                    sender={emailRw.sender}
                    domain={emailRw.domain}
                    email={emailRw.email}
                    folder={emailRw.folder}
                    folderOptions={this.state.folderOptions}
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
