import React from 'react';
import Image from 'next/image';
import { Box, Flex, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { GraphQLClient } from 'graphql-request';

import BoxContainer from '../../components/_atoms/BoxContainer';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';

const Hero = ({ title, description }: { title: string; description: string }) => (
	<Flex pos="relative" h="calc(100vh - 300px)" align="center" justify="center">
		<Box pos="relative" zIndex="1" textAlign="center">
			<Heading size="2xl" maxW="container.md" color="white" mb="8">
				{title}
			</Heading>
			<Text color="white" fontSize="xl" maxW="xl">
				{description}
			</Text>
		</Box>
		<Image src="/hero_mockup.jpg" layout="fill" />
	</Flex>
);
const PhotosSection = ({ photos }: { photos: Array<any> }) => (
	<Flex wrap="wrap" p="12" bg="white" justify="space-between">
		{photos.map((photo) => (
			<Box w="calc(33% - 8px)" h="428px" pos="relative" mb="4">
				<Image src={photo.url} layout="fill" />
			</Box>
		))}
	</Flex>
);

const CallToAction = () => (
	<Flex justify="center" align="center" py="12" bg="white" wrap="wrap">
		<Heading as="h3" size="xl" textTransform="uppercase" color="mg.primary" mb="4" w="100%" textAlign="center">
			Compre Agora
		</Heading>
		<Button bg="mg.primary" color="white" size="lg">
			Quero Adquirir uma Obra
		</Button>
	</Flex>
);
export default function Collection({ collection }: any) {
	return (
		<BoxContainer>
			<>
				<Menu />
				<Hero title={collection.title} description={collection.description} />
				<PhotosSection photos={collection.photos} />
				<CallToAction />
				<Footer />
			</>
		</BoxContainer>
	);
}
const graphcms = new GraphQLClient(`https://api-us-east-1.graphcms.com/v2/ckuwzgndk06p501z0dcx51dlw/master`);
export async function getStaticProps({ params }: any) {
	const { collection } = await graphcms.request(
		`
		query CollectionBySlug($slug: String){
			collection(where: {slug: $slug}){
			  title
			  description
			  photos{
				url
				description
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
			collection,
		},
	};
}

export async function getStaticPaths() {
	const { collections } = await graphcms.request(`
		query Collections{
			collections{
		 		slug
			}
		}
	`);

	return {
		paths: collections.map(({ slug }: { slug: string }) => ({
			params: { slug },
		})),
		fallback: false,
	};
}
