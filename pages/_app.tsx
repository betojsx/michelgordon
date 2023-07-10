import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeProvider, CSSReset } from "@chakra-ui/react";
import Head from "next/head";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/600.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/600.css";

import theme from "../styles/theme";
import { MediaContextProvider } from "../media";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Michel Gordon</title>
        <meta
          name="facebook-domain-verification"
          content="lswc96loa820g6vs4d0n5vhj5onz86"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <MediaContextProvider>
          <Component {...pageProps} />
        </MediaContextProvider>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
