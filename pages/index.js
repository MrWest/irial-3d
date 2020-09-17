import React from 'react'
import Home from "../src/components/home/home"
import { connect } from 'react-redux'
import { fetchSectionsServer, sortModelsServer } from "../src/actions";

class Index extends React.Component {
  static async getInitialProps ({ reduxStore, req }) {
  
    const sections = await fetchSectionsServer(reduxStore);
    const models = await sortModelsServer('all', 'all', 0, reduxStore);
    return {sections, models};
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    const {sections, models}= this.props;
    return ( <Home  sections={sections} models={models} />)
  }
}

export default Index;
