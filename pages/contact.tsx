import React, { FormEvent, FormEventHandler } from 'react';
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
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';

import BoxContainer from '../components/_atoms/BoxContainer';
import Menu from '../components/_molecules/Menu';
import Footer from '../components/_molecules/Footer';
import SocialLinks from '../components/_atoms/SocialLinks';

type FormSubmitEventHandler = FormEventHandler<HTMLFormElement> & FormEventHandler<HTMLDivElement>;

const Hero = ({ title, description, img }: any) => {
	const toast = useToast();

	const handleSubmit: FormSubmitEventHandler = async (event) => {
		const body = Object.fromEntries(new FormData(event.target as HTMLFormElement));
		const url = `https://wondrous-manatee-3210aa.netlify.app/.netlify/functions/sendemail`;
		event.preventDefault();
		try {
			const response = await axios.post(url, body);
			toast({
				title: 'Email enviado com sucesso!',
				description: 'Retornaremos seu contato o mais breve possível.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		} catch (err) {
			toast({
				title: 'Aconteceu um problema',
				description: 'Não foi possível enviar o seu email. Por favor, tente novamente.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
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
							TEM ALGUMA DÚVIDA OU QUER SE TORNAR UM PARCEIRO?
						</Heading>
						<Text color="white" fontSize="xl" mb="12">
							Basta preencher o formulário ao lado que retornaremos o seu contato!
						</Text>
						<SocialLinks mb="4" />
						<Text color="whiteAlpha.800">michelgordon74@hotmail.com</Text>
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
				as="form"
				method="POST"
				onSubmit={handleSubmit}
			>
				<FormControl mb="4">
					<FormLabel>Nome</FormLabel>
					<Input
						type="text"
						id="nome"
						name="name"
						bg="white"
						color="mg.primary"
						required
						placeholder="Seu nome"
					/>
				</FormControl>
				<FormControl mb="4">
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						id="email"
						name="email"
						bg="white"
						color="mg.primary"
						required
						placeholder="Seu email"
					/>
				</FormControl>
				<FormControl mb="4">
					<FormLabel>
						Whatsapp{' '}
						<Text d="inline-block" fontSize="xs">
							(Código do país + DDD + Número)
						</Text>
					</FormLabel>
					<Input
						type="tel"
						id="phone"
						name="phone"
						bg="white"
						color="mg.primary"
						placeholder="ex: +551198888-8888"
					/>
				</FormControl>
				<FormControl mb="4">
					<FormLabel>Mensagem</FormLabel>
					<Textarea
						id="message"
						name="message"
						bg="white"
						color="mg.primary"
						required
						placeholder="Sua mensagem"
					/>
				</FormControl>
				<Button
					bg="mg.primary"
					_hover={{
						bg: 'mg.secondary',
					}}
					color="white"
					size="lg"
					type="submit"
				>
					Enviar
				</Button>
			</Box>
			<Image src="/contact-img.jpg" layout="fill" />
		</Flex>
	);
};

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
