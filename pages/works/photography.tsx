import React, { ReactChild, ReactChildren, useEffect, useState } from 'react';
import { Box, Flex, Heading, Tag, TagLabel, Text, Stack, Icon } from '@chakra-ui/react';
import Menu from '../../components/_molecules/Menu';
import Image from 'next/image';
import { chunkArray } from '../../utils';
import Footer from '../../components/_molecules/Footer';
import BoxContainer from '../../components/_atoms/BoxContainer';
import graphcmsClient from '../../utils/graphcmsClient';
import NxCkLink from '../../components/_atoms/Link';
import { FaArrowRight } from 'react-icons/fa';
import { Media } from '../../media';

const Headline = () => (
	<Box py="12" minH="380" alignItems="center" justifyContent="center" bg="white" flexWrap="wrap">
		<Heading size="2xl" color="mg.primary" textAlign="center" mb="8">
			Obras Fotográficas
		</Heading>
		<Text color="mg.secondary" fontSize="xl" maxW="xl" textAlign="center" mx="auto" px={4}>
			Obras de arte feitas com fotografias autorais e exclusivas, impressas em Fine Art com o melhor material do
			mercado, garantindo durabilidade de mais de 100 anos.
		</Text>
		<Flex wrap="wrap" maxW="xl" mx="auto" justify="center" mt="4">
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

const Collection = ({ title, slug, photos }: { title: string; slug: string; photos: Array<any> }) => (
	<Box py="8">
		<Flex align="center" justify="space-between">
			<Heading as="h3" size="xl" textTransform="uppercase" color="mg.primary" mb="4">
				{title}
			</Heading>
			<NxCkLink href={`/collection/${slug}`} color="red.800">
				<>
					Ver Mais <Icon as={FaArrowRight} />
				</>
			</NxCkLink>
		</Flex>

		<Stack direction={['column', 'row']}>
			{photos?.map((collectionGroup: any, key: number) => (
				<Flex wrap="wrap" w={{ base: '100%', lg: '33.3%' }} key={`collec-group-${key}`}>
					{collectionGroup.map((collectionItem: any, keyItem: number, arr: Array<any>) => (
						<Box
							key={`collec-item-${keyItem}`}
							pos="relative"
							width={{ base: '100%', lg: arr.length > 1 ? 'calc(50% - 16px)' : '100%' }}
							height={{ base: '300px', lg: arr.length > 1 ? 'calc(50% - 16px)' : '428px' }}
							bg="gray.600"
							m="2"
						>
							{collectionItem.url && <Image src={collectionItem.url} layout="fill" objectFit="cover" />}
						</Box>
					))}
				</Flex>
			))}
		</Stack>
	</Box>
);

const CollectionMobile = ({ title, slug, photos }: { title: string; slug: string; photos: Array<any> }) => (
	<Box py="8">
		<Flex align="center" justify="space-between">
			<Heading as="h3" size="xl" textTransform="uppercase" color="mg.primary" mb="4">
				{title}
			</Heading>
			<NxCkLink href={`/collection/${slug}`} color="red.800">
				<>
					Ver Mais <Icon as={FaArrowRight} />
				</>
			</NxCkLink>
		</Flex>

		<Stack direction={['column', 'row']}>
			{photos?.map((collectionItem: any, key: number) => (
				<Box key={`collec-item-${key}`}>
					{collectionItem.url && (
						<Image
							src={collectionItem.url}
							layout="responsive"
							width={collectionItem.width}
							height={collectionItem.height}
						/>
					)}
				</Box>
			))}
		</Stack>
	</Box>
);

const Collections = ({ children }: { children: ReactChild }) => (
	<Box bg="white" px={{ base: 2, lg: 12 }}>
		{children}
	</Box>
);

export default function Photography({ collections }: { collections: Array<any> }) {
	const firstThreePhotosFromCollections = collections.map((collection: any) => ({
		...collection,
		photos: collection.photos.flat().slice(0, 3),
	}));

	return (
		<BoxContainer>
			<Box>
				<Menu />
				<Headline />
				<Collections>
					<>
						<LastCollection />
						<Media greaterThan="lg">
							{collections.map((collection, index) => (
								<Collection {...collection} key={index} />
							))}
						</Media>
						<Media lessThan="lg">
							{firstThreePhotosFromCollections.map((collection, index) => (
								<CollectionMobile {...collection} key={index} />
							))}
						</Media>
					</>
				</Collections>
				<Footer />
			</Box>
		</BoxContainer>
	);
}

const graphCMS = graphcmsClient();
export async function getStaticProps() {
	const { collections } = await graphCMS.request(
		`
		query Collections{
			collections{
				id
				slug
				title
				photos(first: 9){
					url
					width
					height
				}
			}
		}
		`
	);

	collections.forEach((collection: any, index: number) => {
		if (index % 2 === 0) {
			collection.photos = chunkArray(collection.photos, 4, [5]);
		} else {
			const firstSixPhotos = collection.photos.slice(0, 6);
			collection.photos = chunkArray(firstSixPhotos, 4, [1, 6]);
		}
	});
	return {
		props: { collections },
	};
}
