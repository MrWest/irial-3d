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
import TourDetails from "./tours/tourDetails";
import AttractionsHome from "./attractions/attractionsHome";
import AttractionDetails from "./attractions/attractionsDetails";
import SectionEditForm from "./forms/sectionEditForm";
import CategoryEditForm from "./forms/categoryEditForm";
import CategoryAddForm from "./forms/categoryAddForm";
import TourEditForm from "./forms/tourEditForm";
import TourAddForm from "./forms/tourAddForm";
import AttractionAddForm from "./forms/attractionAddForm";
import AttractionEditForm from "./forms/attractionEditForm";
import AccountHome from "./account/accountHome";
import BlogHome from "./blog/BlogHome";
import BlogExpanded from "./blog/BlogExpanded";
import ModelsHome from "./models/modelsHome";
import ModelsDetails from "./models/modelsDetails";
import ModelAddForm from "./forms/modelAddForm";
import ModelEditForm from "./forms/modelEditForm";
import ProjectsHome from "./projects/projectsHome";
import ProjectDetails from "./projects/projectsDetails";
import ProjectAddForm from "./forms/projectAddForm";
import ProjectEditForm from "./forms/projectEditForm";
import TexturesHome from "./textures/texturesHome";
import TextureDetails from "./textures/texturesDetails";
import TextureAddForm from "./forms/textureAddForm";
import TextureEditForm from "./forms/textureEditForm";
import ScenesHome from "./scenes/scenesHome";
import SceneDetails from "./scenes/scenesDetails";
import SceneAddForm from "./forms/sceneAddForm";
import SceneEditForm from "./forms/sceneEditForm";

// import "../styles/App.css";
// import "../styles/video-react.css"; // import css

class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
            <Route
              path="/attractions/:category"
              component={AttractionsHome}
              exact
            />
            <Route path="/attraction/:id" component={AttractionDetails} exact />
            <Route path="/sectionedit/:id" component={SectionEditForm} exact />
            <Route
              path="/categoryedit/:id"
              component={CategoryEditForm}
              exact
            />
            <Route path="/categoryadd/:id" component={CategoryAddForm} exact />
            <Route path="/touredit/:id" component={TourEditForm} exact />
            <Route path="/touradd/:id" component={TourAddForm} exact />
            <Route
              path="/attractionadd/:id"
              component={AttractionAddForm}
              exact
            />
            <Route
              path="/attractionedit/:id"
              component={AttractionEditForm}
              exact
            />
            <Route path="/blog" component={BlogHome} />
            <Route path="/posts/:slug" component={BlogExpanded} exact />
            <Route path="/models/:query" component={ModelsHome} exact />
            <Route path="/models/:id" component={ModelsDetails} exact />
            <Route path="/modeladd/:id" component={ModelAddForm} exact />
            <Route path="/modeledit/:id" component={ModelEditForm} exact />
            <Route path="/projects/:query" component={ProjectsHome} exact />
            <Route path="/project/:id" component={ProjectDetails} exact />
            <Route path="/projectadd/:id" component={ProjectAddForm} exact />
            <Route path="/projectedit/:id" component={ProjectEditForm} exact />
            <Route path="/textures/:query" component={TexturesHome} exact />
            <Route path="/texture/:id" component={TextureDetails} exact />
            <Route path="/textureadd/:id" component={TextureAddForm} exact />
            <Route path="/textureedit/:id" component={TextureEditForm} exact />
            <Route path="/scenes/:query" component={ScenesHome} exact />
            <Route path="/scene/:id" component={SceneDetails} exact />
            <Route path="/sceneadd/:id" component={SceneAddForm} exact />
            <Route path="/sceneedit/:id" component={SceneEditForm} exact />

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
