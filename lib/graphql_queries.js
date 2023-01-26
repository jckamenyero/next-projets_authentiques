import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
	query GetAllPosts {
		posts(first: 100) {
			edges {
				node {
					id
					uri
					slug
					projetsAuthentiques {
						title
						level
					}
				}
			}
		}
	}
`;

export const GET_ALL_SLUGS = gql`
	query GetAllSlugs {
		posts(first: 100) {
			edges {
				node {
					id
					uri
					slug
				}
			}
		}
	}
`;

export const GET_POST = gql`
	query GetPost($id: ID!) {
		post(id: $id, idType: SLUG) {
			id
			uri
			slug
			projetsAuthentiques {
				title
				level
				description
				matieresSelect
				typeText
				typeProjet
				matiere {
					matiereTitleOne
					matiereText
					matiereReflexion
					matiereSection {
						sectionTitle
						sectionText
					}
				}
				approchesPedagogiques {
					approcheText
				}
			}
		}
	}
`;
