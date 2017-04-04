import React, { Component } from 'react';
import './App.css';
import EmailRow from './EmailRow';
import axios from 'axios';
import myData from '../json/mock_rp_data.json';

class App extends Component {

  constructor() {
  super();
  this.state = {
    emailList: []
    };
  }

  componentDidMount() {
    this.setState({emailList:myData});
  }

  render() {
    return (
      <div className="App">
        <div className="container">
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
                  {this.state.emailList.map(emailRw => {
                    return (
                      <EmailRow
                        key={emailRw.key}
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
