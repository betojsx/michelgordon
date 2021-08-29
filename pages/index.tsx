import type { NextPage } from 'next';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Import the generated Lists API from Keystone
import { lists } from '.keystone/api';
import { Box, Flex, Heading, Container, Link as ChakraLink } from '@chakra-ui/react';

import dynamic from 'next/dynamic';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { ReactChild, ReactChildren } from 'react';

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

interface NxCkLinkProps {
	href: string;
	children: ReactChild;
}
const NxCkLink = ({ href, children }: NxCkLinkProps) => (
	<Link href={href}>
		<ChakraLink>{children}</ChakraLink>
	</Link>
);
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

const PhotoSection = () => (
	<Box h="590px" pos="relative">
		<Container pos="absolute" top="0" right="0" left="0" bottom="0" maxW="container.lg">
			<Box pos="absolute" top="50%" transform="translateY(-50%)" w="400px" zIndex="1">
				<Heading as="h3" size="2xl" mb="4">
					Lorem Ipsum Dot Color Amet
				</Heading>
				<NxCkLink href="#">Ver Mais &rarr;</NxCkLink>
			</Box>
		</Container>
		<Box
			pos="absolute"
			top="0"
			right="0"
			left="0"
			bottom="0"
			backgroundImage={`url('${SLIDERS[0].imageSrc}')`}
			backgroundSize="cover"
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

// Home receives a `posts` prop from `getStaticProps` below
export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div>
			<Box pt="calc(100vh - 100px)">
				<Slider pos="fixed" top="0" left="0" right="0" />
				<Box pos="relative" zIndex="1">
					<Menu />
					<Box h="200px" bg="gray.800"></Box>
					<PhotoSection />
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
