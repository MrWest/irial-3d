import App from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import withReactRouter from "../lib/with-react-router";
import Header from "../src/components/header";
import SignIn from "../src/components/sign/signIn";
import SignUp from "../src/components/sign/signUp";
import ResetPassword from "../src/components/sign/resetPassword";
import ForgotPassword from "../src/components/sign/forgotPassword";
import InfoSendEmail from "../src/components/sign/infoSendEmail";
import ConfirmResetP from "../src/components/sign/confirmResetP";
import AccountHome from "../src/components/account/accountHome";
import FooterBar from "../src/components/footerBar";
import Home from "../src/components/home/home";
import ToursHome from "../src/components/tours/toursHome";
import TourDetails from "../src/components/tours/tourDetails";
import SectionEditForm from "../src/components/forms/sectionEditForm";
import CategoryEditForm from "../src/components/forms/categoryEditForm";
import TourAddForm from "../src/components/forms/tourAddForm";
import CategoryAddForm from "../src/components/forms/categoryAddForm";
import TourEditForm from "../src/components/forms/tourEditForm";
import BlogHome from "../src/components/blog/BlogHome";
import BlogExpanded from "../src/components/blog/BlogExpanded";
import Helmet from "react-helmet";
import ModelsHome from "../src/components/models/modelsHome";
import ModelDetails from "../src/components/models/modelsDetails";
import ModelAddForm from "../src/components/forms/modelAddForm";
import ModelEditForm from "../src/components/forms/modelEditForm";
import ProjectsHome from "../src/components/projects/projectsHome";
import ProjectDetails from "../src/components/projects/projectsDetails";
import ProjectAddForm from "../src/components/forms/projectAddForm";
import ProjectEditForm from "../src/components/forms/projectEditForm";
import TexturesHome from "../src/components/textures/texturesHome";
import TextureDetails from "../src/components/textures/texturesDetails";
import TextureAddForm from "../src/components/forms/textureAddForm";
import TextureEditForm from "../src/components/forms/textureEditForm";
import ScenesHome from "../src/components/scenes/scenesHome";
import SceneDetails from "../src/components/scenes/scenesDetails";
import SceneAddForm from "../src/components/forms/sceneAddForm";
import SceneEditForm from "../src/components/forms/sceneEditForm";
import Cart from "../src/components/payment/Cart";
import PaymentHome from "../src/components/payment/paymentHome";
import ThankyouPage from "../src/components/global/thanks";
import texturesDetails from "../src/components/textures/texturesDetails";

const isServer = typeof window === "undefined";

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        <div
          className="main-layout"
          id="mainLayout"
          style={{ minHeight: "calc(100vh - 0px)" }}
        >
          <Header />
          {isServer ? (
            children
          ) : (
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
                path="/sectionedit/:id"
                component={SectionEditForm}
                exact
              />
              <Route
                path="/categoryedit/:id"
                component={CategoryEditForm}
                exact
              />
              <Route path="/touradd/:id" component={TourAddForm} exact />
              <Route
                path="/categoryadd/:id"
                component={CategoryAddForm}
                exact
              />
              <Route path="/touredit/:id" component={TourEditForm} exact />
              <Route path="/blog" component={BlogHome} />
              <Route path="/posts/:slug" component={BlogExpanded} exact />
              <Route path="/models/:query" component={ModelsHome} exact />
              <Route path="/model/:id" component={ModelDetails} exact />
              <Route path="/modeladd/:id" component={ModelAddForm} exact />
              <Route path="/modeledit/:id" component={ModelEditForm} exact />
              <Route path="/projects/:query" component={ProjectsHome} exact />
              <Route path="/project/:id" component={ProjectDetails} exact />
              <Route path="/projectadd/:id" component={ProjectAddForm} exact />
              <Route
                path="/projectedit/:id"
                component={ProjectEditForm}
                exact
              />
              <Route path="/textures/:query" component={TexturesHome} exact />
              <Route path="/texture/:id" component={TextureDetails} exact />
              <Route path="/textureadd/:id" component={TextureAddForm} exact />
              <Route
                path="/textureedit/:id"
                component={TextureEditForm}
                exact
              />
              <Route path="/scenes/:query" component={ScenesHome} exact />
              <Route path="/scene/:id" component={SceneDetails} exact />
              <Route path="/sceneadd/:id" component={SceneAddForm} exact />
              <Route path="/sceneedit/:id" component={SceneEditForm} exact />
              <Route path="/payment" component={PaymentHome} exact />
              <Route path="/thanks" component={ThankyouPage} exact />
              <Route component={Home} exact />
            </Switch>
          )}
        </div>
        <div className="footer-nav-ex">
          {!children.noFooter && <FooterBar />}
        </div>
        <Cart />
        <style jsx global>
          {`
            html {
              max-width: 100vw;
              height: 100%;
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 0;
              position: relative;
              min-height: 100%;
              width: 100% !important;
              padding-right: 0 !important;
              overflow-y: scroll !important;
            }

            *,
            *:before,
            *:after {
              box-sizing: inherit;
            }

            @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

            @font-face {
              font-family: "Roboto";
              src: url("https://fonts.googleapis.com/css?family=Roboto&display=swap")
                format("truetype");
            }

            code {
              font-family: source-code-pro, Menlo, Monaco, Consolas,
                "Courier New", monospace;
            }

            p {
              margin: 0px;
              font-family: "Arial";
              font-size: 18px;
            }

            a {
              color: #3577d4;
              text-decoration-line: none;
            }

            .h1 {
              display: inline !important;
            }

            iframe {
              max-width: 340px !important;
              width: 340px !important;
            }

            .fb-like span {
              max-width: 340px !important;
              width: 340px !important;
            }
            .App {
              text-align: center;
            }

            article p,
            li {
              font-family: Roboto !important;
              font-size: 18px !important;
              font-weight: 500;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.67;
              letter-spacing: normal;
              color: #8898a8 !important;
            }
            article img {
              border-top-left-radius: 100px !important;
              border-bottom-right-radius: 100px !important;
              width: 100% !important;
            }

            @import url("//hello.myfonts.net/count/3842d3");
            @font-face {
              font-family: "Delvon";
              src: url("/static/styles/webfonts/3842D3_0_0.eot");
              src: url("/static/styles/webfonts/3842D3_0_0.eot?#iefix")
                  format("embedded-opentype"),
                url("webfonts/3842D3_0_0.woff2") format("woff2"),
                url("/static/styles/webfonts/3842D3_0_0.woff") format("woff"),
                url("webfonts/3842D3_0_0.ttf") format("truetype");
            }
            @font-face {
              font-family: "Delvon";
              src: url("/static/styles/webfonts/3842F8_0_0.eot");
              src: url("/static/styles/webfonts/3842F8_0_0.eot?#iefix")
                  format("embedded-opentype"),
                url("/static/styles/webfonts/3842F8_0_0.woff2") format("woff2"),
                url("/static/styles/webfonts/3842F8_0_0.woff") format("woff"),
                url("/static/styles/webfonts/3842F8_0_0.ttf") format("truetype");
            }

            @font-face {
              font-family: "Delvon";
              src: url("/static/styles/webfonts/DELVON_DEMO.ttf");
            }
            @font-face {
              font-family: "Gloss";
              src: url("/static/styles/webfonts/Gloss_And_Bloom.ttf");
              letter-spacing: 2px;
            }

            .item-options {
              position: absolute;
              top: 0;
              background: rgba(0, 0, 0, 0.5);
              width: 100%;
              border-top-left-radius: 20px;
              border-top-right-radius: 20px;
              display: none;
              padding-right: 20px;
              padding-top: 12px;
              padding-bottom: 8px;
            }

            .item-options-front {
              position: absolute;
              top: 0;
              background: rgba(0, 0, 0, 0.7);
              width: 100%;
              display: none;
              padding-right: 20px;
              padding-top: 12px;
              padding-bottom: 8px;
            }

            .item-description {
              position: absolute;
              bottom: 0;
              background: rgba(0, 0, 0, 0.7);
              width: 100%;
              display: none;
              padding-left: 20px;
              padding-right: 20px;
              padding-top: 8px;
              padding-bottom: 12px;
            }

            .item-description p {
              color: #ffffff;
              font-family: Delvon;
              font-size: 22px;
            }

            .front-card-content {
              position: relative;
              cursor: pointer;
              /*min-height: 154px;*/
              height: 232px;
            }

            .front-card-content:hover .item-options-front {
              display: inherit;
            }

            .front-card-content:hover .item-description {
              display: inherit;
            }

            .category-front {
              height: 28px;
              border-radius: 14px;
              background-color: #faba1b;
              font-size: 12px;
              font-weight: 600;
              line-height: 2.29;
              color: #1c5375;
              font-family: Arial;
              padding: 0px 16px;
              textalign: center;
              margin: 0 auto;
            }

            .my-masonry-grid {
              display: -webkit-box; /* Not needed if autoprefixing */
              display: -ms-flexbox; /* Not needed if autoprefixing */
              display: flex;
              margin-left: -30px; /* gutter size offset */
              width: auto;
            }
            .my-masonry-grid_column {
              padding-left: 30px; /* gutter size */
              background-clip: padding-box;
            }

            /* Style your items */
            .my-masonry-grid_column > div {
              /* change div to reference your elements you put in <Masonry> */
              /*background: #1c5375;*/
              margin-bottom: 30px;
            }

            p {
              margin: 0px;
              font-family: "Roboto";
              font-size: 16px;
            }
            .server-doc-container {
              padding-top: 120px;
              padding-bottom: 130px;
            }

            .footerBar-root {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fafafa;
            }
            .ptextmobile {
              margin-left: 15px !important;
              font-size: 11px !important;
              max-height: 15px !important;
              margin-bottom: 0px !important;
              background: transparent !important;
            }

            .logo-footer {
              outline: none;
              text-decoration-line: none !important;
              height: 24px;
              object-fit: contain;
            }

            .mobileSocials {
              width: 24px !important;
              height: 24px !important;
              margin: 0px !important;
              padding: 0px !important;
              margin-left: 10px !important;
              padding-top: 0px !important;
              background: transparent !important;
            }

            .center-server-side-render {
              padding-left: 0px !important;
              padding-right: 0px !important;
              width: 100%;
            }

            .appbar {
              padding-left: 0px !important;
              padding-right: 0px !important;
            }

            @media only screen and (min-width: 1200px) {
              .center-server-side-render {
                max-width: 1280px;
              }
            }
            @media only screen and (min-width: 992px) {
              .center-server-side-render {
                max-width: 1180px;
              }
            }
            @media only screen and (max-width: 600px) {
              .appbar {
                height: 88px;
              }

              .center-server-side-render {
                max-width: 100vw;
              }
              .p-TextMobile {
                margin-bottom: 8px;
                text-align: center;
              }
              .mobileSocials {
                margin-left: 0px !important;
                margin-right: 16px !important;
              }
              .mobileNo {
                display: none;
              }
              .select-tool {
                margintop: 8px;
                marginleft: 24px;
                marginright: 8px;
              }
            }

            .select-tool {
              width: 220px;
              margintop: 20px;
            }
            .select-tool div {
              max-height: 52px !important;
            }
            .select-tool em {
              paddingright: 8px !important;
            }
            .select-tool p {
              paddingright: 8px !important;
            }

            .select-tool label {
              transform: translate(14px, -14px) scale(0.75) !important;
            }

            a {
              text-decoration: none !important;
            }

            .App-logo {
              animation: App-logo-spin infinite 20s linear;
              height: 40vmin;
            }
            .carousel-indicators {
              list-style-type: none !important;
            }

            .carousel-control-next,
            .carousel-control-prev {
              display: none;
            }

            .App-header {
              background-color: #282c34;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-size: calc(10px + 2vmin);
              color: white;
            }

            .App-link {
              color: #61dafb;
            }

            @keyframes App-logo-spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            .no-exists {
              display: none;
            }
            .main-theme-color {
              color: #3577d4 !important;
            }
            .main-theme-text {
              color: #1c5375 !important;
            }
            .red-text {
              color: #b00020 !important;
            }
            .full-width {
              width: 100%;
            }
            .half-width {
              width: 50%;
            }

            .spacing-less {
              padding: 0rem 0rem !important;
              margin: 0px !important;
            }

            .strong {
              font-weight: bold !important;
            }
            .bg-white {
              background-color: #ffffff;
            }
            .font-14 {
              font-size: 14px;
            }
            .font-32 {
              font-size: 32px;
            }
            .margin-left {
              margin-left: 5px;
            }

            .width-5 {
              width: 6%;
            }

            .middle {
              vertical-align: middle !important;
            }
            .top-10 {
              padding-top: 10px !important;
            }
            .right-10 {
              padding-right: 10px !important;
            }
            .width-20 {
              width: 20%;
            }
            .socials {
              padding-left: 5px;
            }
            .footer-side-right {
              min-width: 20%;
            }
            .main-layout {
              min-height: 100vh;
            }
            .full-height {
              height: 100%;
            }
            .vertical-bottom {
              min-height: 100%;
            }
            .footer-nav-ex {
              position: absolute;
              right: 0;
              bottom: 0;
              left: 0;
              text-align: center;
            }
            .footer-nav-ex-fix {
              height: 88px;
            }
            .footer-cover {
              min-height: 90px;
            }
            .swagup-big-banner {
              width: 172;
              height: 40px;
            }

            .empty-section-svg {
              width: 180px;
              height: 180px;
            }

            .submit-button {
              background-color: #3577d4 !important;
              color: #ffffff !important;
              text-decoration-line: none !important;
              width: 80%;
              padding-top: 14px !important;
              padding-bottom: 15px !important;
            }

            .carousel-indicators {
              margin: 0px !important;
            }

            .submit-button:hover {
              background-color: #2466c3 !important;
              color: #ffffff !important;
              font-weight: bold;
            }

            /* Fading animation */
            .fade {
              -webkit-animation-name: fade;
              -webkit-animation-duration: 1.5s;
              animation-name: fade;
              animation-duration: 1.5s;
            }

            @keyframes fadeInRight {
              0% {
                opacity: 0;
                bottom: 0%;
                left: 50%;
              }

              100% {
                opacity: 1;
                bottom: 0%;
                left: 50%;
                transform: translate(-50%, 0);
              }
            }

            @keyframes inRight {
              0% {
                bottom: 0%;
                left: 50%;
                transform: translate(100%, 0);
              }

              100% {
                bottom: 0%;
                transform: translate(0, 0);
              }
            }

            @keyframes outRight {
              0% {
                bottom: 0%;
                left: 50%;
                transform: translate(50%, 0);
              }

              100% {
                bottom: 0%;
                transform: translate(0, 0);
              }
            }

            @keyframes fadeInLeft {
              0% {
                opacity: 0;
                -webkit-transform: translateX(-50%);
                -ms-transform: translateX(-50%);
                transform: translateX(-50%);
              }

              100% {
                opacity: 1;
                -webkit-transform: translateX(0px);
                -ms-transform: translateX(0px);
                transform: translateX(0px);
              }
            }

            .in-right {
              -webkit-animation-name: inRight;
              animation-name: inRight;
              animation-duration: 0.2s;
            }

            .out-right {
              -webkit-animation-name: outRight;
              animation-name: outRight;
              animation-duration: 0.2s;
            }

            .category-paper:hover .bottom-button {
              -webkit-animation-name: fadeInRight;
              animation-name: fadeInRight;
            }

            .bottom-button {
              width: 100%;
              opacity: 0;
              position: absolute;
              bottom: 10px;
            }

            @keyframes moveUp {
              0% {
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
              }

              100% {
                -webkit-transform: translateY(-350%);
                -ms-transform: translateY(-350%);
                transform: translateY(-350%);
              }
            }

            .fadeInUp {
              -webkit-animation-name: fadeInUp;
              animation-name: fadeInUp;
            }
            .category-tittle {
              width: 100%;
              font-size: 22px;
              font-weight: bold;
              color: #ffffff;
              text-align: center;
              position: absolute;
              top: 50%;
              text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.75);
            }
            .icon-path {
              -webkit-filter: drop-shadow(0px 0px 12px #1c5375);
              filter: drop-shadow(0px 0px 12px #1c5375);
            }

            .button-path {
              -webkit-filter: drop-shadow(1px 1px 13px #1c5375);
              filter: drop-shadow(1px 1px 13px #1c5375);
            }

            .category-paper:hover .category-tittle {
              -webkit-animation-name: moveUp;
              animation-name: moveUp;
            }

            .category-slogan {
              width: 100%;
              top: 50%;
              text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.75);
              font-size: 18px;
              font-weight: normal;
              color: #ffffff;
              text-align: center;
              position: absolute;
              opacity: 0;
            }

            .category-paper:hover .category-slogan {
              -webkit-animation-name: fadeInLeft;
              animation-name: fadeInLeft;
            }

            @keyframes fade {
              from {
                opacity: 0.4;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes fadeOutLeft {
              0% {
                opacity: 0;
                -webkit-transform: translateX(0px);
                -ms-transform: translateX(0px);
                transform: translateX(0px);
              }

              100% {
                opacity: 1;
                -webkit-transform: translateX(-50%);
                -ms-transform: translateX(-50%);
                transform: translateX(-50%);
              }
            }

            .fade-out-left {
              -webkit-animation-name: fadeOutLeft;
              -webkit-animation-duration: 0.3s;
              animation-name: fadeOutLeft;
              animation-duration: 0.3s;
            }

            @media (max-width: 767px) {
              .swagup-big-banner {
                width: 92;
                height: 24px;
              }
              .logoBanner {
                width: 80px;
                height: 18px;
              }

              .swagupBanner {
                width: 70px;
                height: 18px;
              }

              .mobile-no {
                visibility: collapse !important;
                width: 0px !important;
              }
              .mobile-expand {
                width: 100%;
              }
              .mobile-easy-margin {
                margin: 0px 5% !important;
              }
              .mobile-socials {
                width: 15px;
                height: 15px;
                padding-left: 2px;
                margin-top: 10px;
              }
            }

            .delete-icon:hover {
              color: red;
            }

            @charset "UTF-8";
            .video-react .video-react-control:before,
            .video-react .video-react-big-play-button:before {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }

            .video-react .video-react-control:before,
            .video-react .video-react-big-play-button:before {
              text-align: center;
            }

            @font-face {
              font-family: "video-react";
              src: url(data:application/vnd.ms-fontobject;base64,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?#iefix)
                format("eot");
            }
            @font-face {
              font-family: "video-react";
              src: url(data:application/font-woff;base64,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)
                  format("woff"),
                url(data:application/x-font-ttf;base64,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)
                  format("truetype");
              font-weight: normal;
              font-style: normal;
            }
            .video-react-icon,
            .video-react .video-react-bezel .video-react-bezel-icon,
            .video-react .video-react-volume-level,
            .video-react .video-react-mute-control,
            .video-react .video-react-volume-menu-button,
            .video-react .video-react-play-control,
            .video-react .video-react-play-progress,
            .video-react .video-react-big-play-button {
              /* use !important to prevent issues with browser extensions that change fonts */
              font-family: "video-react" !important;
              speak: none;
              font-style: normal;
              font-weight: normal;
              font-variant: normal;
              text-transform: none;
              line-height: 1;
              /* Better Font Rendering =========== */
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            .video-react-icon-play-arrow:before,
            .video-react .video-react-bezel .video-react-bezel-icon-play:before,
            .video-react .video-react-play-control:before,
            .video-react .video-react-big-play-button:before {
              content: "";
            }

            .video-react-icon-play-circle-filled:before {
              content: "";
            }

            .video-react-icon-play-circle-outline:before {
              content: "";
            }

            .video-react-icon-pause:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-pause:before,
            .video-react .video-react-play-control.video-react-playing:before {
              content: "";
            }

            .video-react-icon-pause-circle-filled:before {
              content: "";
            }

            .video-react-icon-pause-circle-outline:before {
              content: "";
            }

            .video-react-icon-stop:before {
              content: "";
            }

            .video-react-icon-fast-rewind:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-fast-rewind:before {
              content: "";
            }

            .video-react-icon-fast-forward:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-fast-forward:before {
              content: "";
            }

            .video-react-icon-skip-previous:before {
              content: "";
            }

            .video-react-icon-skip-next:before {
              content: "";
            }

            .video-react-icon-replay-5:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-replay-5:before {
              content: "";
            }

            .video-react-icon-replay-10:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-replay-10:before {
              content: "";
            }

            .video-react-icon-replay-30:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-replay-30:before {
              content: "";
            }

            .video-react-icon-forward-5:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-forward-5:before {
              content: "";
            }

            .video-react-icon-forward-10:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-forward-10:before {
              content: "";
            }

            .video-react-icon-forward-30:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-forward-30:before {
              content: "";
            }

            .video-react-icon-volume-off:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-volume-off:before,
            .video-react .video-react-mute-control.video-react-vol-muted:before,
            .video-react
              .video-react-volume-menu-button.video-react-vol-muted:before {
              content: "";
            }

            .video-react-icon-volume-mute:before,
            .video-react .video-react-mute-control.video-react-vol-0:before,
            .video-react
              .video-react-volume-menu-button.video-react-vol-0:before {
              content: "";
            }

            .video-react-icon-volume-down:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-volume-down:before,
            .video-react .video-react-mute-control.video-react-vol-2:before,
            .video-react
              .video-react-volume-menu-button.video-react-vol-2:before,
            .video-react .video-react-mute-control.video-react-vol-1:before,
            .video-react
              .video-react-volume-menu-button.video-react-vol-1:before {
              content: "";
            }

            .video-react-icon-volume-up:before,
            .video-react
              .video-react-bezel
              .video-react-bezel-icon-volume-up:before,
            .video-react .video-react-mute-control:before,
            .video-react .video-react-volume-menu-button:before {
              content: "";
            }

            .video-react-icon-fullscreen:before {
              content: "";
            }

            .video-react-icon-fullscreen-exit:before {
              content: "";
            }

            .video-react-icon-closed-caption:before {
              content: "";
            }

            .video-react-icon-hd:before {
              content: "";
            }

            .video-react-icon-settings:before {
              content: "";
            }

            .video-react-icon-share:before {
              content: "";
            }

            .video-react-icon-info:before {
              content: "";
            }

            .video-react-icon-info-outline:before {
              content: "";
            }

            .video-react-icon-close:before {
              content: "";
            }

            .video-react-icon-circle:before,
            .video-react .video-react-volume-level:before,
            .video-react .video-react-play-progress:before {
              content: "";
            }

            .video-react-icon-circle-outline:before {
              content: "";
            }

            .video-react-icon-circle-inner-circle:before {
              content: "";
            }

            .video-react {
              display: block;
              vertical-align: top;
              box-sizing: border-box;
              color: #fff;
              background-color: #000;
              position: relative;
              font-size: 10px;
              line-height: 1;
              font-family: serif, Times, "Times New Roman";
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
            .video-react:-moz-full-screen {
              position: absolute;
            }
            .video-react:-webkit-full-screen {
              width: 100% !important;
              height: 100% !important;
            }
            .video-react *,
            .video-react *:before,
            .video-react *:after {
              box-sizing: inherit;
            }
            .video-react ul {
              font-family: inherit;
              font-size: inherit;
              line-height: inherit;
              list-style-position: outside;
              margin-left: 0;
              margin-right: 0;
              margin-top: 0;
              margin-bottom: 0;
            }
            .video-react.video-react-fluid,
            .video-react.video-react-16-9,
            .video-react.video-react-4-3 {
              width: 100%;
              max-width: 100%;
              height: 0;
            }
            .video-react.video-react-16-9 {
              padding-top: 56.25%;
            }
            .video-react.video-react-4-3 {
              padding-top: 75%;
            }
            .video-react.video-react-fill {
              width: 100%;
              height: 100%;
            }
            .video-react .video-react-video {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            .video-react.video-react-fullscreen {
              width: 100% !important;
              height: 100% !important;
              padding-top: 0 !important;
            }
            .video-react.video-react-fullscreen.video-react-user-inactive {
              cursor: none;
            }

            body.video-react-full-window {
              padding: 0;
              margin: 0;
              height: 100%;
              overflow-y: auto;
            }
            body.video-react-full-window .video-react-fullscreen {
              position: fixed;
              overflow: hidden;
              z-index: 1000;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
            }

            .video-react button {
              background: none;
              border: none;
              color: inherit;
              display: inline-block;
              cursor: pointer;
              overflow: visible;
              font-size: inherit;
              line-height: inherit;
              text-transform: none;
              text-decoration: none;
              transition: none;
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
            }

            .video-react .video-react-loading-spinner {
              display: none;
              position: absolute;
              top: 50%;
              left: 50%;
              margin: -25px 0 0 -25px;
              opacity: 0.85;
              text-align: left;
              border: 6px solid rgba(43, 51, 63, 0.7);
              box-sizing: border-box;
              background-clip: padding-box;
              width: 50px;
              height: 50px;
              border-radius: 25px;
            }
            .video-react .video-react-loading-spinner:before,
            .video-react .video-react-loading-spinner:after {
              content: "";
              position: absolute;
              margin: -6px;
              box-sizing: inherit;
              width: inherit;
              height: inherit;
              border-radius: inherit;
              opacity: 1;
              border: inherit;
              border-color: transparent;
              border-top-color: white;
              -webkit-animation: video-react-spinner-spin 1.1s
                  cubic-bezier(0.6, 0.2, 0, 0.8) infinite,
                video-react-spinner-fade 1.1s linear infinite;
              animation: video-react-spinner-spin 1.1s
                  cubic-bezier(0.6, 0.2, 0, 0.8) infinite,
                video-react-spinner-fade 1.1s linear infinite;
            }

            .video-react-seeking .video-react-loading-spinner,
            .video-react-waiting .video-react-loading-spinner {
              display: block;
            }

            .video-react-seeking .video-react-loading-spinner:before,
            .video-react-waiting .video-react-loading-spinner:before {
              border-top-color: white;
            }

            .video-react-seeking .video-react-loading-spinner:after,
            .video-react-waiting .video-react-loading-spinner:after {
              border-top-color: white;
              -webkit-animation-delay: 0.44s;
              animation-delay: 0.44s;
            }

            @keyframes video-react-spinner-spin {
              100% {
                transform: rotate(360deg);
              }
            }
            @-webkit-keyframes video-react-spinner-spin {
              100% {
                -webkit-transform: rotate(360deg);
              }
            }
            @keyframes video-react-spinner-fade {
              0% {
                border-top-color: #73859f;
              }
              20% {
                border-top-color: #73859f;
              }
              35% {
                border-top-color: white;
              }
              60% {
                border-top-color: #73859f;
              }
              100% {
                border-top-color: #73859f;
              }
            }
            @-webkit-keyframes video-react-spinner-fade {
              0% {
                border-top-color: #73859f;
              }
              20% {
                border-top-color: #73859f;
              }
              35% {
                border-top-color: white;
              }
              60% {
                border-top-color: #73859f;
              }
              100% {
                border-top-color: #73859f;
              }
            }
            .video-react .video-react-big-play-button {
              font-size: 3em;
              line-height: 1.5em;
              height: 1.5em;
              width: 3em;
              display: block;
              position: absolute;
              top: 10px;
              left: 10px;
              padding: 0;
              cursor: pointer;
              opacity: 1;
              border: 0.06666em solid #fff;
              background-color: #2b333f;
              background-color: rgba(43, 51, 63, 0.7);
              -webkit-border-radius: 0.3em;
              -moz-border-radius: 0.3em;
              border-radius: 0.3em;
              -webkit-transition: all 0.4s;
              -moz-transition: all 0.4s;
              -o-transition: all 0.4s;
              transition: all 0.4s;
            }
            .video-react
              .video-react-big-play-button.video-react-big-play-button-center {
              top: 50%;
              left: 50%;
              margin-top: -0.75em;
              margin-left: -1.5em;
            }
            .video-react .video-react-big-play-button.big-play-button-hide {
              display: none;
            }
            .video-react:hover .video-react-big-play-button,
            .video-react .video-react-big-play-button:focus {
              outline: 0;
              border-color: #fff;
              background-color: #73859f;
              background-color: rgba(115, 133, 159, 0.5);
              -webkit-transition: all 0s;
              -moz-transition: all 0s;
              -o-transition: all 0s;
              transition: all 0s;
            }

            .video-react-menu-button {
              cursor: pointer;
            }
            .video-react-menu-button.video-react-disabled {
              cursor: default;
            }

            .video-react-menu .video-react-menu-content {
              display: block;
              padding: 0;
              margin: 0;
              overflow: auto;
              font-family: serif, Times, "Times New Roman";
            }
            .video-react-menu li {
              list-style: none;
              margin: 0;
              padding: 0.2em 0;
              line-height: 1.4em;
              font-size: 1.2em;
              text-align: center;
              text-transform: lowercase;
            }
            .video-react-menu li:focus,
            .video-react-menu li:hover {
              outline: 0;
              background-color: #73859f;
              background-color: rgba(115, 133, 159, 0.5);
            }
            .video-react-menu li.video-react-selected,
            .video-react-menu li.video-react-selected:focus,
            .video-react-menu li.video-react-selected:hover {
              background-color: #fff;
              color: #2b333f;
            }
            .video-react-menu li.vjs-menu-title {
              text-align: center;
              text-transform: uppercase;
              font-size: 1em;
              line-height: 2em;
              padding: 0;
              margin: 0 0 0.3em 0;
              font-weight: bold;
              cursor: default;
            }

            .video-react-scrubbing .vjs-menu-button:hover .video-react-menu {
              display: none;
            }

            .video-react .video-react-menu-button-popup .video-react-menu {
              display: none;
              position: absolute;
              bottom: 0;
              width: 10em;
              left: -3em;
              height: 0em;
              margin-bottom: 1.5em;
              border-top-color: rgba(43, 51, 63, 0.7);
            }
            .video-react
              .video-react-menu-button-popup
              .video-react-menu
              .video-react-menu-content {
              background-color: #2b333f;
              background-color: rgba(43, 51, 63, 0.7);
              position: absolute;
              width: 100%;
              bottom: 1.5em;
              max-height: 15em;
            }

            .video-react-menu-button-popup
              .video-react-menu.video-react-lock-showing {
              display: block;
            }

            .video-react .video-react-menu-button-inline {
              -webkit-transition: all 0.4s;
              -moz-transition: all 0.4s;
              -o-transition: all 0.4s;
              transition: all 0.4s;
              overflow: hidden;
            }
            .video-react .video-react-menu-button-inline:before {
              width: 2.222222222em;
            }
            .video-react .video-react-menu-button-inline:hover,
            .video-react .video-react-menu-button-inline:focus,
            .video-react
              .video-react-menu-button-inline.video-react-slider-active {
              width: 12em;
            }
            .video-react
              .video-react-menu-button-inline:hover
              .video-react-menu,
            .video-react
              .video-react-menu-button-inline:focus
              .video-react-menu,
            .video-react
              .video-react-menu-button-inline.video-react-slider-active
              .video-react-menu {
              display: block;
              opacity: 1;
            }
            .video-react
              .video-react-menu-button-inline.video-react-slider-active {
              -webkit-transition: none;
              -moz-transition: none;
              -o-transition: none;
              transition: none;
            }
            .video-react .video-react-menu-button-inline .video-react-menu {
              opacity: 0;
              height: 100%;
              width: auto;
              position: absolute;
              left: 4em;
              top: 0;
              padding: 0;
              margin: 0;
              -webkit-transition: all 0.4s;
              -moz-transition: all 0.4s;
              -o-transition: all 0.4s;
              transition: all 0.4s;
            }
            .video-react
              .video-react-menu-button-inline
              .video-react-menu-content {
              width: auto;
              height: 100%;
              margin: 0;
              overflow: hidden;
            }

            .video-react-no-flex
              .video-react-menu-button-inline
              .video-react-menu {
              display: block;
              opacity: 1;
              position: relative;
              width: auto;
            }
            .video-react-no-flex .video-react-menu-button-inline:hover,
            .video-react-no-flex .video-react-menu-button-inline:focus,
            .video-react-no-flex
              .video-react-menu-button-inline.video-react-slider-active {
              width: auto;
            }

            .video-react .video-react-poster {
              display: inline-block;
              vertical-align: middle;
              background-repeat: no-repeat;
              background-position: 50% 50%;
              background-size: contain;
              background-color: #000000;
              cursor: pointer;
              margin: 0;
              padding: 0;
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              height: 100%;
            }
            .video-react .video-react-poster img {
              display: block;
              vertical-align: middle;
              margin: 0 auto;
              max-height: 100%;
              padding: 0;
              width: 100%;
            }

            .video-react .video-react-slider {
              outline: 0;
              position: relative;
              cursor: pointer;
              padding: 0;
              margin: 0 0.45em 0 0.45em;
              background-color: #73859f;
              background-color: rgba(115, 133, 159, 0.5);
            }
            .video-react .video-react-slider:focus {
              text-shadow: 0em 0em 1em white;
              -webkit-box-shadow: 0 0 1em #fff;
              -moz-box-shadow: 0 0 1em #fff;
              box-shadow: 0 0 1em #fff;
            }

            .video-react .video-react-control {
              outline: none;
              position: relative;
              text-align: center;
              margin: 0;
              padding: 0;
              height: 100%;
              width: 4em;
              -webkit-box-flex: none;
              -moz-box-flex: none;
              -webkit-flex: none;
              -ms-flex: none;
              flex: none;
            }
            .video-react .video-react-control:before {
              font-size: 1.8em;
              line-height: 1.67;
            }
            .video-react .video-react-control:focus:before,
            .video-react .video-react-control:hover:before,
            .video-react .video-react-control:focus {
              text-shadow: 0em 0em 1em white;
            }

            .video-react .video-react-control-text {
              border: 0;
              clip: rect(0 0 0 0);
              height: 1px;
              margin: -1px;
              overflow: hidden;
              padding: 0;
              position: absolute;
              width: 1px;
            }

            .video-react-no-flex .video-react-control {
              display: table-cell;
              vertical-align: middle;
            }

            .video-react .video-react-control-bar {
              display: none;
              width: 100%;
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 3em;
              background-color: #2b333f;
              background-color: rgba(43, 51, 63, 0.7);
            }

            .video-react-has-started .video-react-control-bar {
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              visibility: visible;
              opacity: 1;
              -webkit-transition: visibility 0.1s, opacity 0.1s;
              -moz-transition: visibility 0.1s, opacity 0.1s;
              -o-transition: visibility 0.1s, opacity 0.1s;
              transition: visibility 0.1s, opacity 0.1s;
            }

            .video-react-has-started.video-react-user-inactive.video-react-playing
              .video-react-control-bar.video-react-control-bar-auto-hide {
              visibility: visible;
              opacity: 0;
              -webkit-transition: visibility 1s, opacity 1s;
              -moz-transition: visibility 1s, opacity 1s;
              -o-transition: visibility 1s, opacity 1s;
              transition: visibility 1s, opacity 1s;
            }

            .video-react-controls-disabled .video-react-control-bar,
            .video-react-using-native-controls .video-react-control-bar,
            .video-react-error .video-react-control-bar {
              display: none !important;
            }

            .video-react-audio.video-react-has-started.video-react-user-inactive.video-react-playing
              .video-react-control-bar {
              opacity: 1;
              visibility: visible;
            }

            .video-react-has-started.video-react-no-flex
              .video-react-control-bar {
              display: table;
            }

            .video-react .video-react-progress-control {
              -webkit-box-flex: auto;
              -moz-box-flex: auto;
              -webkit-flex: auto;
              -ms-flex: auto;
              flex: auto;
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -webkit-align-items: center;
              -ms-flex-align: center;
              align-items: center;
              min-width: 4em;
            }

            .video-react-live .video-react-progress-control {
              display: none;
            }

            .video-react .video-react-progress-holder {
              -webkit-box-flex: auto;
              -moz-box-flex: auto;
              -webkit-flex: auto;
              -ms-flex: auto;
              flex: auto;
              -webkit-transition: all 0.2s;
              -moz-transition: all 0.2s;
              -o-transition: all 0.2s;
              transition: all 0.2s;
              height: 0.3em;
            }

            .video-react
              .video-react-progress-control:hover
              .video-react-progress-holder {
              font-size: 1.6666666667em;
            }

            /* If we let the font size grow as much as everything else, the current time tooltip ends up
   ginormous. If you'd like to enable the current time tooltip all the time, this should be disabled
   to avoid a weird hitch when you roll off the hover. */
            .video-react
              .video-react-progress-control:hover
              .video-react-time-tooltip,
            .video-react
              .video-react-progress-control:hover
              .video-react-mouse-display:after,
            .video-react
              .video-react-progress-control:hover
              .video-react-play-progress:after {
              visibility: visible;
              font-size: 0.6em;
            }

            .video-react
              .video-react-progress-holder
              .video-react-play-progress,
            .video-react
              .video-react-progress-holder
              .video-react-load-progress,
            .video-react
              .video-react-progress-holder
              .video-react-tooltip-progress-bar,
            .video-react
              .video-react-progress-holder
              .video-react-load-progress
              div {
              position: absolute;
              display: block;
              height: 0.3em;
              margin: 0;
              padding: 0;
              width: 0;
              left: 0;
              top: 0;
            }

            .video-react .video-react-play-progress {
              background-color: #fff;
            }
            .video-react .video-react-play-progress:before {
              position: absolute;
              top: -0.3333333333em;
              right: -0.5em;
              font-size: 0.9em;
            }

            .video-react .video-react-time-tooltip,
            .video-react .video-react-mouse-display:after,
            .video-react .video-react-play-progress:after {
              visibility: hidden;
              pointer-events: none;
              position: absolute;
              top: -3.4em;
              right: -1.9em;
              font-size: 0.9em;
              color: #000;
              content: attr(data-current-time);
              padding: 6px 8px 8px 8px;
              background-color: #fff;
              background-color: rgba(255, 255, 255, 0.8);
              -webkit-border-radius: 0.3em;
              -moz-border-radius: 0.3em;
              border-radius: 0.3em;
            }

            .video-react .video-react-time-tooltip,
            .video-react .video-react-play-progress:before,
            .video-react .video-react-play-progress:after {
              z-index: 1;
            }

            .video-react
              .video-react-progress-control
              .video-react-keep-tooltips-inside:after {
              display: none;
            }

            .video-react .video-react-load-progress {
              background: #bfc7d3;
              background: rgba(115, 133, 159, 0.5);
            }

            .video-react .video-react-load-progress div {
              background: white;
              background: rgba(115, 133, 159, 0.75);
            }

            .video-react.video-react-no-flex .video-react-progress-control {
              width: auto;
            }

            .video-react .video-react-time-tooltip {
              display: inline-block;
              height: 2.4em;
              position: relative;
              float: right;
              right: -1.9em;
            }

            .video-react .video-react-tooltip-progress-bar {
              visibility: hidden;
            }

            .video-react
              .video-react-progress-control
              .video-react-mouse-display {
              display: none;
              position: absolute;
              width: 1px;
              height: 100%;
              background-color: #000;
              z-index: 1;
            }

            .video-react-no-flex
              .video-react-progress-control
              .video-react-mouse-display {
              z-index: 0;
            }

            .video-react
              .video-react-progress-control:hover
              .video-react-mouse-display {
              display: block;
            }

            .video-react.video-react-user-inactive
              .video-react-progress-control
              .video-react-mouse-display,
            .video-react.video-react-user-inactive
              .video-react-progress-control
              .video-react-mouse-display:after {
              visibility: hidden;
              opacity: 0;
              -webkit-transition: visibility 1s, opacity 1s;
              -moz-transition: visibility 1s, opacity 1s;
              -o-transition: visibility 1s, opacity 1s;
              transition: visibility 1s, opacity 1s;
            }

            .video-react.video-react-user-inactive.video-react-no-flex
              .video-react-progress-control
              .video-react-mouse-display,
            .video-react.video-react-user-inactive.video-react-no-flex
              .video-react-progress-control
              .video-react-mouse-display:after {
              display: none;
            }

            .video-react .video-react-mouse-display .video-react-time-tooltip,
            .video-react
              .video-react-progress-control
              .video-react-mouse-display:after {
              color: #fff;
              background-color: #000;
              background-color: rgba(0, 0, 0, 0.8);
            }

            .video-react .video-react-play-control {
              cursor: pointer;
              -webkit-box-flex: none;
              -moz-box-flex: none;
              -webkit-flex: none;
              -ms-flex: none;
              flex: none;
            }
            .video-react .video-react-fullscreen-control {
              cursor: pointer;
              -webkit-box-flex: none;
              -moz-box-flex: none;
              -webkit-flex: none;
              -ms-flex: none;
              flex: none;
            }

            .video-react.video-react-fullscreen {
              position: fixed;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              z-index: 9999;
            }

            .video-react .video-react-time-control {
              -webkit-box-flex: none;
              -moz-box-flex: none;
              -webkit-flex: none;
              -ms-flex: none;
              flex: none;
              font-size: 1em;
              line-height: 3em;
              min-width: 2em;
              width: auto;
              padding-left: 1em;
              padding-right: 1em;
            }
            .video-react .video-react-time-divider {
              line-height: 3em;
              min-width: initial;
              padding: 0;
            }

            .video-react .video-react-mute-control,
            .video-react .video-react-volume-menu-button {
              cursor: pointer;
              -webkit-box-flex: none;
              -moz-box-flex: none;
              -webkit-flex: none;
              -ms-flex: none;
              flex: none;
            }
            .video-react .video-react-volume-control {
              width: 5em;
              -webkit-box-flex: none;
              -moz-box-flex: none;
              -webkit-flex: none;
              -ms-flex: none;
              flex: none;
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -webkit-align-items: center;
              -ms-flex-align: center;
              align-items: center;
            }
            .video-react .video-react-volume-bar {
              margin: 1.35em 0.45em;
            }
            .video-react .video-react-volume-bar.video-react-slider-horizontal {
              width: 5em;
              height: 0.3em;
            }
            .video-react
              .video-react-volume-bar.video-react-slider-horizontal
              .video-react-volume-level {
              width: 100%;
            }
            .video-react .video-react-volume-bar.video-react-slider-vertical {
              width: 0.3em;
              height: 5em;
              margin: 1.35em auto;
            }
            .video-react
              .video-react-volume-bar.video-react-slider-vertical
              .video-react-volume-level {
              height: 100%;
            }
            .video-react .video-react-volume-level {
              position: absolute;
              bottom: 0;
              left: 0;
              background-color: #fff;
            }
            .video-react .video-react-volume-level:before {
              position: absolute;
              font-size: 0.9em;
            }
            .video-react
              .video-react-slider-vertical
              .video-react-volume-level {
              width: 0.3em;
            }
            .video-react
              .video-react-slider-vertical
              .video-react-volume-level:before {
              top: -0.5em;
              left: -0.3em;
            }
            .video-react
              .video-react-slider-horizontal
              .video-react-volume-level {
              height: 0.3em;
            }
            .video-react
              .video-react-slider-horizontal
              .video-react-volume-level:before {
              top: -0.3em;
              right: -0.5em;
            }
            .video-react
              .video-react-menu-button-popup.video-react-volume-menu-button
              .video-react-menu {
              display: block;
              width: 0;
              height: 0;
              border-top-color: transparent;
            }
            .video-react
              .video-react-menu-button-popup.video-react-volume-menu-button-vertical
              .video-react-menu {
              left: 0.5em;
              height: 8em;
            }
            .video-react
              .video-react-menu-button-popup.video-react-volume-menu-button-horizontal
              .video-react-menu {
              left: -2em;
            }
            .video-react
              .video-react-menu-button-popup.video-react-volume-menu-button
              .video-react-menu-content {
              height: 0;
              width: 0;
              overflow-x: hidden;
              overflow-y: hidden;
            }
            .video-react
              .video-react-volume-menu-button-vertical:hover
              .video-react-menu-content,
            .video-react
              .video-react-volume-menu-button-vertical:focus
              .video-react-menu-content,
            .video-react
              .video-react-volume-menu-button-vertical.video-react-slider-active
              .video-react-menu-content,
            .video-react
              .video-react-volume-menu-button-vertical
              .video-react-lock-showing
              .video-react-menu-content {
              height: 8em;
              width: 2.9em;
            }
            .video-react
              .video-react-volume-menu-button-horizontal:hover
              .video-react-menu-content,
            .video-react
              .video-react-volume-menu-button-horizontal:focus
              .video-react-menu-content,
            .video-react
              .video-react-volume-menu-button-horizontal
              .video-react-slider-active
              .video-react-menu-content,
            .video-react
              .video-react-volume-menu-button-horizontal
              .video-react-lock-showing
              .video-react-menu-content {
              height: 2.9em;
              width: 8em;
            }
            .video-react
              .video-react-volume-menu-button.video-react-menu-button-inline
              .video-react-menu-content {
              background-color: transparent !important;
            }

            .video-react
              .video-react-playback-rate
              .video-react-playback-rate-value {
              line-height: 3em;
              text-align: center;
            }
            .video-react .video-react-playback-rate .video-react-menu {
              width: 4em;
              left: 0em;
            }

            .video-react .video-react-bezel {
              position: absolute;
              left: 50%;
              top: 50%;
              width: 52px;
              height: 52px;
              z-index: 17;
              margin-left: -26px;
              margin-top: -26px;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 26px;
            }
            .video-react .video-react-bezel.video-react-bezel-animation {
              -moz-animation: video-react-bezel-fadeout 0.5s linear 1 normal
                forwards;
              -webkit-animation: video-react-bezel-fadeout 0.5s linear 1 normal
                forwards;
              animation: video-react-bezel-fadeout 0.5s linear 1 normal forwards;
              pointer-events: none;
            }
            .video-react .video-react-bezel.video-react-bezel-animation-alt {
              -moz-animation: video-react-bezel-fadeout-alt 0.5s linear 1 normal
                forwards;
              -webkit-animation: video-react-bezel-fadeout-alt 0.5s linear 1
                normal forwards;
              animation: video-react-bezel-fadeout-alt 0.5s linear 1 normal
                forwards;
              pointer-events: none;
            }
            .video-react .video-react-bezel .video-react-bezel-icon {
              width: 36px;
              height: 36px;
              margin: 8px;
              font-size: 26px;
              line-height: 36px;
              text-align: center;
            }
            @keyframes video-react-bezel-fadeout {
              0% {
                opacity: 1;
              }
              to {
                opacity: 0;
                transform: scale(2);
              }
            }
            @keyframes video-react-bezel-fadeout-alt {
              0% {
                opacity: 1;
              }
              to {
                opacity: 0;
                transform: scale(2);
              }
            }

            .image-gallery-icon {
              color: #fff;
              transition: all 0.2s ease-out;
              appearance: none;
              background-color: transparent;
              border: 0;
              cursor: pointer;
              outline: none;
              position: absolute;
              z-index: 4;
              filter: drop-shadow(0 2px 2px #1a1a1a);
            }
            @media (min-width: 768px) {
              .image-gallery-icon:hover {
                color: #1c5375;
              }
              .image-gallery-icon:hover .image-gallery-svg {
                transform: scale(1.1);
              }
            }
            .image-gallery-icon:focus {
              outline: 2px solid #1c5375;
            }

            .image-gallery-using-mouse .image-gallery-icon:focus {
              outline: none;
            }

            .image-gallery-fullscreen-button,
            .image-gallery-play-button {
              bottom: 0;
              padding: 20px;
            }
            .image-gallery-fullscreen-button .image-gallery-svg,
            .image-gallery-play-button .image-gallery-svg {
              height: 36px;
              width: 36px;
            }
            @media (max-width: 768px) {
              .image-gallery-fullscreen-button,
              .image-gallery-play-button {
                padding: 15px;
              }
              .image-gallery-fullscreen-button .image-gallery-svg,
              .image-gallery-play-button .image-gallery-svg {
                height: 24px;
                width: 24px;
              }
            }
            @media (max-width: 480px) {
              .image-gallery-fullscreen-button,
              .image-gallery-play-button {
                padding: 10px;
              }
              .image-gallery-fullscreen-button .image-gallery-svg,
              .image-gallery-play-button .image-gallery-svg {
                height: 16px;
                width: 16px;
              }
            }

            .image-gallery-fullscreen-button {
              right: 0;
            }

            .image-gallery-play-button {
              left: 0;
            }

            .image-gallery-left-nav,
            .image-gallery-right-nav {
              padding: 50px 0px;
              top: 50%;
              transform: translateY(-50%);
            }
            .image-gallery-left-nav .image-gallery-svg,
            .image-gallery-right-nav .image-gallery-svg {
              height: 56px;
              width: 56px;
            }
            @media (max-width: 768px) {
              .image-gallery-left-nav .image-gallery-svg,
              .image-gallery-right-nav .image-gallery-svg {
                height: 72px;
                width: 36px;
              }
            }
            @media (max-width: 480px) {
              .image-gallery-left-nav .image-gallery-svg,
              .image-gallery-right-nav .image-gallery-svg {
                height: 48px;
                width: 24px;
              }
            }
            .image-gallery-left-nav[disabled],
            .image-gallery-right-nav[disabled] {
              cursor: disabled;
              opacity: 0.6;
              pointer-events: none;
            }

            .image-gallery-left-nav {
              left: 0;
            }

            .image-gallery-right-nav {
              right: 0;
            }

            .image-gallery {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              -o-user-select: none;
              user-select: none;
              -webkit-tap-highlight-color: transparent;
              position: relative;
            }
            .image-gallery.fullscreen-modal {
              background: #000;
              bottom: 0;
              height: 100%;
              left: 0;
              position: fixed;
              right: 0;
              top: 0;
              width: 100%;
              z-index: 5;
            }
            .image-gallery.fullscreen-modal .image-gallery-content {
              top: 50%;
              transform: translateY(-50%);
            }

            .image-gallery-content {
              position: relative;
              line-height: 0;
              top: 0;
            }
            .image-gallery-content.fullscreen {
              background: #000;
            }
            .image-gallery-content .image-gallery-slide .image-gallery-image {
              max-height: calc(100vh - 80px);
            }
            .image-gallery-content.left
              .image-gallery-slide
              .image-gallery-image,
            .image-gallery-content.right
              .image-gallery-slide
              .image-gallery-image {
              max-height: 100vh;
            }

            .image-gallery-slide-wrapper {
              position: relative;
            }
            .image-gallery-slide-wrapper.left,
            .image-gallery-slide-wrapper.right {
              display: inline-block;
              width: calc(100% - 110px);
            }
            @media (max-width: 768px) {
              .image-gallery-slide-wrapper.left,
              .image-gallery-slide-wrapper.right {
                width: calc(100% - 87px);
              }
            }
            .image-gallery-slide-wrapper.image-gallery-rtl {
              direction: rtl;
            }

            .image-gallery-slides {
              line-height: 0;
              overflow: hidden;
              position: relative;
              white-space: nowrap;
              text-align: center;
            }

            .image-gallery-slide {
              left: 0;
              position: absolute;
              top: 0;
              width: 100%;
            }
            .image-gallery-slide.center {
              position: relative;
            }
            .image-gallery-slide .image-gallery-image {
              width: 100%;
              object-fit: contain;
              height: 424px;
            }
            .image-gallery-slide .image-gallery-description {
              background: rgba(0, 0, 0, 0.4);
              bottom: 70px;
              color: #fff;
              left: 0;
              line-height: 1;
              padding: 10px 20px;
              position: absolute;
              white-space: normal;
            }
            @media (max-width: 768px) {
              .image-gallery-slide .image-gallery-description {
                bottom: 45px;
                font-size: 0.8em;
                padding: 8px 15px;
              }
            }

            .image-gallery-bullets {
              bottom: 20px;
              left: 0;
              margin: 0 auto;
              position: absolute;
              right: 0;
              width: 80%;
              z-index: 4;
            }
            .image-gallery-bullets .image-gallery-bullets-container {
              margin: 0;
              padding: 0;
              text-align: center;
            }
            .image-gallery-bullets .image-gallery-bullet {
              appearance: none;
              background-color: transparent;
              border: 1px solid #fff;
              border-radius: 50%;
              box-shadow: 0 1px 0 #1a1a1a;
              cursor: pointer;
              display: inline-block;
              margin: 0 5px;
              outline: none;
              padding: 5px;
              transition: background 0.2s ease-out;
            }
            @media (max-width: 768px) {
              .image-gallery-bullets .image-gallery-bullet {
                margin: 0 3px;
                padding: 3px;
              }
            }
            @media (max-width: 480px) {
              .image-gallery-bullets .image-gallery-bullet {
                padding: 2.7px;
              }
            }
            .image-gallery-bullets .image-gallery-bullet:focus,
            .image-gallery-bullets .image-gallery-bullet:hover {
              background: #1c5375;
              transform: scale(1.1);
            }
            .image-gallery-bullets .image-gallery-bullet.active {
              background: #fff;
            }

            .image-gallery-thumbnails-wrapper {
              position: relative;
            }
            .image-gallery-thumbnails-wrapper.thumbnails-wrapper-rtl {
              direction: rtl;
            }
            .image-gallery-thumbnails-wrapper.left,
            .image-gallery-thumbnails-wrapper.right {
              display: inline-block;
              vertical-align: top;
              width: 100px;
            }
            @media (max-width: 768px) {
              .image-gallery-thumbnails-wrapper.left,
              .image-gallery-thumbnails-wrapper.right {
                width: 81px;
              }
            }
            .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails,
            .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails {
              height: 100%;
              width: 100%;
              left: 0;
              padding: 0;
              position: absolute;
              top: 0;
            }
            .image-gallery-thumbnails-wrapper.left
              .image-gallery-thumbnails
              .image-gallery-thumbnail,
            .image-gallery-thumbnails-wrapper.right
              .image-gallery-thumbnails
              .image-gallery-thumbnail {
              display: block;
              margin-right: 0;
              padding: 0;
            }
            .image-gallery-thumbnails-wrapper.left
              .image-gallery-thumbnails
              .image-gallery-thumbnail
              + .image-gallery-thumbnail,
            .image-gallery-thumbnails-wrapper.right
              .image-gallery-thumbnails
              .image-gallery-thumbnail
              + .image-gallery-thumbnail {
              margin-left: 0;
              margin-top: 2px;
            }
            .image-gallery-thumbnails-wrapper.left,
            .image-gallery-thumbnails-wrapper.right {
              margin: 0 5px;
            }
            @media (max-width: 768px) {
              .image-gallery-thumbnails-wrapper.left,
              .image-gallery-thumbnails-wrapper.right {
                margin: 0 3px;
              }
            }

            .image-gallery-thumbnails {
              overflow: hidden;
              padding: 5px 0;
            }
            @media (max-width: 768px) {
              .image-gallery-thumbnails {
                padding: 3px 0;
              }
            }
            .image-gallery-thumbnails .image-gallery-thumbnails-container {
              cursor: pointer;
              text-align: center;
              transition: transform 0.45s ease-out;
              white-space: nowrap;
            }

            .image-gallery-thumbnail {
              display: inline-block;
              border: 4px solid transparent;
              transition: border 0.3s ease-out;
              width: 100px;
              background: transparent;
              padding: 0;
            }
            @media (max-width: 768px) {
              .image-gallery-thumbnail {
                border: 3px solid transparent;
                width: 81px;
              }
            }
            .image-gallery-thumbnail + .image-gallery-thumbnail {
              margin-left: 2px;
            }
            .image-gallery-thumbnail .image-gallery-thumbnail-inner {
              position: relative;
            }
            .image-gallery-thumbnail .image-gallery-thumbnail-image {
              vertical-align: middle;
              width: 100%;
              line-height: 0;
            }
            .image-gallery-thumbnail.active,
            .image-gallery-thumbnail:hover,
            .image-gallery-thumbnail:focus {
              outline: none;
              border: 4px solid #1c5375;
            }
            @media (max-width: 768px) {
              .image-gallery-thumbnail.active,
              .image-gallery-thumbnail:hover,
              .image-gallery-thumbnail:focus {
                border: 3px solid #1c5375;
              }
            }

            .image-gallery-thumbnail-label {
              box-sizing: border-box;
              color: white;
              font-size: 1em;
              left: 0;
              line-height: 1em;
              padding: 5%;
              position: absolute;
              top: 50%;
              text-shadow: 1px 1px 0 black;
              transform: translateY(-50%);
              white-space: normal;
              width: 100%;
            }
            @media (max-width: 768px) {
              .image-gallery-thumbnail-label {
                font-size: 0.8em;
                line-height: 0.8em;
              }
            }

            .image-gallery-index {
              background: rgba(0, 0, 0, 0.4);
              color: #fff;
              line-height: 1;
              padding: 10px 20px;
              position: absolute;
              right: 0;
              top: 0;
              z-index: 4;
            }
            @media (max-width: 768px) {
              .image-gallery-index {
                font-size: 0.8em;
                padding: 5px 10px;
              }
            }

            .StripeElement {
              height: 40px;
              padding: 10px 12px;
              width: 100%;
              color: #32325d;
              background-color: white;
              border: 1px solid transparent;
              border-radius: 4px;

              box-shadow: 0 1px 3px 0 #e6ebf1;
              -webkit-transition: box-shadow 150ms ease;
              transition: box-shadow 150ms ease;
            }

            .StripeElement--focus {
              box-shadow: 0 1px 3px 0 #cfd7df;
            }

            .StripeElement--invalid {
              border-color: #fa755a;
            }

            .StripeElement--webkit-autofill {
              background-color: #fefde5 !important;
            }
          `}
        </style>
      </div>
    );
  }
}

Layout = withReactRouter(Layout);

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <Helmet
          meta={[
            { property: "og:title", content: "Irial 3D" },
            {
              property: "og:image",
              content:
                "https://vinalestraveler.com/static/images/home/vinales_traveler.jpg",
            },
            { property: "og:image:alt", content: "Irial 3D Tour Comany" },
            {
              property: "og:description",
              content:
                'Irial 3D is a Tour Guide Company based in Pinar del Río, Cuba. We mostly offer ecological and sightseeing tours in Viñales and the rest of Pinar del Río province. Also a very populated catalog of Viñales’s attractions and lodgings."',
            },
            { property: "fb:app_id", content: "269776263974713" },
          ]}
        >
          <meta charset="utf-8" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/images/public/irial-transparency-logo.png"
          />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="robots" content="index, follow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            property="og:image"
            content="https://vinalestraveler.com/static/images/home/vinales_traveler.jpg"
          />
          <meta property="og:image:alt" content="Vinales Traveler" />
          <meta
            property="og:description"
            content="Irial 3D is a Tour Guide Company based in Pinar del Río, Cuba. We mostly offer ecological and sightseeing tours in Viñales and the rest of Pinar del Río province. Also a very populated catalog of Viñales’s attractions and lodgings."
          />
          <meta property="og:title" content="Vinales Traveler" />
          <meta property="og:app_id" content="269776263974713" />
          <meta name="author" content="Vinales Traveler" />
          <link rel="shortlink" href="https://vinalestraveler.com" />
          <meta name="theme-color" content="#viewport" />
          <link rel="manifest" href="/static/manifest.json" />
          <link href="/static/dist/css/animate.min.css" rel="stylesheet"></link>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-140620388-1"
          ></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'UA-140620388-1');`}
          </script>
        </Helmet>
        <Provider store={reduxStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </>
    );
  }
}

export default withReduxStore(MyApp);
