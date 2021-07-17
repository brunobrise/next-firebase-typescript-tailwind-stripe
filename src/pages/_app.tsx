import '../../styles/globals.css';
import { ProvideAuth } from '@hooks/use-auth';

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default MyApp;
