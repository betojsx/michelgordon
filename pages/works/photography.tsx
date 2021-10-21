import { Box, Flex, Heading, Tag, TagLabel, Text, Stack } from '@chakra-ui/react';
import React, { ReactChild, ReactChildren, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import Image from 'next/image';
import { chunkArray } from '../../utils';
import Footer from '../../components/Footer';
import BoxContainer from '../../components/_atoms/BoxContainer';
import { GraphQLClient } from 'graphql-request';

const Headline = () => (
	<Box py="12" minH="380" align="center" justify="center" bg="white" wrap="wrap">
		<Heading size="2xl" maxW="container.md" color="mg.primary" textAlign="center" mb="8">
			Obras Fotográficas
		</Heading>
		<Text color="mg.secondary" fontSize="xl" maxW="xl" textAlign="center">
			Obras de arte feitas com fotografias autorais e exclusivas, impressas em Fine Art com o melhor material do
			mercado, garantindo durabilidade de mais de 100 anos.
		</Text>
		<Flex wrap="wrap" px="40" justify="center" mt="4">
			<Tag m="2" size="lg" borderRadius="full" variant="outline" colorScheme="blackAlpha">
				<TagLabel>Long Tail Tag</TagLabel>
			</Tag>
			<Tag m="2" size="lg" borderRadius="full" variant="outline" colorScheme="blackAlpha">
				<TagLabel>Simple Tag</TagLabel>
			</Tag>
			<Tag m="2" size="lg" borderRadius="full" variant="outline" colorScheme="blackAlpha">
				<TagLabel>Simple Tag</TagLabel>
			</Tag>
			<Tag m="2" size="lg" borderRadius="full" variant="outline" colorScheme="blackAlpha">
				<TagLabel>One More Tag</TagLabel>
			</Tag>
			<Tag m="2" size="lg" borderRadius="full" variant="outline" colorScheme="blackAlpha">
				<TagLabel>Lorem Ipsum Dot</TagLabel>
			</Tag>
			<Tag m="2" size="lg" borderRadius="full" variant="outline" colorScheme="blackAlpha">
				<TagLabel>Amet Zerat</TagLabel>
			</Tag>
		</Flex>
	</Box>
);

const LastCollection = () => (
	<Box py="8">
		<Heading as="h3" size="xl" textTransform="uppercase" color="mg.primary" mb="4">
			Última Coleção
		</Heading>
		<Box>
			<Image src="/hero_mockup.jpg" width="1440" height="440" />
		</Box>
	</Box>
);

const collectionArr = [
	{
		img: '/collection-0.jpg',
	},
	{
		img: '/collection-1.jpg',
	},
	{
		img: '/collection-2.jpg',
	},
	{
		img: '/collection-3.jpg',
	},
	{
		img: '/collection-4.jpg',
	},
	{
		img: '/collection-5.jpg',
	},
	{
		img: '/collection-6.jpg',
	},
	{
		img: '/collection-7.jpg',
	},
	{
		img: '/collection-8.jpg',
	},
];
const collectionArr2 = [
	{
		img: '/collection-9.jpg',
	},
	{
		img: '/collection-13.jpg',
	},
	{
		img: '/collection-2.jpg',
	},
	{
		img: '/collection-4.jpg',
	},
	{
		img: '/collection-12.jpg',
	},
	{
		img: '/collection-11.jpg',
	},
	{
		img: '/collection-14.jpg',
	},
	{
		img: '/collection-1.jpg',
	},
	{
		img: '/collection-10.jpg',
	},
];

const collectionChunkArr = chunkArray(collectionArr, 4, 5);
const collectionChunkArr2 = chunkArray(collectionArr2, 4, 5);
const Collection = ({ title, slug, photos }: { title: string; slug: string; photos: Array<any> }) => (
	<Box py="8">
		<Heading as="h3" size="xl" textTransform="uppercase" color="mg.primary" mb="4">
			{title}
		</Heading>
		<Stack direction="row">
			{photos?.map((collectionGroup: any, key: number) => (
				<Flex wrap="wrap" w="33.3%" key={`collec-group-${key}`}>
					{collectionGroup.map((collectionItem: any, keyItem: number, arr: Array<any>) => (
						<Box
							key={`collec-item-${keyItem}`}
							pos="relative"
							width={arr.length > 1 ? 'calc(50% - 16px)' : '100%'}
							height={arr.length > 1 ? 'calc(50% - 16px)' : '428px'}
							m="2"
						>
							<Image src={collectionItem.url} layout="fill" />
						</Box>
					))}
				</Flex>
			))}
		</Stack>
	</Box>
);

const Collections = ({ children }: { children: ReactChild }) => (
	<Box bg="white" px="12">
		{children}
	</Box>
);

export default function Photography({ collections }: { collections: Array<any> }) {
	const [chunked, setChunked] = useState(false);
	useEffect(() => {
		collections.forEach((collection) => {
			collection.photos = chunkArray(collection.photos, 4, 5);
		});
		setChunked(true);
	}, [collections]);
	return (
		<BoxContainer>
			<Box>
				<Menu />
				<Headline />
				<Collections>
					<>
						<LastCollection />
						{chunked && collections.map((collection) => <Collection {...collection} />)}
					</>
				</Collections>
				<Footer />
			</Box>
		</BoxContainer>
	);
}

const graphCMSURL: string = process.env.GRAPHCMS_URL || '';
const graphCMS = new GraphQLClient('https://api-us-east-1.graphcms.com/v2/ckuwzgndk06p501z0dcx51dlw/master');
export async function getStaticProps() {
	const { collections } = await graphCMS.request(
		`
		query Collections{
			collections{
				id
				slug
				title
				photos{
					url
				}
			}
		}
		`
	);
	return {
		props: { collections },
	};
}
