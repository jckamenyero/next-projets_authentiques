import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
export default function Document() {
	return (
		<Html>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
					referrerPolicy="no-referrer"
				/>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
				<Script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js"
					strategy="beforeInteractive"
				/>
			</body>
		</Html>
	);
}
