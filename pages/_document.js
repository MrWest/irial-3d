import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import Helmet from "react-helmet";

export default class MyDocument extends Document {
  static getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {sheets.getStyleElement()}
        </React.Fragment>,
      ],
      helmet: Helmet.renderStatic(),
    };
  };

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter((el) => el !== "htmlAttributes" && el !== "bodyAttributes")
      .map((el) => this.props.helmet[el].toComponent());
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charset="utf-8" />
          {this.helmetHeadComponents}
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
          <script src="/static/dist/js/jquery.js"></script>
          <script src="/static/dist/js/wow.min.js"></script>
          <script src="/static/dist/js/mousescroll.js"></script>
          <script src="/static/dist/js/smoothscroll.js"></script>
          <script src="https://js.stripe.com/v3/" async></script>
        </body>
      </html>
    );
  }
}
