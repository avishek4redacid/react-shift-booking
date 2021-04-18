import React, { Component } from 'react';
import './App.css';
import MainBody from './components/MainBody';
import { setData } from './actions'
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    fetch('http://localhost:8080/shifts')
      .then(res => res.json())
      .then((data) => {
        this.props.setData(data);
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <MainBody
          items={this.props.items}
          setData={this.props.setData}
        />
      </div>
    );
  }
}


// function to convert the global state obtained from redux to local props
function mapStateToProps(state) {
  return {
    items: state.data.children || [],
  };
}

export default connect(mapStateToProps, { setData })(App);
