import React from "react";
import { Link } from "react-router-dom";
import LinkServer from 'next/link';
import { HashLink } from 'react-router-hash-link';

const isServer = typeof window === 'undefined';

export function ImageLink({ href, children }) {

  return isServer? (<LinkServer href={href}>
    {children}
  </LinkServer>) : (
    <Link to={href}>
      {children}
    </Link>
  )

}

export function FontMovilButton({ className, href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      style={{ display: "table" }}
    >
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal"
        }}
      >
        {" "}
        {children}
      </div>
    </a>
  );
}

export function StandarButton({ className, href, children, onClick }) {
  return (
    <a href={href} onClick={onClick} className={className}>
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textTransform: "uppercase"
        }}
      >
        {" "}
        {children}
      </div>
    </a>
  );
}

export function FixedButton({ className, href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      style={{
        display: "table",
        borderRadius: 4,
        width: 282,
        backgroundColor: "#188218",
        color: "#ffffff",
        textDecorationLine: "none",
        paddingTop: 14,
        paddingBottom: 15
      }}
    >
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textAlign: "center",
          textTransform: "uppercase"
        }}
      >
        {" "}
        {children}
      </div>
    </a>
  );
}
export function FixedButtonInverse({ className, href, children, onClick, color }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      style={{
        display: "table",
        borderRadius: 4,
        width: 282,
        backgroundColor: "#ffffff",
        color: color? color : "#188218",
        textDecorationLine: "none",
        paddingTop: 14,
        paddingBottom: 15
      }}
    >
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textAlign: "center",
          textTransform: "uppercase"
        }}
      >
        {" "}
        {children}
      </div>
    </a>
  );
}
export function CustomWidthButton({
  className,
  href,
  children,
  width,
  onClick
}) {
  return (
    <button
      type="submit"
      href={href}
      onClick={onClick}
      className={className}
      style={{
        display: "table",
        cursor: "pointer",
        textAlign: "center !important",
        border: 0,
        borderRadius: 4,
        width: width == undefined ? "auto" : width,
        backgroundColor: "#188218",
        color: "#ffffff",
        textDecorationLine: "none",
        paddingTop: 14,
        paddingBottom: 14
      }}
    >
      <div
        style={{
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textAlign: "center",
          textTransform: "uppercase"
        }}
      >
        {" "}
        {children}
      </div>
    </button>
  );
}

export function CustomWidthButtonInverse({
  className,
  href,
  children,
  width,
  onClick
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      style={{
        display: "table",
        borderRadius: 4,
        width: width == undefined ? "auto" : width,
        backgroundColor: "#ffffff",
        color: "#3577d4",
        textDecorationLine: "none",
        paddingTop: 14,
        paddingBottom: 15
      }}
    >
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textAlign: "center",
          textTransform: "uppercase"
        }}
      >
        {" "}
        {children}
      </div>
    </a>
  );
}

export function CustomWidthButtonLink({
  className,
  href,
  children,
  width,
  onClick
}) {
  return (
    <a
      type="submit"
      href={href}
      onClick={onClick}
      className={className}
      style={{
        display: "table",
        cursor: "pointer",
        textAlign: "center !important",
        border: 0,
        borderRadius: 4,
        width: width == undefined ? "auto" : width,
        backgroundColor: "#3577d4",
        color: "#ffffff",
        textDecorationLine: "none",
        paddingTop: 14,
        paddingBottom: 14
      }}
    >
      <div
        style={{
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textAlign: "center",
          textTransform: "uppercase"
        }}
      >
        {" "}
        {children}
      </div>
    </a>
  );
}


export function CoolButton({
  className,
  href,
  children,
  width,
  height,
  fill,
  color,
  onClick,
  disabled
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      href={href}
      onClick={onClick}
      className={className}
      style={{
      
        cursor: "pointer",
        textAlign: "center !important",
        border: 0,
        padding: 0,
        backgroundColor: "transparent",
        borderRadius: 4,
        color: "#ffffff",
        textDecorationLine: "none",
        outline: "none"
      }}
    >
    <div style={{position: "relative", textAlign: "center"}}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width={width? width : "583pt"} height={height? height : "128pt"} viewBox="0 0 583.000000 128.000000"
              preserveAspectRatio="xMidYMid meet">
              <metadata>
              
              </metadata>
              <g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
              fill={fill? fill : "#ffffff"} stroke="none">
              <path d="M695 1200 l-30 -8 32 -1 c61 -2 46 -21 -17 -21 -41 0 -66 -5 -76 -15
              -9 -8 -26 -15 -40 -15 -13 0 -24 -4 -24 -8 0 -10 64 -38 107 -47 70 -14 40
              -25 -65 -23 -89 2 -114 -1 -135 -15 -15 -10 -27 -21 -27 -26 0 -10 95 -51 119
              -51 9 0 29 -7 45 -15 15 -8 39 -15 52 -15 32 0 40 -18 12 -29 -13 -6 -17 -10
              -10 -10 7 -1 22 3 32 9 13 7 21 5 31 -7 12 -15 12 -16 -4 -10 -12 4 -31 -2
              -54 -17 -19 -14 -42 -22 -49 -19 -8 3 -25 2 -39 -1 -22 -6 -24 -9 -12 -26 10
              -17 9 -22 -2 -29 -7 -5 -11 -13 -7 -19 3 -6 -9 -15 -28 -22 -44 -14 -56 -29
              -46 -56 6 -16 15 -20 32 -17 14 3 31 -4 46 -17 19 -18 33 -21 82 -18 32 1 56
              0 54 -4 -2 -3 3 -14 12 -23 9 -9 15 -17 13 -19 -9 -7 -100 -26 -123 -26 -27 0
              -35 -15 -13 -23 14 -6 -22 -9 -80 -7 -25 1 -43 -3 -43 -9 0 -6 -18 -18 -40
              -27 -22 -9 -40 -23 -40 -30 0 -8 -7 -17 -15 -20 -8 -4 -15 -12 -15 -19 0 -7
              -4 -15 -10 -17 -5 -1 -12 -17 -16 -34 -5 -27 -2 -32 18 -39 12 -4 25 -8 28 -9
              3 -2 19 -6 35 -11 17 -4 39 -14 50 -21 13 -9 50 -14 107 -14 65 0 90 -4 102
              -16 9 -8 16 -13 16 -10 0 3 14 0 31 -6 l32 -11 -24 -14 c-23 -13 -23 -14 11
              -8 50 10 190 11 222 2 15 -4 30 -16 33 -27 3 -11 17 -23 31 -26 13 -3 24 -10
              24 -16 0 -5 -4 -6 -10 -3 -5 3 -10 2 -10 -3 0 -12 25 -22 55 -22 31 0 40 -16
              18 -29 -13 -7 -4 -9 38 -9 30 0 68 -6 84 -14 17 -9 36 -13 43 -11 7 3 19 0 26
              -6 10 -9 15 -8 20 5 4 9 13 14 21 10 8 -3 15 -1 15 4 0 7 577 10 1640 10 902
              -1 1640 -5 1640 -9 0 -14 56 -18 68 -5 7 7 28 10 54 7 24 -2 76 -5 116 -6 39
              -1 72 -4 72 -7 0 -3 33 -3 72 1 47 4 75 3 80 -4 4 -6 29 -8 65 -4 33 4 64 3
              69 -1 5 -4 27 -5 49 -1 36 5 37 6 10 8 -16 1 -39 6 -50 11 -15 7 -10 9 25 10
              25 1 57 1 71 0 16 -1 29 5 32 14 4 9 18 16 32 16 43 0 27 24 -28 42 -30 10
              -61 18 -70 18 -10 0 -17 4 -17 10 0 6 42 9 108 8 89 -2 112 1 135 16 15 10 27
              22 27 26 0 9 -93 48 -138 56 -18 4 -35 11 -38 15 -3 5 -18 9 -34 9 -35 0 -47
              15 -23 30 15 9 12 10 -14 5 -19 -4 -34 -2 -39 6 -5 9 -1 11 14 7 13 -4 29 2
              43 15 15 14 33 20 56 19 45 -3 56 4 42 30 -9 16 -8 22 2 29 8 5 14 14 14 20 0
              7 16 18 35 24 29 10 35 17 35 41 -1 25 -4 29 -24 26 -14 -1 -32 6 -43 18 -15
              16 -31 20 -77 20 -56 0 -91 16 -73 34 4 4 2 7 -3 6 -6 -1 -14 -2 -20 -1 -25 5
              98 31 163 35 89 5 108 16 28 16 -31 0 -55 4 -52 8 3 5 28 7 56 4 37 -3 56 0
              69 12 9 9 32 21 49 27 18 6 32 16 32 23 0 6 11 23 23 36 13 14 26 38 29 53 6
              31 -16 50 -72 62 -19 4 -44 13 -55 20 -11 7 -63 15 -115 18 -56 3 -96 9 -98
              16 -2 6 -13 11 -25 11 -12 0 -28 4 -35 9 -18 11 6 21 51 22 18 0 41 4 52 8 22
              9 -121 3 -145 -6 -40 -15 -194 -8 -184 8 3 5 -1 9 -8 9 -8 0 -21 9 -31 20 -9
              11 -24 20 -32 20 -8 0 -15 5 -15 11 0 5 4 7 10 4 6 -3 10 -2 10 3 0 12 -25 22
              -55 22 -26 0 -41 15 -25 25 22 13 -1 22 -44 18 -34 -4 -54 0 -80 15 -24 14
              -36 17 -39 9 -3 -9 -8 -9 -18 1 -17 16 -29 15 -29 -2 0 -8 -8 -15 -17 -14 -10
              0 -757 -3 -1660 -8 -1092 -5 -1643 -4 -1643 3 0 5 -13 10 -30 10 -16 0 -27 -4
              -24 -9 3 -4 -17 -8 -45 -8 -27 0 -51 4 -53 10 -3 11 -28 13 -110 7 -32 -2 -55
              0 -52 4 3 5 -8 7 -23 4 -88 -13 -112 -14 -119 -4 -4 8 -28 10 -70 6 -39 -4
              -64 -2 -64 3 0 11 -2 11 -45 0z"/>
              </g>
            </svg>
    
  
  
       <div
        style={{
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textAlign: "center",
          textTransform: "uppercase",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: color? color : "#ffffff"
        }}
      >
       
        {children}
      </div>
    </div>
    
      
    </button>
  );
}

export function CoolButtonSign({
  className,
  href,
  children,
  width,
  height,
  fill,
  color,
  onClick,
  disabled,
  type = 'submit'
}) {

  let viewBox = "0 0 ";
  viewBox += width? width : "504.000000"
  viewBox += " "
  viewBox += height? height : "142.000000"
  return (
    <button
      type={type}
      disabled={disabled}
      href={href}
      onClick={onClick}
      className={className}
      style={{
      
        cursor: "pointer",
        textAlign: "center !important",
        border: 0,
        padding: 0,
        backgroundColor: "transparent",
        borderRadius: 4,
        color: "#ffffff",
        textDecorationLine: "none",
        outline: "none"
      }}
    >
    <div style={{position: "relative", textAlign: "center"}}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width={width? width : "504pt"} height={height? height : "142pt"} viewBox={viewBox}
              preserveAspectRatio="xMidYMid meet">
              <metadata>
              
              </metadata>
              
             <g transform="translate(-15.000000,65.000000) scale(0.07000,-0.055000)"
            fill={fill? fill : "#ffffff"} stroke="none">
          <path d="M4160 1255 c0 -13 -190 -15 -1597 -15 -1039 0 -1593 4 -1583 10 13 8
          13 10 -2 10 -9 0 -19 -4 -22 -9 -9 -13 -54 -19 -65 -8 -5 5 -44 11 -86 12 -69
          3 -78 2 -82 -16 -3 -12 -14 -19 -29 -19 -13 0 -24 -4 -24 -10 0 -5 11 -10 25
          -10 14 0 25 -5 25 -11 0 -17 -32 -38 -57 -39 -18 0 -23 -6 -23 -25 0 -15 -9
          -29 -23 -36 -12 -7 -23 -12 -24 -11 -10 7 -22 0 -18 -10 7 -19 -7 -36 -34 -39
          -14 -2 -26 -9 -28 -16 -3 -8 12 -10 49 -8 52 4 53 4 29 -13 -14 -9 -39 -17
          -55 -17 -19 0 -30 -5 -29 -12 2 -7 -9 -15 -25 -18 -15 -3 -41 -10 -58 -16 -17
          -5 -39 -7 -48 -3 -9 3 -16 1 -16 -5 0 -6 9 -11 20 -11 24 0 24 -2 6 -60 -7
          -25 -12 -62 -10 -82 3 -37 -10 -47 -28 -23 -5 6 -8 6 -8 -2 0 -6 -18 -14 -40
          -18 -43 -7 -65 -25 -31 -25 12 0 21 -4 21 -10 0 -5 7 -10 15 -10 7 0 18 -7 23
          -16 5 -9 13 -17 18 -17 5 -1 7 -6 5 -12 -2 -5 -3 -18 -3 -27 0 -12 -7 -18 -22
          -18 -12 0 -26 -3 -30 -7 -3 -4 -16 -8 -28 -10 -25 -4 -34 -10 -26 -19 3 -3 22
          1 41 9 31 13 36 13 50 0 12 -12 12 -19 2 -41 -7 -15 -15 -41 -18 -58 -6 -29
          -2 -34 44 -63 34 -21 63 -31 90 -31 41 0 129 -34 129 -49 0 -5 -6 -12 -12 -14
          -7 -3 -1 -6 15 -6 15 -1 27 2 27 7 0 11 70 6 107 -8 18 -7 31 -16 28 -20 -7
          -11 36 -41 47 -34 5 4 7 13 4 21 -4 10 0 13 12 11 9 -2 18 -13 20 -25 3 -18
          -3 -22 -30 -25 l-33 -4 33 -13 c25 -10 31 -18 27 -32 -5 -16 -2 -18 27 -14 21
          3 39 -2 50 -12 10 -9 21 -13 25 -10 3 4 12 2 20 -4 10 -9 13 -8 13 5 0 15 131
          16 1600 16 1273 0 1600 -3 1600 -12 0 -10 3 -9 9 1 6 9 19 12 42 7 102 -20
          218 -12 181 12 -9 6 -3 9 19 10 52 1 61 22 9 22 -39 0 -42 1 -26 13 10 8 30
          12 45 10 21 -3 23 -2 7 5 -16 7 -17 10 -5 18 8 4 21 9 29 9 8 0 15 7 16 15 2
          35 5 39 34 45 32 7 39 22 15 31 -16 6 -11 24 6 24 6 0 7 -6 3 -12 -6 -10 -5
          -10 7 -1 8 6 25 13 39 15 42 5 22 23 -25 22 -33 -1 -42 2 -38 12 3 8 9 11 14
          8 5 -3 9 -1 9 4 0 5 12 8 27 6 30 -3 57 8 51 22 -3 9 64 24 110 26 27 0 29 14
          3 21 -20 5 -20 6 -1 54 13 34 15 54 9 66 -13 22 8 67 22 46 5 -9 9 -10 9 -2 0
          6 15 14 33 18 55 11 67 16 67 27 0 6 -9 8 -20 5 -11 -3 -20 -2 -20 3 0 4 -8
          11 -17 14 -41 15 -61 32 -53 46 4 7 6 19 3 27 -3 9 3 13 21 13 14 0 26 5 26
          12 0 6 -3 8 -7 5 -3 -4 -13 3 -21 15 -11 15 -12 23 -4 26 6 2 9 9 6 17 -3 7
          -1 16 5 20 6 3 11 19 11 35 0 45 -68 85 -160 94 -36 4 -59 12 -68 23 -7 10
          -15 17 -17 16 -11 -6 -25 -2 -25 7 0 6 11 10 24 10 14 0 28 5 32 11 4 7 0 9
          -12 6 -44 -12 -119 -18 -155 -12 -33 6 -43 13 -56 41 -9 18 -20 31 -25 28 -4
          -3 -5 2 -2 10 4 10 -4 16 -25 21 -27 6 -30 9 -20 27 10 19 9 20 -13 15 -15 -4
          -39 1 -61 12 -25 13 -38 15 -41 7 -3 -7 -5 -7 -5 2 -1 17 -21 15 -21 -3z"/>
          </g>
          </svg>
    
  
  
       <div
        style={{
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textAlign: "center",
          textTransform: "uppercase",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: color? color : "#ffffff",
          width: "100%"
        }}
      >
       
        {children}
      </div>
    </div>
    
      
    </button>
  );
}




export function CoolLink({
  className,
  href,
  children,
  width,
  height,
  fill,
  color,
  onClick,
  disabled,
  svgClass,
  ...custom
}) {
  return (
    <Link
      
      disabled={disabled}
      to={href?href:"#"}
      onClick={onClick}
      className={className}
      style={{
      
        cursor: "pointer",
        textAlign: "center !important",
        border: 0,
        padding: 0,
        backgroundColor: "transparent",
        borderRadius: 4,
        color: "#ffffff",
        textDecorationLine: "none",
        outline: "none",
        width: width? width : "583pt",
         height: height? height : "128pt"
      }}

      {...custom}
    >
    <div style={{position: "relative", textAlign: "center", width: width? width : "583pt",
         height: height? height : "128pt"}}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width={width? width : "583pt"} height={height? height : "128pt"} viewBox="0 0 583.000000 128.000000"
              preserveAspectRatio="xMidYMid meet" className={svgClass}>
              <metadata>
              
              </metadata>
              <g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
              fill={fill? fill : "#ffffff"} stroke="none" >
              <path  d="M695 1200 l-30 -8 32 -1 c61 -2 46 -21 -17 -21 -41 0 -66 -5 -76 -15
              -9 -8 -26 -15 -40 -15 -13 0 -24 -4 -24 -8 0 -10 64 -38 107 -47 70 -14 40
              -25 -65 -23 -89 2 -114 -1 -135 -15 -15 -10 -27 -21 -27 -26 0 -10 95 -51 119
              -51 9 0 29 -7 45 -15 15 -8 39 -15 52 -15 32 0 40 -18 12 -29 -13 -6 -17 -10
              -10 -10 7 -1 22 3 32 9 13 7 21 5 31 -7 12 -15 12 -16 -4 -10 -12 4 -31 -2
              -54 -17 -19 -14 -42 -22 -49 -19 -8 3 -25 2 -39 -1 -22 -6 -24 -9 -12 -26 10
              -17 9 -22 -2 -29 -7 -5 -11 -13 -7 -19 3 -6 -9 -15 -28 -22 -44 -14 -56 -29
              -46 -56 6 -16 15 -20 32 -17 14 3 31 -4 46 -17 19 -18 33 -21 82 -18 32 1 56
              0 54 -4 -2 -3 3 -14 12 -23 9 -9 15 -17 13 -19 -9 -7 -100 -26 -123 -26 -27 0
              -35 -15 -13 -23 14 -6 -22 -9 -80 -7 -25 1 -43 -3 -43 -9 0 -6 -18 -18 -40
              -27 -22 -9 -40 -23 -40 -30 0 -8 -7 -17 -15 -20 -8 -4 -15 -12 -15 -19 0 -7
              -4 -15 -10 -17 -5 -1 -12 -17 -16 -34 -5 -27 -2 -32 18 -39 12 -4 25 -8 28 -9
              3 -2 19 -6 35 -11 17 -4 39 -14 50 -21 13 -9 50 -14 107 -14 65 0 90 -4 102
              -16 9 -8 16 -13 16 -10 0 3 14 0 31 -6 l32 -11 -24 -14 c-23 -13 -23 -14 11
              -8 50 10 190 11 222 2 15 -4 30 -16 33 -27 3 -11 17 -23 31 -26 13 -3 24 -10
              24 -16 0 -5 -4 -6 -10 -3 -5 3 -10 2 -10 -3 0 -12 25 -22 55 -22 31 0 40 -16
              18 -29 -13 -7 -4 -9 38 -9 30 0 68 -6 84 -14 17 -9 36 -13 43 -11 7 3 19 0 26
              -6 10 -9 15 -8 20 5 4 9 13 14 21 10 8 -3 15 -1 15 4 0 7 577 10 1640 10 902
              -1 1640 -5 1640 -9 0 -14 56 -18 68 -5 7 7 28 10 54 7 24 -2 76 -5 116 -6 39
              -1 72 -4 72 -7 0 -3 33 -3 72 1 47 4 75 3 80 -4 4 -6 29 -8 65 -4 33 4 64 3
              69 -1 5 -4 27 -5 49 -1 36 5 37 6 10 8 -16 1 -39 6 -50 11 -15 7 -10 9 25 10
              25 1 57 1 71 0 16 -1 29 5 32 14 4 9 18 16 32 16 43 0 27 24 -28 42 -30 10
              -61 18 -70 18 -10 0 -17 4 -17 10 0 6 42 9 108 8 89 -2 112 1 135 16 15 10 27
              22 27 26 0 9 -93 48 -138 56 -18 4 -35 11 -38 15 -3 5 -18 9 -34 9 -35 0 -47
              15 -23 30 15 9 12 10 -14 5 -19 -4 -34 -2 -39 6 -5 9 -1 11 14 7 13 -4 29 2
              43 15 15 14 33 20 56 19 45 -3 56 4 42 30 -9 16 -8 22 2 29 8 5 14 14 14 20 0
              7 16 18 35 24 29 10 35 17 35 41 -1 25 -4 29 -24 26 -14 -1 -32 6 -43 18 -15
              16 -31 20 -77 20 -56 0 -91 16 -73 34 4 4 2 7 -3 6 -6 -1 -14 -2 -20 -1 -25 5
              98 31 163 35 89 5 108 16 28 16 -31 0 -55 4 -52 8 3 5 28 7 56 4 37 -3 56 0
              69 12 9 9 32 21 49 27 18 6 32 16 32 23 0 6 11 23 23 36 13 14 26 38 29 53 6
              31 -16 50 -72 62 -19 4 -44 13 -55 20 -11 7 -63 15 -115 18 -56 3 -96 9 -98
              16 -2 6 -13 11 -25 11 -12 0 -28 4 -35 9 -18 11 6 21 51 22 18 0 41 4 52 8 22
              9 -121 3 -145 -6 -40 -15 -194 -8 -184 8 3 5 -1 9 -8 9 -8 0 -21 9 -31 20 -9
              11 -24 20 -32 20 -8 0 -15 5 -15 11 0 5 4 7 10 4 6 -3 10 -2 10 3 0 12 -25 22
              -55 22 -26 0 -41 15 -25 25 22 13 -1 22 -44 18 -34 -4 -54 0 -80 15 -24 14
              -36 17 -39 9 -3 -9 -8 -9 -18 1 -17 16 -29 15 -29 -2 0 -8 -8 -15 -17 -14 -10
              0 -757 -3 -1660 -8 -1092 -5 -1643 -4 -1643 3 0 5 -13 10 -30 10 -16 0 -27 -4
              -24 -9 3 -4 -17 -8 -45 -8 -27 0 -51 4 -53 10 -3 11 -28 13 -110 7 -32 -2 -55
              0 -52 4 3 5 -8 7 -23 4 -88 -13 -112 -14 -119 -4 -4 8 -28 10 -70 6 -39 -4
              -64 -2 -64 3 0 11 -2 11 -45 0z"/>
              </g>
            </svg>
    
  
  
       <div
        style={{
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textAlign: "center",
          textTransform: "uppercase",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: color? color : "#ffffff"
        }}
      >
       
        {children}
      </div>
      <style jsx>{`
        .icon-path {
          -webkit-filter: drop-shadow( 0px 0px 12px #188218);
          filter: drop-shadow( 0px 0px 12px #188218);
        }
        
        
        .button-path {
          -webkit-filter: drop-shadow( 1px 1px 13px #188218);
          filter: drop-shadow( 1px 1px 13px #188218);
        }
        
      `}</style>

    </div>
    
      
    </Link>
  );
}

export function CoolHashLink({
  className,
  href,
  children,
  width,
  height,
  fill,
  color,
  onClick,
  disabled,
  ...custom
}) {
  return (
    <HashLink
    smooth 
      disabled={disabled}
      to={href?href:"#"}
      onClick={onClick}
      className={className}
      style={{
      
        cursor: "pointer",
        textAlign: "center !important",
        border: 0,
        padding: 0,
        backgroundColor: "transparent",
        borderRadius: 4,
        color: "#ffffff",
        textDecorationLine: "none",
        outline: "none",
        width: width? width : "583pt",
         height: height? height : "128pt"
      }}

      {...custom}
    >
    <div style={{position: "relative", textAlign: "center", width: width? width : "583pt",
         height: height? height : "128pt"}}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width={width? width : "583pt"} height={height? height : "128pt"} viewBox="0 0 583.000000 128.000000"
              preserveAspectRatio="xMidYMid meet">
              <metadata>
              
              </metadata>
              <g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
              fill={fill? fill : "#ffffff"} stroke="none">
              <path d="M695 1200 l-30 -8 32 -1 c61 -2 46 -21 -17 -21 -41 0 -66 -5 -76 -15
              -9 -8 -26 -15 -40 -15 -13 0 -24 -4 -24 -8 0 -10 64 -38 107 -47 70 -14 40
              -25 -65 -23 -89 2 -114 -1 -135 -15 -15 -10 -27 -21 -27 -26 0 -10 95 -51 119
              -51 9 0 29 -7 45 -15 15 -8 39 -15 52 -15 32 0 40 -18 12 -29 -13 -6 -17 -10
              -10 -10 7 -1 22 3 32 9 13 7 21 5 31 -7 12 -15 12 -16 -4 -10 -12 4 -31 -2
              -54 -17 -19 -14 -42 -22 -49 -19 -8 3 -25 2 -39 -1 -22 -6 -24 -9 -12 -26 10
              -17 9 -22 -2 -29 -7 -5 -11 -13 -7 -19 3 -6 -9 -15 -28 -22 -44 -14 -56 -29
              -46 -56 6 -16 15 -20 32 -17 14 3 31 -4 46 -17 19 -18 33 -21 82 -18 32 1 56
              0 54 -4 -2 -3 3 -14 12 -23 9 -9 15 -17 13 -19 -9 -7 -100 -26 -123 -26 -27 0
              -35 -15 -13 -23 14 -6 -22 -9 -80 -7 -25 1 -43 -3 -43 -9 0 -6 -18 -18 -40
              -27 -22 -9 -40 -23 -40 -30 0 -8 -7 -17 -15 -20 -8 -4 -15 -12 -15 -19 0 -7
              -4 -15 -10 -17 -5 -1 -12 -17 -16 -34 -5 -27 -2 -32 18 -39 12 -4 25 -8 28 -9
              3 -2 19 -6 35 -11 17 -4 39 -14 50 -21 13 -9 50 -14 107 -14 65 0 90 -4 102
              -16 9 -8 16 -13 16 -10 0 3 14 0 31 -6 l32 -11 -24 -14 c-23 -13 -23 -14 11
              -8 50 10 190 11 222 2 15 -4 30 -16 33 -27 3 -11 17 -23 31 -26 13 -3 24 -10
              24 -16 0 -5 -4 -6 -10 -3 -5 3 -10 2 -10 -3 0 -12 25 -22 55 -22 31 0 40 -16
              18 -29 -13 -7 -4 -9 38 -9 30 0 68 -6 84 -14 17 -9 36 -13 43 -11 7 3 19 0 26
              -6 10 -9 15 -8 20 5 4 9 13 14 21 10 8 -3 15 -1 15 4 0 7 577 10 1640 10 902
              -1 1640 -5 1640 -9 0 -14 56 -18 68 -5 7 7 28 10 54 7 24 -2 76 -5 116 -6 39
              -1 72 -4 72 -7 0 -3 33 -3 72 1 47 4 75 3 80 -4 4 -6 29 -8 65 -4 33 4 64 3
              69 -1 5 -4 27 -5 49 -1 36 5 37 6 10 8 -16 1 -39 6 -50 11 -15 7 -10 9 25 10
              25 1 57 1 71 0 16 -1 29 5 32 14 4 9 18 16 32 16 43 0 27 24 -28 42 -30 10
              -61 18 -70 18 -10 0 -17 4 -17 10 0 6 42 9 108 8 89 -2 112 1 135 16 15 10 27
              22 27 26 0 9 -93 48 -138 56 -18 4 -35 11 -38 15 -3 5 -18 9 -34 9 -35 0 -47
              15 -23 30 15 9 12 10 -14 5 -19 -4 -34 -2 -39 6 -5 9 -1 11 14 7 13 -4 29 2
              43 15 15 14 33 20 56 19 45 -3 56 4 42 30 -9 16 -8 22 2 29 8 5 14 14 14 20 0
              7 16 18 35 24 29 10 35 17 35 41 -1 25 -4 29 -24 26 -14 -1 -32 6 -43 18 -15
              16 -31 20 -77 20 -56 0 -91 16 -73 34 4 4 2 7 -3 6 -6 -1 -14 -2 -20 -1 -25 5
              98 31 163 35 89 5 108 16 28 16 -31 0 -55 4 -52 8 3 5 28 7 56 4 37 -3 56 0
              69 12 9 9 32 21 49 27 18 6 32 16 32 23 0 6 11 23 23 36 13 14 26 38 29 53 6
              31 -16 50 -72 62 -19 4 -44 13 -55 20 -11 7 -63 15 -115 18 -56 3 -96 9 -98
              16 -2 6 -13 11 -25 11 -12 0 -28 4 -35 9 -18 11 6 21 51 22 18 0 41 4 52 8 22
              9 -121 3 -145 -6 -40 -15 -194 -8 -184 8 3 5 -1 9 -8 9 -8 0 -21 9 -31 20 -9
              11 -24 20 -32 20 -8 0 -15 5 -15 11 0 5 4 7 10 4 6 -3 10 -2 10 3 0 12 -25 22
              -55 22 -26 0 -41 15 -25 25 22 13 -1 22 -44 18 -34 -4 -54 0 -80 15 -24 14
              -36 17 -39 9 -3 -9 -8 -9 -18 1 -17 16 -29 15 -29 -2 0 -8 -8 -15 -17 -14 -10
              0 -757 -3 -1660 -8 -1092 -5 -1643 -4 -1643 3 0 5 -13 10 -30 10 -16 0 -27 -4
              -24 -9 3 -4 -17 -8 -45 -8 -27 0 -51 4 -53 10 -3 11 -28 13 -110 7 -32 -2 -55
              0 -52 4 3 5 -8 7 -23 4 -88 -13 -112 -14 -119 -4 -4 8 -28 10 -70 6 -39 -4
              -64 -2 -64 3 0 11 -2 11 -45 0z"/>
              </g>
            </svg>
    
  
  
       <div
        style={{
          verticalAlign: "middle",
          fontFamily: "Futura",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 1.75,
          letterSpacing: "normal",
          textAlign: "center",
          textTransform: "uppercase",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: color? color : "#ffffff"
        }}
      >
       
        {children}
      </div>
    </div>
    
      
    </HashLink>
  );
}

export function RoundedButtonLink({
  className,
  to,
  children,
  size,
  fill,
  color,
  border = 1,
  onClick,
  id
}) {
  return (
    <Link
     id={id}
      type="submit"
      to={to?to:"#"}
      onClick={onClick}
      className={className}
      style={{
        display: "table",
        cursor: "pointer",
        textAlign: "center !important",          
        color: color === undefined ? "transparent" : fill,
        textDecorationLine: "none",
      }}
    >
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",         
          textAlign: "center",          
          border: border+"px #cccccc solid",
          borderRadius: size === undefined ? 0 : size/2,
          width: size === undefined ? "auto" : size,
          height: size === undefined ? "auto" : size,
          backgroundColor: fill === undefined ? "transparent" : fill,
        }}
      >       
        {children}
      </div>
    </Link>
  );
}