import 'bootstrap/dist/css/bootstrap.css';
import {Helmet} from 'react-helmet';
import buildClient from '../api/build-client';
import Header from '../components/header';
import "semantic-ui-css/semantic.min.css";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Helmet>
        <title>Ayzeys Food Delivery</title>
        <meta name='description' content='Food buying and selling' />
        <style>{'body { background-color: #7ba0db; }'}</style>
      </Helmet>
    <div>
      <Header currentUser={currentUser} />
      <div className = "container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>  
    </div>
    </>
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;
