import type { NextPage } from 'next';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Import the generated Lists API from Keystone
import { lists } from '.keystone/api';
import { Box, Container, Divider, Heading, Text, Link as ChakraLink, Flex } from '@chakra-ui/react';

// Home receives a `posts` prop from `getStaticProps` below
export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Box as="main" m="12">
			<Container>
				<Flex justify="space-between" align="center" mb="8">
					<Heading as="h1" size="2xl" mb="0">
						zerob.dev
					</Heading>
					<Heading fontWeight="thin">blog</Heading>
				</Flex>

				{posts?.map((post) => (
					<Box
						as="article"
						key={post.id}
						pb="2"
						mb="2"
						borderBottom="1px solid transparent"
						transition="280ms all ease-in-out"
						_hover={{ borderColor: 'purple.200' }}
					>
						<Link href={`/post/${post.slug}`}>
							<ChakraLink
								d="block"
								fontFamily="heading"
								fontSize="xl"
								transition="280ms all ease-in-out"
								_hover={{ 'text-decoration': 'none', color: 'purple.200' }}
							>
								{post.title}
							</ChakraLink>
						</Link>
					</Box>
				))}
			</Container>
		</Box>
	);
}

// Here we use the Lists API to load all the posts we want to display
// The return of this function is provided to the `Home` component
export async function getStaticProps() {
	const posts = await lists.Post.findMany({ query: 'id title slug' });
	return { props: { posts } };
}
