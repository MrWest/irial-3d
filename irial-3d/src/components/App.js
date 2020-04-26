import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import Header from "./header";
import Home from "./home/home";
import SignIn from "./sign/signIn";
import SignUp from "./sign/signUp";
import ResetPassword from "./sign/resetPassword";
import ForgotPassword from "./sign/forgotPassword";
import InfoSendEmail from "./sign/infoSendEmail";
import ConfirmResetP from "./sign/confirmResetP";
import FooterBar from "./footerBar";
import ToursHome from "./tours/toursHome";
import TourDetails from "./tours/tourDetails"
import AttractionsHome from "./attractions/attractionsHome";
import AttractionDetails from "./attractions/attractionsDetails"
import SectionEditForm from "./forms/sectionEditForm";
import CategoryEditForm from "./forms/categoryEditForm";
import CategoryAddForm from "./forms/categoryAddForm";
import TourEditForm from "./forms/tourEditForm";
import TourAddForm from "./forms/tourAddForm";
import AttractionAddForm from "./forms/attractionAddForm";
import AttractionEditForm from "./forms/attractionEditForm";
import LodgingsHome from "./lodgings/lodgingsHome";
import LodgingDetails from "./lodgings/lodgingDetails"
import LodgingAddForm from "./forms/lodgingAddForm";
import LodgingEditForm from "./forms/lodgingEditForm";
import AccountHome from "./account/accountHome";
import BlogHome from "./blog/BlogHome";
import BlogExpanded from "./blog/BlogExpanded";
import ModelsHome from "./models/modelsHome";
import ModelsDetails from "./models/modelsDetails"
import ModelAddForm from "./forms/modelAddForm";
import ModelEditForm from "./forms/modelEditForm";

// import "../styles/App.css";
// import "../styles/video-react.css"; // import css

class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div className="main-layout" id="mainLayout">
          <Header />

          <Switch>
            
            <Route path="/" component={Home} exact />
            <Route path="/signin" component={SignIn} exact />
            <Route path="/signup" component={SignUp} exact />
            <Route path="/forgot" component={ForgotPassword} exact />
            <Route path="/infotextemail" component={InfoSendEmail} exact />
            <Route path="/confirmrp" component={ConfirmResetP} exact />
            <Route path="/rpassword/:info" component={ResetPassword} exact />     
            <Route path="/account" component={AccountHome} exact />     
            <Route path="/tours/:category" component={ToursHome} exact />
            <Route path="/tour/:id" component={TourDetails} exact />
            <Route path="/attractions/:category" component={AttractionsHome} exact />
            <Route path="/attraction/:id" component={AttractionDetails} exact />
            <Route path="/sectionedit/:id" component={SectionEditForm} exact />
            <Route path="/categoryedit/:id" component={CategoryEditForm} exact />
            <Route path="/categoryadd/:id" component={CategoryAddForm} exact />
            <Route path="/touredit/:id" component={TourEditForm} exact />
            <Route path="/touradd/:id" component={TourAddForm} exact />
            <Route path="/attractionadd/:id" component={AttractionAddForm} exact />
            <Route path="/attractionedit/:id" component={AttractionEditForm} exact />
            <Route path="/lodgings/:sort" component={LodgingsHome} exact />
            <Route path="/lodging/:id" component={LodgingDetails} exact />
            <Route path="/lodgingadd/:id" component={LodgingAddForm} exact />
            <Route path="/lodgingedit/:id" component={LodgingEditForm} exact />
            <Route path="/blog" component={BlogHome}  />
            <Route path="/posts/:slug" component={BlogExpanded} exact />
            <Route path="/models/:category" component={ModelsHome} exact />
            <Route path="/models/:id" component={ModelsDetails} exact />
            <Route path="/modeladd/:id" component={ModelAddForm} exact />
            <Route path="/modeledit/:id" component={ModelEditForm} exact />



            <Route component={Home} exact />
            
          </Switch>

          {/* <div className="footer-cover" /> */}

          <footer className="footer-nav-ex" id="footer">
            <FooterBar />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
