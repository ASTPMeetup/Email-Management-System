import React, { Component } from 'react';
import './App.css';
import EmailRow from './EmailRow';
import SearchBar from './SearchBar';
import axios from 'axios';
import localJSON from '../json/mock_rp_data.json';

class App extends Component {

  constructor() {
  super();
  this.state = {
    viewController: [],
    folderOptions: [],
    homeEmails: [],
    shoppingEmails: [],
    financeEmails: [],
    travelEmails: [],
    MiscEmails: [],
    searchText: ''
    };
  }

  componentDidMount() {
    var uniqueFolders = [];
    var uniqueId = 0;
    localJSON.forEach(function(obj){
      obj['id'] = uniqueId;
      if (uniqueFolders.indexOf(obj.folder) < 0) {
        uniqueFolders.push(obj.folder);
      }
      uniqueId++;
    });

    uniqueFolders.push('none');
    this.setState({...this.state, folderOptions: uniqueFolders, viewController: localJSON});
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

  render() {
    return (
      <div className="App">
        <div className="container">
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div>
            <SearchBar value={this.state.searchText} onFocus="window.scroll(0,0)" onChange={this.handleSearch.bind(this)} />
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
                        key={emailRw.id}
                        id={emailRw.id}
                        folderOptions={this.state.folderOptions}
                        organize={emailRw.organize}
                        sender={emailRw.sender}
                        domain={emailRw.domain}
                        email={emailRw.email}
                        folder={emailRw.folder}
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
