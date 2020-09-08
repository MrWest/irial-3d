import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import PromoField from "./promoField";
import FrontTourPromo from "./frontTourPromo";
import FrontModels from "./frontModels"
import FrontLodgingPromo from "./frontLodgingPromo"
import AboutContact from "./aboutContact"
import { connect } from "react-redux";
import {Helmet} from 'react-helmet';
import {getLanguage, isServer} from "../../apis/tools";
import { fetchSections, fetchTags, sortModels } from "../../actions";


class HomeOut extends Component {
  state = {};
  componentDidMount() {
    if(!isServer)
    {
      const { fetchSections, fetchTags, sortModels } = this.props;
      fetchSections();
      fetchTags();
      sortModels();
    }
    
  }
  render() {
    const { classes, sections, language, models } = this.props;

    // if(sections === undefined || sections.length < 1)
    //  return <div/>
     console.log('zz', sections);
    return (

         <div className={classes.container}>
            <Helmet>
              <meta name="language" content={getLanguage()}/>
              <title>{language.PageTittle} | {language.HomePageTittle} </title>
              <meta name="description" content={language.HomePageDescription} />
              <meta name="keywords" content={language.HomePageTags} /> 
            </Helmet>
          <PromoField models={models} />
          <FrontModels sections={sections} models={models}/>
          <AboutContact />
        </div>
    );
  }
}
const styles = theme => ({
  container: {
    paddingBottom: 88
  }
});




HomeOut.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateTopProps = state => {
  return {
    sections: state.sections,
    models: state.models,
    language: state.language
  };
};

export default connect(mapStateTopProps, { fetchSections, fetchTags, sortModels })(withStyles(styles)(HomeOut));
