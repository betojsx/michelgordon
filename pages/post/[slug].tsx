// pages/post/[slug].tsx

import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { lists } from '.keystone/api';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-next/document-renderer';
import { Box, Container, Heading, Text } from '@chakra-ui/react';

const renderers: DocumentRendererProps['renderers'] = {
	// use your editor's autocomplete to see what other renderers you can override
	inline: {
		bold: ({ children }) => {
			return <strong>{children}</strong>;
		},
	},
	block: {
		paragraph: ({ children, textAlign }) => {
			return (
				<Text fontSize="lg" lineHeight="tall" style={{ textAlign }}>
					{children}
				</Text>
			);
		},
	},
};

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Box as="main" m="12">
			<Container>
				<div>
					<Link href="/">
						<a>&larr; home</a>
					</Link>
				</div>
				<Heading mb="4" mt="8">
					{post.title}
				</Heading>
				<DocumentRenderer document={post.content.document} renderers={renderers}></DocumentRenderer>
			</Container>
		</Box>
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const posts = await lists.Post.findMany({
		query: `slug`,
	});

	const paths = posts
		?.map((post) => post.slug)
		.filter((slug): slug is string => !!slug)
		.map((slug) => `/post/${slug}`);

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	const [post] = await lists.Post.findMany({
		where: { slug: { equals: params!.slug as string } },
		query: `
			id 
			title 
			content {
				document
			}
		`,
	});
	return { props: { post } };
}
