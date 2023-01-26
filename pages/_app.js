import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';
import '../styles/globals.css';
import Layout from './components/layout';

export default function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}
