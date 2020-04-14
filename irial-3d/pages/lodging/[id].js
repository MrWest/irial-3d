import React, { Component } from "react";
import { selectLodgingServer, fetchSectionsServer, getCategoryServer } from "../../src/actions";
import  LodgingDetails  from "../../src/components/lodgings/lodgingDetails";

class LodgingDetailsServer extends Component {

  render() {
    const { lodging, category, categories } = this.props;
    if(lodging.name === undefined)
     return <div/>

    return (
      <LodgingDetails lodging={lodging} category={category} categories={categories}/>
    );
  }
}



LodgingDetailsServer.getInitialProps = async function({ reduxStore, query: { id } }) {
  const sections = await fetchSectionsServer(reduxStore);
  const lodging = await selectLodgingServer(id, reduxStore);
  const category = await getCategoryServer(lodging.id_category, reduxStore);
  console.log("category: ", category);
  return {lodging, categories: sections[2].categories, category };
};

export default LodgingDetailsServer;
