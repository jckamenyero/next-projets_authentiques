import { client } from '../lib/apollo-client';
import { GET_POST, GET_ALL_SLUGS } from '../lib/graphql_queries';

export default function Slug({ postData }) {
	const post = postData.projetsAuthentiques;
	//console.log('postData', postData);
	//console.log('post', post);

	return (
		<>
			<main data-theme={post.level}>
				{/* introduction */}
				<article>
					<div className="section_underline d-flex justify-content-between">
						<div className="mt-auto mb-0">
							<p className="pb-0 mb-0">Projet :</p>
							<h1 className="pt-0 mt-0 mb-3">{post.title}</h1>
						</div>
						<div className="banner mt-auto mb-0">
							<img src={`img/banner_${post.level}.png`} alt={post.title} />
						</div>
					</div>
					<div className="my-4 py-3 px-4 box_bg rounded-3">
						<p dangerouslySetInnerHTML={{ __html: post.description }} />
					</div>
					<div className="matieres mt-4 pt-3">
						<div className="pseudo_h3 fw-bold">
							Matières et domaines ciblés par le projet
						</div>
						<ul className="domaines_type list-inline mb-1">
							{post.matieresSelect &&
								post.matieresSelect.map((matieresList, index) => {
									return (
										<li className="list-inline-item" key={index}>
											<span
												dangerouslySetInnerHTML={{ __html: matieresList }}
											/>
										</li>
									);
								})}
						</ul>
					</div>

					<div className="types mt-4">
						<div className="pseudo_h3 fw-bold">
							Types de regroupement proposés pour ce projet
						</div>
						<p>{post.typeText}</p>
						<ul className="domaines_type list-inline mb-0">
							{post.typeProjet &&
								post.typeProjet.map((typeList, index) => {
									return (
										<li className="list-inline-item" key={index}>
											<span dangerouslySetInnerHTML={{ __html: typeList }} />
										</li>
									);
								})}
						</ul>
					</div>
				</article>
				{/* /introduction */}

				{/* matiere */}
				<article className="mt-5 pt-3">
					<h2 className="section_underline pb-3">
						Projet authentique proposé selon la matière et le domaine
					</h2>

					{post.matiere &&
						post.matiere.map((matiere, index) => {
							let j = index;
							return (
								<section className="mt-5" key={index}>
									<div className="matiere_title">
										<h3 className="mb-auto">
											<div
												dangerouslySetInnerHTML={{
													__html: matiere.matiereTitleOne,
												}}
											/>
										</h3>
									</div>

									<div className="bordered mt-4 p-4">
										<div
											dangerouslySetInnerHTML={{ __html: matiere.matiereText }}
										/>
									</div>

									{matiere.matiereReflexion ? (
										<div className="bordered mt-4 p-4">
											<div className="ms-4 reflexion">
												<p className="icon">
													<strong>Réflexion :</strong>
												</p>
												<p>{matiere.matiereReflexion}</p>
											</div>
										</div>
									) : (
										''
									)}

									<div className="mt-4">
										<div className="accordion">
											{matiere.matiereSection &&
												matiere.matiereSection.map((section, index) => {
													let k = index;
													return (
														<div className="accordion-item" key={index}>
															<h2
																className="accordion-header"
																id={`header-${j}_${k}`}
															>
																<button
																	className="accordion-button collapsed fw-bold"
																	type="button"
																	data-bs-toggle="collapse"
																	data-bs-target={`#content-${j}_${k}`}
																	aria-expanded="true"
																	aria-controls={`content-${j}_${k}`}
																>
																	{section.sectionTitle}
																</button>
															</h2>
															<div
																id={`content-${j}_${k}`}
																className="accordion-collapse collapse"
																aria-labelledby={`header-${j}_${k}`}
															>
																<div className="accordion-body">
																	<div
																		dangerouslySetInnerHTML={{
																			__html: section.sectionText,
																		}}
																	/>
																</div>
															</div>
														</div>
													);
												})}
										</div>
									</div>
								</section>
							);
						})}
				</article>
				{/* /matiere */}

				{/* approche */}
				<article className="mt-4 pt-2">
					<section className="mt-5 mb-4">
						<h2 className="section_underline pb-3">Approches pédagogiques</h2>

						{post.approchesPedagogiques &&
							post.approchesPedagogiques.map((approche, index) => {
								return (
									<div className="bordered mt-4 p-4" key={index}>
										<div
											dangerouslySetInnerHTML={{
												__html: approche.approcheText,
											}}
										/>
									</div>
								);
							})}
					</section>
				</article>
				{/* /approche */}
			</main>
		</>
	);
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: GET_ALL_SLUGS,
	});
	//console.log('data', data.posts.edges);

	const paths = data.posts.edges.map((post) => ({
		params: { slug: post.node.slug },
	}));
	//console.log('paths', paths);
	return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
	const { data, loading, networkStatus } = await client.query({
		query: GET_POST,
		variables: {
			//id: params.uri,
			id: slug,
		},
	});
	//console.log('data', data);
	const postData = data?.post;
	return {
		props: {
			postData,
		},
		revalidate: 30,
	};
}
