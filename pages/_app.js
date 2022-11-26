import "../styles/globals.css";
import "../styles/index.css";
import { useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Wordle</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
