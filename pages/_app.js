import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../src/ui/Theme';
import Header from '../src/ui/Header';
import Footer from '../src/ui/Footer';
import Fonts from '../src/ui/fonts';
import {
  LazyLoadComponent,
} from 'react-lazy-load-image-component';
import ReactGA from 'react-ga';

ReactGA.initialize('');
export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    Fonts();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={Theme}>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Component
          {...pageProps}
          setSelectedIndex={setSelectedIndex}
          setValue={setValue}
        />
        <LazyLoadComponent threshold={400}>
          <Footer
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </LazyLoadComponent>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
