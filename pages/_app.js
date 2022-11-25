import "../styles/globals.css";
import "../styles/index.css";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
