import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Helpers from './helpers.js';

class App extends Component {
  state = {
    loading: false,
    errors: null,
    file: ''
  }

  handleSubmit = (event) => {
    this.setState({
      errors: null,
      loading: true,
    }, () => {
      Helpers.httpRequest(
        `https://northwind.now.sh/api/categories?file=${this.state.file}`,
        'get',
      )
      .then((response) => response.blob())
      .then((blob) => {
        // create blob link
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `sample.${this.state.file}`);

        // append to html
        document.body.appendChild(link);

        // download
        link.click();

        // remove
        link.parentNode.removeChild(link);

        this.setState({
          loading: false
        });
      })
      .catch((error) => {
        error.json().then((json) => {
          this.setState({
            errors: json,
            loading: false
          });
        })
      });
    });
    
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({
      file: event.currentTarget.value.substring(0, 3)
    });
  }

  render(){      
    var{isLoaded,items} = this.state;

    if(!isLoaded){
        return <div>Loading...</div>;
    }
    else{
        return(
            <div className = 'App'>

                <ul>
                    {items.map(item =>(
                        <li key ={item.id}>

                            id:{item.id} | name:{item.name} | description:{item.description}
                            {/* <div className="form-group">
                  <button disabled={loading} className="btn btn-primary">{(loading) ? 'Downloading...' : 'Download'}</button>
                </div> */}
                            {/* <button onClick={this.downloadTxtFile}>Download</button> */}


                        </li>
                    ))};

                </ul>
           </div>

        );
    }
}


}

export default App;