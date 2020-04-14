import React from 'react'
import Home from "../src/components/home/home"
import { connect } from 'react-redux'
import { fetchSectionsServer } from "../src/actions";

class Index extends React.Component {
  static async getInitialProps ({ reduxStore, req }) {
  
    const sections = await fetchSectionsServer(reduxStore);
    return {sections};
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    const {sections}= this.props;
    return ( <Home server sections={sections} />)
  }
}

export default connect()(Index)
