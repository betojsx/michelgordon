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

interface NxCkLinkProps {
	href: string;
	children: ReactChild;
}
const NxCkLink = ({ href, children }: NxCkLinkProps) => (
	<Link href={href}>
		<ChakraLink>{children}</ChakraLink>
	</Link>
);

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

const menuItems = [
	{
		label: 'Home',
	},
	{
		label: 'Obras',
	},
	{
		label: 'Educação',
	},
	{
		label: 'Sobre',
	},
	{
		label: 'Contato',
	},
	{
		label: 'Blog',
	},
];
const Menu = () => {
	const [isSticky, setIsSticky] = useState(false);
	const headerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// @ts-ignore
		const headerTop = headerRef.current.getBoundingClientRect().top + window.pageYOffset;
		const headerHeight = headerRef.current?.getBoundingClientRect().height;

		const handleScroll = () => {
			const windowTop = window.pageYOffset;
			console.log(headerTop, windowTop);
			if (windowTop >= headerTop) {
				setIsSticky(true);
				document.body.style.paddingTop = `${headerHeight}px`;
			} else {
				document.body.style.paddingTop = '0';
				setIsSticky(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<Flex
			ref={headerRef}
			bg="mg.primary"
			px="10"
			justify="space-between"
			align="center"
			h={100}
			shadow="sm"
			pos={isSticky ? 'fixed' : 'static'}
			top="0"
			left="0"
			right="0"
		>
			<Image src="/logo_michael_gordon.png" width="268" height="59" />
			<Flex as="nav">
				{menuItems.map(({ label }) => (
					<Box ml="6">
						<Link href="#">
							<ChakraLink textTransform="uppercase">{label}</ChakraLink>
						</Link>
					</Box>
				))}
			</Flex>
		</Flex>
	);
};

const TextTagSection = () => (
	<Box h="340px" bg="whitesmoke" pt="12">
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

const PhotoSection = () => (
	<Box h="590px" pos="relative">
		<Box
			d="flex"
			flexWrap="wrap"
			alignItems="center"
			alignContent="center"
			px="4"
			pos="relative"
			zIndex="1"
			maxW="530px"
			h="100%"
			bg="mg.primaryAlpha60"
		>
			<Heading as="h3" size="2xl" mb="4">
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
