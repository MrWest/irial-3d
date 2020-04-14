import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Player } from 'video-react';
import {
    Carousel,
    CarouselCaption,
    CarouselInner,
    CarouselItem,
    View,
    Mask
  } from "mdbreact";
import TourCarouselTool from "./tourCarouselTool"




  function CarouselContent({imageUrl, child, alt}){

    return (
                       <div style={{position: "relative",  textAlign: "center",}}>
                        <img   alt={alt} style={{width: "100%", borderTopLeftRadius: 4, objectFit: "cover" }} src={imageUrl}/>
                            <div style={{position: "absolute", bottom: 0, left: "50%",transform: "translate(-50%, -50%)"}}>
                              
  
                                {child}
                              
                            </div>
                        </div>
    )
  }
  function CarouselVideoContent({videoUrl, child}){

    return (
                      

                    <div style={{position: "relative",  textAlign: "center",}}>
                      
                        <Player
                            playsInline
                            style={{width: "100%", borderTopLeftRadius: 4, maxHeight: "50vh"}} 
                            src={videoUrl}
                            />
                            <div style={{position: "absolute", bottom: 0, left: "50%",transform: "translate(-50%, -50%)"}}>
                              
  
                                {child}
                              
                            </div>
                        </div>
                        
                         
    )
  }

class ResourceTabs extends Component {
    state = { selectedIndex: 0 }

    handleChange = (event, value) => {
        this.setState({selectedIndex: value})
      };
    render() { 
        const { classes, theme, images, videos, tabs } = this.props;
        return ( 
            <div className={classes.root}>
            <div>
              <Tabs
                value={this.state.selectedIndex}    
                onChange={this.handleChange}            
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
              >
                {tabs.map( (tab, index) => (
                              <Tab label={tab} className={classes.tabItem} />
                          ))}
                
              </Tabs>
            </div>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.selectedIndex}
              // onChangeIndex={this.handleChangeIndex}
            >
             <div>

             {(images!==undefined && images.length>0) &&
             
             <TourCarouselTool>
                          {images.map( (img, index) => (
                             
                                <CarouselContent imageUrl={img.url} alt={img.caption} child={(<p style={{fontWeight: "bold", color: "#ffffff", textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)"}}>{img.caption}</p>)}/>
                            
                          ))}
                   </TourCarouselTool>
             }
                  

             </div>

             <div>
             {(videos!==undefined && videos.length>0) &&
             <TourCarouselTool>
                {videos.map( (vid, index) => (
                             
                                 <CarouselVideoContent key={index} videoUrl={vid.url} child={(<p style={{fontWeight: "bold", color: "#ffffff", textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)"}}>{vid.caption}</p>)}/>
                               
                          ))}
             </TourCarouselTool>
           }

             </div>
               </SwipeableViews>
          </div>
      
         );
    }
}
const styles = theme => ({
    root: {
      // backgroundColor: theme.palette.background.paper,
      width: "100%",
      minHeight: 300
    },
    tabItem: {
      opacity: "0.54",
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: "bold",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      textTransform: "none",
      color: "#434c5f",
      minWidth: 140,
      width: 130,
      [theme.breakpoints.down("sm")]: {
        flexGrow: 0,
        fontSize: 12
      }
    }
  });
ResourceTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired
  };
 
export default withStyles(styles, { withTheme: true })(ResourceTabs);