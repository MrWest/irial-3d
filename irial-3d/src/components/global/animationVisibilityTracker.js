import React from 'react';
import { Animated } from 'react-animated-css';
import TrackVisibility from 'react-on-screen';

const ComponentToTrack = ({ isVisible, children, animationIn, animationOut }) => (
  <Animated animationIn={animationIn} animationOut={animationOut} isVisible={isVisible}>
    {children}
  </Animated>
);

const AnimationVisibilityTracker = ({ children, animationIn, animationOut }) => (
  <TrackVisibility>
    <ComponentToTrack animationIn={animationIn} animationOut={animationOut}>
      {children}
    </ComponentToTrack>
  </TrackVisibility>
);

export default AnimationVisibilityTracker;
