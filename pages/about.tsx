import React from 'react';
import Image from 'next/image';
import { Box, Flex, Heading, Text, Stack, Button, Container } from '@chakra-ui/react';
import { GraphQLClient } from 'graphql-request';

import BoxContainer from '../components/_atoms/BoxContainer';
import Menu from '../components/_molecules/Menu';
import Footer from '../components/_molecules/Footer';

const Hero = ({ title, description, img }: any) => (
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
			<Text color="white" fontSize="xl">
				{description}
			</Text>
		</Box>
		<Image src={img} layout="fill" />
	</Flex>
);

const about = {
	title: `O Oriente Médio possui grande diversidade de culturas, origens e religiões.`,
	description: `A nossa paixão por todas elas é o que nos move!`,
	heroImg: '/about-img.jpg',
	photographer: '/michel-img.jpg',
	text: `<p>We have just one life and so many dreams. I was a physicist, I sailed on the seven seas as oceanographer (not true). Now I am a risk manager (for the last 20 years). I am also Brazilian photographer who traveled through the fascinating Islamic World capturing colours, textures, sounds and flavours. In other times, I would say I was an Orientalist, but now this might be considered an offence. It is, however, my great passion. On my free time, I also do (try to) some watercolours. Perhaps I was a sultan in another life, or at least a bey.</p><p>I have published two books: A Jew in Islam (ISBN: 9788579030055), and My Tehran, Your Tehran (ISBN: 9786009578238). You can find them in the EDUCATION section.</p><p>I also held photo exhibitions in Sao Paulo and Tehran and written numerous articles in newspapers and magazines.</p>`,
};

const SectionAbout = () => (
	<Flex wrap="wrap">
		<Box
			pos="relative"
			sx={{
				order: { base: 1, lg: 0 },
			}}
			flex={{ sm: '1 1 100%', lg: '1 1 50%', xl: '1 1 40%' }}
		>
			<Image src={about.photographer} layout="responsive" width="664px" height="664px" />
		</Box>
		<Box
			flex={{ sm: '1 1 100%', lg: '1 1 50%', xl: '1 1 60%' }}
			bg="white"
			py="12"
			px="8"
			fontSize="lg"
			sx={{
				'> p': { mb: 4, lineHeight: '1.45' },
				order: { base: 0, lg: 1 },
			}}
			color="mg.primary"
			dangerouslySetInnerHTML={{ __html: about.text }}
		/>
	</Flex>
);

const SectionText = () => (
	<Box bg="mg.secondary" textAlign="center" px={{ base: 4, lg: '20%' }} py="14">
		<Heading size="lg" mb="8">
			O Centro Cultural do Oriente Médio foi desenvolvido para disseminar o conhecimento e a cultura do Oriente
			Médio para os interessados ou apaixonados por esse universo.
		</Heading>
		<Text fontStyle="italic" fontSize="x-large">
			Através de nossas obras de arte e materiais didáticos, te levamos a uma viagem incrível sem sair do lugar.
		</Text>
	</Box>
);

const SponsorSection = () => (
	<Box bg="gray.300" overflowX="hidden">
		<Container maxW="container.xl">
			<Flex py="12" wrap={{ base: 'wrap', lg: 'nowrap' }}>
				<Box color="mg.primary" flex="0 0 auto" mx="auto">
					<Heading as="h3" textTransform="uppercase" mb="2">
						Seja um Parceiro
					</Heading>
					<Text mb="6" maxW="xl" fontSize="lg">
						O Centro Cultural do Oriente Médio é, também, um ambiente coletivo. Você pode expor seu trabalho
						e produtos aqui na nossa plataforma. Clique no botão abaixo e saiba mais!
					</Text>
					<Button
						bg="mg.primary"
						_hover={{
							bg: 'mg.secondary',
						}}
						color="white"
						size="lg"
						as="a"
						href="https://wa.me/+5511950202215"
						target="_blank"
					>
						Quero Contribuir
					</Button>
				</Box>
			</Flex>
		</Container>
	</Box>
);

export default function About() {
	return (
		<BoxContainer>
			<>
				<Menu />
				<Hero title={about.title} description={about.description} img={about.heroImg} />
				<SectionAbout />
				<SectionText />
				<SponsorSection />
				<Footer />
			</>
		</BoxContainer>
	);
}
