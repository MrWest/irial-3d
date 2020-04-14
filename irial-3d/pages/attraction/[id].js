import React, { Component, Fragment } from "react";
import { selectAttractionServer, fetchSectionsServer, getCategoryServer } from "../../src/actions";
import AttractionDetails from "../../src/components/attractions/attractionsDetails";


class AttractionDetailsServer extends Component {
  render() {
    const { categories, attraction, category } = this.props;  
    
    if(attraction.name === undefined)
     return <div/>

    return (
      <AttractionDetails attraction={attraction} category={category} categories={categories}/>
    );
  }
}

AttractionDetailsServer.getInitialProps = async function({ reduxStore, query: { id } }) {
  console.log(id);
  const sections = await fetchSectionsServer(reduxStore);
  const attraction = await selectAttractionServer(id, reduxStore);
  const category = await getCategoryServer(attraction.id_category, reduxStore);
  console.log("category: ", category);
  return {attraction, categories: sections[1].categories, category};
};


export default AttractionDetailsServer;
