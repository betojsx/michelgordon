import type { NextPage } from 'next';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Import the generated Lists API from Keystone
import { lists } from '.keystone/api';
import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react';

import dynamic from 'next/dynamic';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const SLIDERS = [
	{
		imageSrc: 'https://source.unsplash.com/9MRX_KwALE0',
	},
	{
		imageSrc: 'https://source.unsplash.com/bzz1SzUeu04',
	},
	{
		imageSrc: 'https://source.unsplash.com/k-fMn9RKIXU',
	},
];
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
//@ts-ignore
const Slider = (props) => {
	return (
		<Box {...props}>
			<Carousel responsive={responsive}>
				{SLIDERS.map((slideItem, index) => (
					<SliderItem imageSrc={slideItem.imageSrc} key={`si-${index}`} />
				))}
			</Carousel>
		</Box>
	);
};

const Menu = () => (
	<Flex bg="rgba(26, 32, 44, 0.7)" px="8" justify="space-between" align="center" h={100} shadow="sm">
		<Box w={16} h={16} bg="gray.300" borderRadius="full" />
		<Flex as="nav">
			<Box mr="4">
				<Link href="#">
					<ChakraLink>Home</ChakraLink>
				</Link>
			</Box>
			<Box mr="4">
				<Link href="#">
					<ChakraLink>Obras</ChakraLink>
				</Link>
			</Box>
			<Box mr="4">
				<Link href="#">
					<ChakraLink>Educação</ChakraLink>
				</Link>
			</Box>
			<Box mr="4">
				<Link href="#">
					<ChakraLink>Sobre</ChakraLink>
				</Link>
			</Box>
			<Box mr="4">
				<Link href="#">
					<ChakraLink>Contato</ChakraLink>
				</Link>
			</Box>
			<Box>
				<Link href="#">
					<ChakraLink>Blog</ChakraLink>
				</Link>
			</Box>
		</Flex>
	</Flex>
);

// Home receives a `posts` prop from `getStaticProps` below
export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div>
			<Box pt="calc(100vh - 100px)">
				<Slider pos="fixed" top="0" left="0" right="0" />
				<Box pos="relative" zIndex="1">
					<Menu />
					<Box h="800px" bg="gray.800"></Box>
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
