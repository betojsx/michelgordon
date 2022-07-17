// Import the generated Lists API from Keystone
import { Box, Container, Flex, Heading, Tag, TagLabel, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from './_molecules/Footer';
import Menu from './_molecules/Menu';
import BoxContainer from '../components/_atoms/BoxContainer';
import NxCkLink from '../components/_atoms/Link';
import { Media } from '../media';

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
		<Image src={imageSrc} objectFit="cover" width="1440" height="93" />
	</Box>
);

//@ts-ignore
const Slider = (props) => {
	return (
		<Box pos="relative" {...props}>
			<Media greaterThan="lg">
				<Box pos="absolute" top="32px" left="32px" zIndex="1">
					<Image src="/logo_symbol.png" width="90" height="72" />
				</Box>
			</Media>

			<SliderItem imageSrc="/hero.jpg" />
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
		</Container>
	</Box>
);

//@ts-ignore
const BlockAnchor = ({ title, image, href, ...props }) => (
	<NxCkLink
		href={href}
		_hover={{
			textDecoration: 'none',
			'& img': {
				transform: 'scale(1.1) rotate(2deg)',
			},
		}}
		display="block"
		w={{ base: '100%', sm: '380px', lg: '574px' }}
		h={{ base: '380px', lg: '574px' }}
		{...props}
	>
		<Flex
			align="center"
			justify="center"
			pos="relative"
			h="100%"
			sx={{
				'& img ': {
					transition: 'all 420ms ease',
				},
			}}
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
	</NxCkLink>
);

const PhotoSection = () => (
	<Box h={{ base: 360, lg: '590px' }} pos="relative">
		<Box
			d="flex"
			flexWrap="wrap"
			alignItems="center"
			alignContent="center"
			px="4%"
			pos="relative"
			zIndex="1"
			maxW={{ base: '80%', lg: '40%' }}
			h="100%"
			bg="mg.primaryAlpha60"
		>
			<Heading as="h3" fontSize={{ base: 'x-large', lg: 'xxx-large' }} mb="4" color="white" width="100%">
				Fotografias para decorar seu ambiente
			</Heading>
			<NxCkLink href="/works/photography" color="white">
				Ver Coleções &rarr;
			</NxCkLink>
		</Box>
		<Box
			pos="absolute"
			top="0"
			right="0"
			left="0"
			bottom="0"
			bgImage="url('/mockup-home.png')"
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
				<Flex wrap={{ base: 'wrap', lg: 'nowrap' }}>
					<BlockAnchor
						title="Conheça os Livros"
						image="/book_mockup.jpg"
						mr={{ lg: 4 }}
						mb={{ base: 4, lg: 0 }}
						href="/education"
					/>
					<BlockAnchor title="Participe das Aulas" image="/classes_mockup.jpg" href="/education" />
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
			<Box as="a" href="https://www.youtube.com/user/michelgordon74" target="_blank">
				<Image src="/youtube_mockup.jpg" width="1080px" height="611px" />
			</Box>
		</Container>
	</Box>
);

const INSTAGRAM_SLIDER = [
	{
		url: '/instagram-1.jpg',
	},
	{
		url: '/instagram-2.jpg',
	},
	{
		url: '/instagram-3.jpg',
	},
	{
		url: '/instagram-4.jpg',
	},
	{
		url: '/instagram-5.jpg',
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
		partialVisibilityGutter: 20,
		slidesToSlide: 1, // optional, default to 1.
	},
};
const InstagramSection = () => (
	<Box pt="12" bg="white">
		<Container maxW="container.lg">
			<Text fontSize="4xl" fontWeight="bold" lineHeight="10" color="mg.primary" textAlign="center" mb="6">
				Últimas postagens do Instagram
			</Text>
		</Container>
		<Carousel partialVisible={true} responsive={IGCarouselConfig}>
			{INSTAGRAM_SLIDER.map((item, index) => (
				<Box width={{ base: '100%', lg: '330px' }} height="330px" position="relative">
					<Image key={index} src={item.url} objectFit="cover" layout="fill" />
				</Box>
			))}
		</Carousel>
	</Box>
);

// Home receives a `posts` prop from `getStaticProps` below
export default function Home() {
	return (
		<BoxContainer>
			<Box pt={{ base: '50vh', lg: 'calc(100vh - 100px)' }}>
				<Slider pos="fixed" top="0" left="0" right="0" maxW="1440px" mx="auto" />
				<Box pos="relative" zIndex="1">
					<Menu />
					<PhotoSection />
					<OtherResourcesSection />
					<YoutubeSection />
					<InstagramSection />
					<Footer />
				</Box>
			</Box>
		</BoxContainer>
	);
}
