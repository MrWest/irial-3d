import React from 'react'
import Home from "../src/components/home/home"
import { connect } from 'react-redux'
import { fetchSectionsServer, sortModelsServer } from "../src/actions";

class Index extends React.Component {
  static async getInitialProps ({ reduxStore, req }) {
  
    const sections = await fetchSectionsServer(reduxStore);
    const models = await sortModelsServer('all', 'all', 0, reduxStore);
    
    console.log('xx', sections);
    return {sections, models};
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    const {sections, models}= this.props;
    
    console.log('ww', sections);
    return ( <Home  sections={sections} models={models} />)
  }
}

export default connect()(Index)
