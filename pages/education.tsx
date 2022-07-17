import React from 'react';
import Image from 'next/image';
import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	Heading,
	SimpleGrid,
	Stack,
	Text,
} from '@chakra-ui/react';
import Menu from '../components/_molecules/Menu';
import Footer from '../components/_molecules/Footer';
import NxCkLink from '../components/_atoms/Link';
import BoxContainer from '../components/_atoms/BoxContainer';
import { Media } from '../media';
const Headline = () => (
	<Flex py="12" minH="380" align="center" justify="center" bg="white">
		<Heading size="2xl" maxW="container.md" color="mg.primary" textAlign="center">
			Participe de aulas educativas sobre o Oriente Médio e conheça novas pessoas para trocar ideia sobre o tema.
		</Heading>
	</Flex>
);

interface IBannerProps {
	title: string;
	text: string;
	buttonText: string;
	image: string;
}

const STEPS = [
	{
		image: '/htb_icon_step1.png',
		text: 'Escolha a sua obra favorita, defina tamanho, material e cores (podemos te ajudar nessa escolha).',
	},
	{
		image: '/htb_icon_step2.png',
		text: 'Nos envie pelo WhatsApp a sua escolha. Nós organizaremos tudo para você e lhe passaremos os dados para pagamento.',
	},
	{
		image: '/htb_icon_step3.png',
		text: 'Agora é só aguardar a sua obra chegar no seu endereço. Assim que chegar, manda uma fotinha do ambiente com ela para vermos!',
	},
];

const BOOKS = [
	{
		id: 1,
		img: '/book-um-judeu-no-isla.jpg',
		title: 'Um Judeu no Islã',
		author: 'Michel Gordon',
		url: 'https://www.amazon.com.br/Um-Judeu-Isl%C3%A3-Michel-Gordon/dp/8579030056',
	},
	{
		id: 2,
		img: '/book-my-tehran.jpg',
		title: 'My Tehran, Your Tehran',
		author: 'Michel Gordon',
		url: '#',
	},
];

const HowToBuy = () => (
	<Flex py="12" minH="380" align="center" justify="center" bg="white" wrap="wrap">
		<Heading size="xl" maxW="460px" color="mg.primary" textAlign="center" mb={{ base: 0, lg: 8 }}>
			Como Ter Uma Obra Para Chamar de Sua
		</Heading>
		<Flex
			justify="space-between"
			align="flex-start"
			px="12"
			my={{ base: 4, lg: 10 }}
			wrap={{ base: 'wrap', lg: 'nowrap' }}
		>
			{STEPS.map((step, index) => (
				<Box maxW={{ base: '100%', lg: '33%' }} mb={{ base: 8, lg: 0 }} textAlign="center" key={index}>
					<Image src={step.image} width="160px" height="auto" />
					<Text color="mg.primary" fontSize="xl" lineHeight="shorter" mt="4">
						{step.text}
					</Text>
				</Box>
			))}
		</Flex>
		<Button bg="mg.primary" color="white" size="lg">
			Quero Adquirir uma Obra
		</Button>
	</Flex>
);

const Banner = ({ title, text, buttonText, image }: IBannerProps) => (
	<Flex
		flex="0 0 100%"
		py="12"
		align="center"
		justify="center"
		pos="relative"
		minH="md"
		_hover={{
			'& img': {
				transform: 'scale(1.1)',
			},
		}}
		sx={{
			'& img ': {
				transition: 'all 420ms ease',
			},
		}}
	>
		<Box maxW="md" pos="relative" zIndex="1" textAlign="center" px={4}>
			<Heading size="2xl" mb="6" color="white">
				{title}
			</Heading>
			<Text fontSize="2xl" mb="4" lineHeight="8" color="white">
				{text}
			</Text>
			<Button as="span">Saiba Mais</Button>
		</Box>
		<Box
			pos="absolute"
			left="0"
			right="0"
			top="0"
			bottom="0"
			_after={{
				content: '""',
				position: 'absolute',
				top: '0',
				right: '0',
				bottom: '0',
				left: '0',
				bg: 'mg.primaryAlpha60',
				transform: 'translate3d(0, 0, 0)',
			}}
		>
			<Image src={image} layout="fill" objectFit="cover" />
		</Box>
	</Flex>
);
export default function Education() {
	return (
		<BoxContainer>
			<Box>
				<Menu />
				<Headline />
				<Accordion>
					<AccordionItem border="0">
						<AccordionButton padding="0">
							<Banner
								title="Aulas"
								text="Aulas gratuitas pelo zoom. Clique no link abaixo e participe!"
								buttonText="Saiba Mais"
								image="/classes_big_mockup.jpg"
							/>
						</AccordionButton>
						<AccordionPanel pb={4} bg="white" p={{ lg: 20 }}>
							<Heading>
								Nosso cronograma de aulas é realizado através do nosso grupo no WhatsApp. Clique no
								botão e faça parte da nossa turma
							</Heading>
							<Button
								bg="mg.primary"
								_hover={{
									bg: 'mg.secondary',
								}}
								color="white"
								fontSize={{ base: 'sm', lg: '2xl' }}
								type="submit"
								as="a"
								href="https://wa.me/+352691558163"
								target="_blank"
								margin={{ base: '20px 0', lg: '20px auto 60px' }}
								display="inline-flex"
							>
								QUERO ENTRAR NO GRUPO DAS AULAS
							</Button>
							<Media greaterThan="lg">
								<Box as="a" href="https://www.youtube.com/user/michelgordon74" target="_blank">
									<Image src="/youtube_canal.jpg" width="1292" height="344" layout="responsive" />
								</Box>
							</Media>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem border="0">
						<AccordionButton padding="0">
							<Banner
								title="Livros"
								text="Aprofunde seu conhecimento através
								da nossa variedade de livros sobre o Oriente Médio"
								buttonText="Saiba Mais"
								image="/books_big_mockup.jpg"
							/>
						</AccordionButton>
						<AccordionPanel bg="white" p={{ lg: 20 }}>
							<SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
								{BOOKS.map(({ id, img, url, title, author }) => (
									<Box
										key={`book-${id}`}
										as="a"
										href={url}
										target={url.length > 5 ? '_blank' : '_self'}
									>
										<Box
											width={{ base: '100%', lg: 388 }}
											height={{ base: '300px', lg: 388 }}
											position="relative"
											mb={2}
										>
											<Image src={img} layout="fill" objectFit="cover" />
										</Box>
										<Text color="mg.primary" fontSize="2xl" mb={1}>
											{title}
										</Text>
										<Text color="mg.primaryAlpha60" fontSize="xl" mb={1}>
											{author}
										</Text>
									</Box>
								))}
							</SimpleGrid>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>

				<Footer />
			</Box>
		</BoxContainer>
	);
}
