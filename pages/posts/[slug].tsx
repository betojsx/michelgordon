import React from 'react';
import Image from 'next/image';
import { GraphQLClient } from 'graphql-request';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import Menu from '../../components/_molecules/Menu';
import graphcmsClient from '../../utils/graphcmsClient';
import NxCkLink from '../../components/_atoms/Link';
import BoxContainer from '../../components/_atoms/BoxContainer';

const Hero = ({ title, img }: { title: string; img: string }) => (
	<Flex
		pos="relative"
		h="calc(100vh - 300px)"
		align="center"
		justify="center"
		sx={{
			_before: {
				content: '""',
				pos: 'absolute',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				bg: 'mg.primaryAlpha60',
				zIndex: 1,
			},
		}}
	>
		<Box pos="relative" zIndex="1" textAlign="center">
			<Heading size="2xl" maxW="container.md" color="white" mb="8">
				{title}
			</Heading>
		</Box>
		<Image src={img} layout="fill" />
	</Flex>
);

export default function Posts({ post, relatedPosts }: any) {
	return (
		<>
			<Menu />
			<Hero title={post.title} img={post.featuredImage?.url || 'https://picsum.photos/seed/picsum/600/428'} />
			<Box py="8" bg="white">
				<Container maxW="container.md">
					<Box
						color="gray.800"
						sx={{
							p: {
								mb: 8,
								fontSize: 'lg',
							},
						}}
						dangerouslySetInnerHTML={{ __html: post.content.html }}
					></Box>
				</Container>
			</Box>
			<Box bg="white">
				<Container maxW="container.lg">
					<Heading as="h4" size="lg" color="mg.primary" mb="4">
						Confira outros posts
					</Heading>
					<Flex wrap="wrap" align="flex-start" justify="flex-start">
						{relatedPosts.map((post: any) => (
							<Box w="calc(33% - 16px)" mb="8" mx="2">
								<NxCkLink href={`/posts/${post.slug}`}>
									<>
										<Box
											pos="relative"
											mb="4"
											sx={{
												'& img ': {
													transition: 'all 420ms ease',
												},
											}}
											_hover={{ '& img ': { transform: 'scale(1.1) rotate(2deg)' } }}
										>
											<Image
												src={
													post.featuredImage?.url ||
													'https://picsum.photos/seed/picsum/600/428'
												}
												width="428px"
												height="428px"
												layout="responsive"
											/>
										</Box>
										<Heading as="h3" size="md" color="mg.primary">
											{post.title}
										</Heading>
									</>
								</NxCkLink>
							</Box>
						))}
					</Flex>
				</Container>
			</Box>
		</>
	);
}

const graphcms = graphcmsClient();

export async function getStaticProps({ params }: any) {
	const { post } = await graphcms.request(
		`
		query PostBySlug($slug: String){
			post(where: {slug: $slug}){
			  title
			  content {
				  html
			  }
			  featuredImage{
				url
				
			  }
			}
		  }
		`,
		{
			slug: params.slug,
		}
	);

	const { posts } = await graphcms.request(
		`
		query RelatedPosts($slug: String){
			posts(where: {NOT: {slug: $slug}}, first: 3){
			  title
			  slug
			  content {
				  html
			  }
			  featuredImage{
				url
				
			  }
			}
		  }
		`,
		{
			slug: params.slug,
		}
	);

	return {
		props: {
			post,
			relatedPosts: posts,
		},
	};
}

export async function getStaticPaths() {
	const { posts } = await graphcms.request(`
		query Posts{
			posts{
		 		slug
			}
		}
	`);

	return {
		paths: posts.map(({ slug }: { slug: string }) => ({
			params: { slug },
		})),
		fallback: false,
	};
}
