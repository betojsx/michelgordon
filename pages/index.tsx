import React, { forwardRef, ReactChild, ReactChildren, useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Import the generated Lists API from Keystone
import { lists } from '.keystone/api';
import { Box, Flex, Heading, Container, Link as ChakraLink, Text, Tag, TagLabel } from '@chakra-ui/react';

import dynamic from 'next/dynamic';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Menu from '../components/Menu';
import NxCkLink from '../components/_atoms/Link';
import Footer from '../components/Footer';

const SLIDERS = [
	{
		imageSrc: '/hero_mockup.jpg',
	},
	{
		imageSrc: 'https://source.unsplash.com/bzz1SzUeu04',
	},
	{
		imageSrc: 'https://source.unsplash.com/k-fMn9RKIXU',
	},
];

const PHOTO_SECTION = `https://source.unsplash.com/JtIK6MzVVeU`;
//@ts-ignore
const SliderItem = ({ imageSrc }) => (
	<Box
		sx={{
			'> *': {
				h: '100%',
			},
		}}
		h="calc(100vh - 100px)"
	>
		<Image src={imageSrc} width={1600} height={1600} objectFit="cover" />
	</Box>
);

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 576 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 576, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};

const TagSection = () => {};

const LogoSymbol = () => (
	<Box pos="absolute" top="20px" left="20px" zIndex="1">
		<Image src="/logo_symbol.png" width="70" height="72" />
	</Box>
);
//@ts-ignore
const Slider = (props) => {
	return (
		<Box pos="relative" {...props}>
			<LogoSymbol />
			<Carousel responsive={responsive}>
				{SLIDERS.map((slideItem, index) => (
					<SliderItem imageSrc={slideItem.imageSrc} key={`si-${index}`} />
				))}
			</Carousel>
		</Box>
	);
};

const TextTagSection = () => (
	<Box bg="whitesmoke" py="12">
		<Container maxW="container.lg">
			<Text fontSize="4xl" fontWeight="bold" lineHeight="10" color="mg.primary" textAlign="center">
				Espaço colaborativo para os admiradores <br />
				do Oriente Médio
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
		</Container>
	</Box>
);

//@ts-ignore
const BlockAnchor = ({ title, image, ...props }) => (
	<Flex
		align="center"
		justify="center"
		pos="relative"
		w="574px"
		h="574px"
		_hover={{
			'& img': {
				transform: 'scale(1.1) rotate(2deg)',
			},
		}}
		sx={{
			'& img ': {
				transition: 'all 420ms ease',
			},
		}}
		{...props}
	>
		<Box maxW="240px" pos="relative" zIndex="1">
			<Text fontSize="4xl" fontWeight="bold" lineHeight="10" color="white" textAlign="center">
				{title}
			</Text>
		</Box>
		<Box
			pos="absolute"
			left="0"
			right="0"
			top="0"
			bottom="0"
			_hover={{
				_after: {
					bg: 'mg.secondaryAlpha60',
				},
			}}
			_after={{
				content: '""',
				position: 'absolute',
				top: '0',
				right: '0',
				bottom: '0',
				left: '0',
				bg: 'mg.primaryAlpha60',
				transition: 'all 420ms ease',
			}}
		>
			<Image src={image} layout="fill" />
		</Box>
	</Flex>
);

const PhotoSection = () => (
	<Box h="590px" pos="relative">
		<Box
			d="flex"
			flexWrap="wrap"
			alignItems="center"
			alignContent="center"
			px="4%"
			pos="relative"
			zIndex="1"
			maxW="40%"
			h="100%"
			bg="mg.primaryAlpha60"
		>
			<Heading as="h3" size="2xl" mb="4" color="white">
				Lorem Ipsum Dot Color Amet
			</Heading>
			<NxCkLink href="#">Ver Mais &rarr;</NxCkLink>
		</Box>
		<Box
			pos="absolute"
			top="0"
			right="0"
			left="0"
			bottom="0"
			bgImage="url('/photo_section_mock.png')"
			bgSize="cover"
			bgAttachment="fixed"
			bgRepeat="no-repeat"
			bgPos="center"
			pointerEvents="none"
			_after={{
				content: '""',
				position: 'absolute',
				top: 0,
				right: 0,
				left: 0,
				bottom: 0,
				background: 'linear-gradient(to right, rgb(26, 32, 44), transparent 100%)',
				userSelect: 'none',
			}}
		></Box>
	</Box>
);

const OtherResourcesSection = () => {
	return (
		<Box py="12" bg="white">
			<Container maxW="container.lg">
				<Flex>
					<BlockAnchor title="Conheça os Livros" image="/book_mockup.jpg" mr="4" />
					<BlockAnchor title="Participe das Aulas" image="/classes_mockup.jpg" />
				</Flex>
			</Container>
		</Box>
	);
};

const YoutubeSection = () => (
	<Box py="12" bg="linear-gradient(to bottom, #F2F2F2 70%, white 70%)">
		<Container maxW="container.lg">
			<Text fontSize="4xl" fontWeight="bold" lineHeight="10" color="mg.primary" textAlign="center" mb="6">
				Acompanhe nossos conteúdos no YouTube
			</Text>
			<Image src="/youtube_mockup.jpg" width="1080px" height="611px" />
		</Container>
	</Box>
);

const INSTAGRAM_SLIDER = [
	{
		url: '/instagram_1.jpg',
	},
	{
		url: '/instagram_2.jpg',
	},
	{
		url: '/instagram_3.jpg',
	},
	{
		url: '/instagram_4.jpg',
	},
	{
		url: '/instagram_5.jpg',
	},
];
const IGCarouselConfig = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
		partialVisibilityGutter: 20,
		slidesToSlide: 1, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 576 },
		items: 3,
		partialVisibilityGutter: 20,
		slidesToSlide: 1, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 576, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};
const InstagramSection = () => (
	<Box pt="12" bg="white" mb="-2">
		<Container maxW="container.lg">
			<Text fontSize="4xl" fontWeight="bold" lineHeight="10" color="mg.primary" textAlign="center" mb="6">
				Últimas postagens do Instagram
			</Text>
		</Container>
		<Carousel partialVisible={true} responsive={IGCarouselConfig}>
			{INSTAGRAM_SLIDER.map((item, index) => (
				<Image key={index} src={item.url} width="330px" height="330px" />
			))}
		</Carousel>
	</Box>
);

// Home receives a `posts` prop from `getStaticProps` below
export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div>
			<Box pt="calc(100vh - 100px)">
				<Slider pos="fixed" top="0" left="0" right="0" />
				<Box pos="relative" zIndex="1">
					<Menu />
					<TextTagSection />
					<PhotoSection />
					<OtherResourcesSection />
					<YoutubeSection />
					<InstagramSection />
					<Footer />
				</Box>
			</Box>
		</div>
	);
}

// Here we use the Lists API to load all the posts we want to display
// The return of this function is provided to the `Home` component
export async function getStaticProps() {
	const posts = await lists.Post.findMany({ query: 'id title slug' });
	return { props: { posts } };
}
