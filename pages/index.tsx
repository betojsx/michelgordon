import type { NextPage } from 'next';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Import the generated Lists API from Keystone
import { lists } from '.keystone/api';
import { Box } from '@chakra-ui/react';

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
	<Box h="calc(100vh - 100px)">
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
const Slider = () => {
	return (
		<Carousel responsive={responsive}>
			{SLIDERS.map((slideItem) => (
				<SliderItem imageSrc={slideItem.imageSrc} />
			))}
		</Carousel>
	);
};

// Home receives a `posts` prop from `getStaticProps` below
export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div>
			<main>
				<Slider />
			</main>
		</div>
	);
}

// Here we use the Lists API to load all the posts we want to display
// The return of this function is provided to the `Home` component
export async function getStaticProps() {
	const posts = await lists.Post.findMany({ query: 'id title slug' });
	return { props: { posts } };
}
