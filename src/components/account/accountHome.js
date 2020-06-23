import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import VerticalTabsTool from "../verticalTabsTool";
import { Grid } from "@material-ui/core";
import Profile from "./profile";
import Billing from "./billing";
import BusinessHome from "./business/businessHome";
import { connect } from "react-redux";
import { loadProfile, selectAccountView } from "../../actions";
import {Helmet} from 'react-helmet';
import {
  required,
  email,
  length,
  numericality,
  format
} from "redux-form-validators";


function IconProfile({ fill }) {
  return (
    <svg width="20px" height="18px" viewBox="0 0 20 18">
      <g
        id="ACCOUNT"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="COMPANY"
          transform="translate(-122.000000, -150.000000)"
          fill={fill}
        >
          <g id="Info-icon" transform="translate(120.000000, 147.000000)">
            <path
              d="M5,17 C5,15.159 6.159,14 8,14 C9.841,14 11,15.159 11,17 L5,17 Z M10,11 C10,12.104 9.104,13 8,13 C6.896,13 6,12.104 6,11 C6,9.896 6.896,9 8,9 C9.104,9 10,9.896 10,11 Z M19,11.9995 C19,12.5517847 18.5490248,12.9995 18.009222,12.9995 L13.990778,12.9995 C13.4435864,12.9995 13,12.5556352 13,11.9995 C13,11.4472153 13.4509752,10.9995 13.990778,10.9995 L18.009222,10.9995 C18.5564136,10.9995 19,11.4433648 19,11.9995 Z M19,15.9995 C19,16.5517847 18.5490248,16.9995 18.009222,16.9995 L13.990778,16.9995 C13.4435864,16.9995 13,16.5556352 13,15.9995 C13,15.4472153 13.4509752,14.9995 13.990778,14.9995 L18.009222,14.9995 C18.5564136,14.9995 19,15.4433648 19,15.9995 Z M4,19 L20.001,19 L20,7 L14.815,7 C14.401,8.162 13.302,9 12,9 C10.698,9 9.599,8.162 9.185,7 L4,7 L4,19 Z M12,5 C11.449,5 11,5.449 11,6 C11,6.551 11.449,7 12,7 C12.551,7 13,6.551 13,6 C13,5.449 12.551,5 12,5 Z M20,5 C21.103,5 22,5.896 22,7 L22,19 C22,20.103 21.103,21 20,21 L4,21 C2.897,21 2,20.103 2,19 L2,7 C2,5.896 2.897,5 4,5 L9.185,5 C9.599,3.838 10.698,3 12,3 C13.302,3 14.401,3.838 14.815,5 L20,5 Z"
              id="Combined-Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

function IconCompany({ fill }) {
  return (
    <svg width="20px" height="24px" viewBox="0 0 20 18">
      <g
        id="ACCOUNT"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="COMPANY"
          transform="translate(-122.000000, -197.000000)"
          fill={fill}
        >
          <g
            id="Company-icon-blue"
            transform="translate(120.000000, 195.000000)"
          >
            <path
              d="M9,10 L9,8 L11,8 L11,10 L9,10 Z M13,10 L13,8 L15,8 L15,10 L13,10 Z M9,14 L9,12 L11,12 L11,14 L9,14 Z M13,14 L13,12 L15,12 L15,14 L13,14 Z M5,18 L5,16 L7,16 L7,18 L5,18 Z M9,18 L9,16 L11,16 L11,18 L9,18 Z M13,18 L13,16 L15,16 L15,18 L13,18 Z M17,18 L17,16 L19,16 L19,18 L17,18 Z M20,21 L20,15 L17,15 C16.448,15 16,14.552 16,14 L16,6 L14,6 C13.448,6 13,5.552 13,5 L13,4 L11,4 L11,5 C11,5.552 10.552,6 10,6 L8,6 L8,14 C8,14.552 7.552,15 7,15 L4,15 L4,21 L10,21 L10,19 L14,19 L14,21 L20,21 Z M21,13 C21.552,13 22,13.448 22,14 L22,22 C22,22.552 21.552,23 21,23 L3,23 C2.448,23 2,22.552 2,22 L2,14 C2,13.448 2.448,13 3,13 L6,13 L6,5 C6,4.448 6.448,4 7,4 L9,4 L9,3 C9,2.448 9.448,2 10,2 L14,2 C14.552,2 15,2.448 15,3 L15,4 L17,4 C17.552,4 18,4.448 18,5 L18,13 L21,13 Z"
              id="Combined-Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

function IconBilling({ fill }) {
  return (
    <svg width="20px" height="22px" viewBox="0 0 20 18">
      <g
        id="ACCOUNT"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="COMPANY"
          transform="translate(-122.000000, -245.000000)"
          fill={fill}
        >
          <g id="Billing" transform="translate(120.000000, 243.000000)">
            <path
              d="M20,15.9996588 L20,11.9996588 L15.414,11.9996588 L13.414,13.9996588 L15.414,15.9996588 L20,15.9996588 Z M17.997,19.9996588 L17.998,17.9996588 L15,17.9996588 C14.735,17.9996588 14.48,17.8936588 14.293,17.7076588 L11.293,14.7076588 C10.902,14.3156588 10.902,13.6836588 11.293,13.2926588 L14.293,10.2926588 C14.48,10.1056588 14.735,9.99965885 15,9.99965885 L18,9.99965885 L18,7.99965885 L4,7.99965885 L4,19.9996588 L17.997,19.9996588 Z M14.517,4.26965885 L10.193,5.99965885 L15.382,5.99965885 L14.517,4.26965885 Z M21,9.99965885 C21.552,9.99965885 22,10.4476588 22,10.9996588 L22,16.9996588 C22,17.5516588 21.552,17.9996588 21,17.9996588 L20,17.9996588 L20,19.9996588 C20,21.1026588 19.103,21.9996588 18,21.9996588 L4,21.9996588 C2.897,21.9996588 2,21.1026588 2,19.9996588 L2,7.99965885 C2,6.89665885 2.897,5.99965885 4,5.99965885 L4.807,5.99965885 L14.628,2.07165885 C15.112,1.87865885 15.662,2.08765885 15.895,2.55265885 L17.618,5.99965885 L18,5.99965885 C19.103,5.99965885 20,6.89665885 20,7.99965885 L20,9.99965885 L21,9.99965885 Z M15,13.9996588 C15,13.4486588 15.448,12.9996588 16,12.9996588 C16.552,12.9996588 17,13.4486588 17,13.9996588 C17,14.5526588 16.552,14.9996588 16,14.9996588 C15.448,14.9996588 15,14.5526588 15,13.9996588 Z"
              id="Combined-Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

class AccountHome extends Component {

  componentDidMount() {
    const { loadProfile, loginInfo } = this.props;
    if(loginInfo.id)
      loadProfile(loginInfo.id);
  }

  verticalText(text){

    var chars = []
    for(var index = 0; index < text.length; index++) {
     chars.push({char: text[index]})
    }

    return (
      <div>
      {chars.map(char =>(
        <div style={{lineHeight: 1, margin: "auto", width: 30, textAlign: "center", textTransform: "sentence"}}> <strong>{char.char}</strong></div>
      ))}
      </div>
    )
  }
  render() {
    const { classes, valid, stripe_account_status, profileStipeInfo } = this.props;

    const labels = [
      {
        normal: (        

          <div style={{ textAlign: "center", width: "100%", height: 30}}>
            <IconProfile fill="#434C5F" />
             {/* {this.verticalText( "Profile")} */}
          </div>
         
            
          // </Grid>
        ),
        selected: (
         
          <div style={{color: "#3577d4", textAlign: "center", width: "100%", height: 30}}>
            <IconProfile fill="#3577d4" />
             {/* {this.verticalText( "Profile")} */}
          </div>
         
          
          // </Grid>
        )
      },
      {
        normal: (
        
        
          <div style={{textAlign: "center", width: "100%", height: 30}}>
           <IconCompany fill="#434C5F" />
             {/* {this.verticalText( "Business")}  */}
          </div>
           
        
        ),
        selected: (
          
             <div style={{color: "#3577d4", textAlign: "center", width: "100%", height: 30}}>
               <IconCompany fill="#3577d4" />
              {/* {this.verticalText( "Business")}  */}
            </div>
            
         
        )
      },
      // {
      //   normal: (
        
        
      //     <div style={{textAlign: "center", width: "100%", height: 30}}>
      //      <IconBilling fill="#434C5F" />
      //        {/* {this.verticalText( "Business")}  */}
      //     </div>
           
        
      //   ),
      //   selected: (
          
      //        <div style={{color: "#3577d4", textAlign: "center", width: "100%", height: 30}}>
      //          <IconBilling fill="#3577d4" />
      //         {/* {this.verticalText( "Business")}  */}
      //       </div>
            
         
      //   )
      // },
     
    ];

    if(!this.props.sign.isLogged || this.props.loginInfo.type === "visitor")
    return (null)

    return (
      <div className={classes.container}>
        <Helmet>
              <title>Irial 3D | Account</title>
              <meta name="description" content="This is what you want to show as the page content in the Google SERP Listing" />
           </Helmet>
       <section className={parseInt(this.props.accountView) === 1 && this.props.loginInfo.type === "business"?classes.cover: null} >
   
      <Grid container justify="center" spacing={0}>
       <Grid item className={classes.center}>
       
            <Grid container spacing={0}>
              <Grid item xs={12} style={{paddingTop: 60}}>
                <VerticalTabsTool
                  labels={labels}
                  index={parseInt(this.props.accountView)}
                  onChange={index => this.props.selectAccountView(index)}
                >
                  <Profile profileStipeInfo={profileStipeInfo} stripe_account_status={stripe_account_status}/>
                  <BusinessHome/>
                  {/* <Billing company={this.props.company} stripe_account_status={stripe_account_status} /> */}
                  {/* <Company company={this.props.company} />
                  <Billing company={this.props.company} /> */}
                </VerticalTabsTool>
              </Grid>
               </Grid>
        
            </Grid>
        </Grid>
        </section>
      </div>
    );
  }
}

const styles = theme => ({
  alignRight: {
    textAlign: "right"
  },
  container: {
    paddingTop: 107,
     paddingBottom: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    verticalAlign: "top",
    minHeight: "70vh",
    [theme.breakpoints.up("sm")]: {
      backgroundImage: "url(../images/account/home.svg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      backgroundSize: "contain",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundOpacity: 0.5
    }
  },
  center: {   
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1280px"
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1180px"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      paddingLeft: "16px !important",
      paddingRight: "16px !important",
      minWidth: "100vw"
    }
  }, 
  inner: {
    paddingTop: 40
  },
  aproveButton: {
    backgroundColor: "#3577d4",
    color: "#ffffff",
    textDecorationLine: "none !important",
    paddingTop: 14,
     paddingBottom: 14,
    width: "100%"
  },
  cancelButton: {
    textDecorationLine: "none !important",
    fontSize: 16,
    paddingTop: 18,
     paddingBottom: 14,
    fontWeight: "bold",
    width: "100%",
    display: "block",
    cursor: "pointer",
    color: "#3577d4 !important",
    textAlign: "right"
  }
});


const mapStateToProps = state => {
  return {
    accountView: state.accountView,
    sign: state.sign,
    loginInfo: state.sign.loginInfo
  };
};
export default connect(
  mapStateToProps,
  { loadProfile,  selectAccountView }
)(withStyles(styles)(AccountHome));
