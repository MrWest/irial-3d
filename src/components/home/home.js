import React, { useEffect } from "react";
import PromoField from "./promoField";
import FrontModels from "./frontModels";
import AboutContact from "./aboutContact";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import _ from "lodash";
import { getLanguage, isServer } from "../../apis/tools";
import { fetchSections, fetchTags, sortModels } from "../../actions";

const HomeOut = ({
  language,
  models,
  sections,
  fetchSections,
  fetchTags,
  sortModels,
}) => {
  useEffect(() => {
    if (!isServer) {
      fetchSections();
      fetchTags();
      sortModels();
    }
  }, []);

  return (
    <div style={{ paddingBottom: 88 }}>
      <Helmet>
        <meta name="language" content={getLanguage()} />
        <title>
          {language.PageTittle} | {language.HomePageTittle}{" "}
        </title>
        <meta name="description" content={language.HomePageDescription} />
        <meta name="keywords" content={language.HomePageTags} />
      </Helmet>
      <PromoField models={models} />
      <FrontModels sections={sections} models={models} />
      <AboutContact />
    </div>
  );
};

const mapStateTopProps = (state) => {
  return {
    sections: state.sections,
    models: state.models,
    language: state.language,
  };
};

export default connect(mapStateTopProps, {
  fetchSections,
  fetchTags,
  sortModels,
})(HomeOut);
