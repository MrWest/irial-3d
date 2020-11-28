import React, { Component } from "react";
import {
  selectTourServer,
  fetchSectionsServer,
  getCategoryServer,
} from "../../src/actions";
import TourDetails from "../../src/components/tours/tourDetails";

class TourDetailsServer extends Component {
  render() {
    const { tour, categories } = this.props;

    if (tour.name === undefined) return <div />;

    return <TourDetails tour={tour} categories={categories} />;
  }
}

TourDetailsServer.getInitialProps = async function ({
  reduxStore,
  query: { id },
}) {
  console.log(id);
  const sections = await fetchSectionsServer(reduxStore);
  const tour = await selectTourServer(id, reduxStore);
  const category = await getCategoryServer(tour.id_category, reduxStore);
  console.log("category: ", category);
  return { tour, categories: sections[0].categories, category };
};

export default TourDetailsServer;
