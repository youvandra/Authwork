import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Appshell from "../components/Appshell/Appshell";
import theme from "../utils/theme";
import { Global } from "@emotion/react";
import { trpc } from "../utils/trpc";
import { SessionProvider } from "next-auth/react";
import { NotificationsProvider } from "@mantine/notifications";
import Footer from "../components/Appshell/Footer";
import { MetaMaskProvider } from "metamask-react";

function App(props: AppProps<{ session: any }>) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>AuthWork</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/Logo.png" type="image/x-icon" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <MetaMaskProvider>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <NotificationsProvider>
              <Global
                styles={[
                  `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');`,
                ]}
              />
              <Appshell>
                <Component {...pageProps} />
                <Footer />
              </Appshell>
            </NotificationsProvider>
          </MantineProvider>
        </MetaMaskProvider>
      </SessionProvider>
    </>
  );
}

export default trpc.withTRPC(App);
