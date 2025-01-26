import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
