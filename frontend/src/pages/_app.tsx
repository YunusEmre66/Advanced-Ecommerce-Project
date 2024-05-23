import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MyAppProps } from "@/layouts/Types";
import { Layouts } from "@/layouts/Layouts";
import FullLayout from "@/layouts/FullLayout";
import { AuthProvider } from "@/context/AuthContext";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/store";

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] || FullLayout; // ?? ((page) => page)
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <Head>
            <title>Test</title>
            <base href="http://localhost:3000/" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default MyApp;
