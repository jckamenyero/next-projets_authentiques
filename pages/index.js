import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/apollo-client';
import { GET_ALL_POSTS } from '../lib/graphql_queries';

export default function Home({ posts }) {
	//console.log('posts', posts);
	return (
		<>
			<Head>
				<title>Projets Authentiques</title>
				<meta
					name="description"
					content="Staic Page Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main data-theme="2">
				<h1 className="section_underline">Projets Authentiques</h1>
				<div className="mt-4">
					<ol>
						{posts &&
							posts.map((post, index) => {
								return (
									<li key={index} className="mb-2 ps-1">
										<Link href={post.node.slug}>
											<a>{post.node.projetsAuthentiques.title}</a>
										</Link>
									</li>
								);
							})}
					</ol>
				</div>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const { data, loading, networkStatus } = await client.query({
		query: GET_ALL_POSTS,
	});
	//console.log('data', data);

	return {
		props: {
			posts: data?.posts?.edges,
		},
		revalidate: 30,
	};
}
