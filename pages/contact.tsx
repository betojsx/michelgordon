import React from 'react';
import Image from 'next/image';
import {
	Box,
	Flex,
	Heading,
	Text,
	Stack,
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Textarea,
} from '@chakra-ui/react';
import { GraphQLClient } from 'graphql-request';

import BoxContainer from '../components/_atoms/BoxContainer';
import Menu from '../components/_molecules/Menu';
import Footer from '../components/_molecules/Footer';
import SocialLinks from '../components/_atoms/SocialLinks';

const Hero = ({ title, description, img }: any) => (
	<Flex
		pos="relative"
		h={{ lg: 'calc(80vh - 100px)' }}
		align="center"
		justify="center"
		wrap={{ base: 'wrap', lg: 'nowrap' }}
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
		<Container maxW="container.xl" pos="relative" zIndex="1">
			<Flex justify="flex-start" px="4">
				<Box maxW="lg" py={{ base: 6, lg: 0 }}>
					<Heading size="xl" color="white" mb="4">
						TEM ALGUMA DÚVIDA, QUER CONTRIBUIR COM O CENTRO, OU SE TORNAR UM PARCEIRO?
					</Heading>
					<Text color="white" fontSize="xl" mb="12">
						Basta preencher o formulário ao lado que retornaremos o seu contato!
					</Text>
					<SocialLinks mb="4" />
					<Text color="whiteAlpha.800">example@email.com</Text>
					<Text color="whiteAlpha.800">+55 11 98888-8888</Text>
				</Box>
			</Flex>
		</Container>
		<Box
			pos={{ base: 'static', lg: 'absolute' }}
			zIndex="1"
			bottom="0"
			right="10"
			py={{ base: 6, lg: '10' }}
			px="8"
			bg="mg.secondary"
			maxW="lg"
			w="100%"
		>
			<FormControl mb="4">
				<FormLabel>Nome</FormLabel>
				<Input type="text" id="nome" name="nome" bg="white" color="mg.primary" />
			</FormControl>
			<FormControl mb="4">
				<FormLabel>Email</FormLabel>
				<Input type="email" id="email" name="email" bg="white" color="mg.primary" />
			</FormControl>
			<FormControl mb="4">
				<FormLabel>
					Whatsapp{' '}
					<Text d="inline-block" fontSize="xs">
						(Código do país + DDD + Número)
					</Text>
				</FormLabel>
				<Input type="email" id="email" name="email" bg="white" color="mg.primary" />
			</FormControl>
			<FormControl mb="4">
				<FormLabel>Mensagem</FormLabel>
				<Textarea id="message" name="message" bg="white" color="mg.primary" />
			</FormControl>
			<Button bg="mg.primary" color="white" size="lg">
				Enviar
			</Button>
		</Box>
		<Image src="/contact-img.jpg" layout="fill" />
	</Flex>
);

export default function About() {
	return (
		<BoxContainer>
			<>
				<Menu />
				<Hero />
				<Footer />
			</>
		</BoxContainer>
	);
}
