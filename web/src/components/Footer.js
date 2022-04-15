import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer
        className='page-footer font-small'
        style={{
          backgroundColor: "#4B4A4A",
          color: "white",
          position: "",
          bottom: 0,
          width: "100%",
        }}
      >
        <div className='footer-copyright text-center py-3'>
          © 2022 Copyright:
          <a href='https://Rail-Mitra.wordpress.com'>
            {" "}
            Rail-Mitra.wordpress.com
          </a>
        </div>
        <div className='footer-copyright'
                style={{
                  position: "absolute",
                  fontSize: "6px",
                  bottom: 2,
                  right: 4,
                  color: "black"
                }}
        >
            D͜͡ark〆Faze
        </div>
      </footer>
    );
  }
}

export default Footer;
