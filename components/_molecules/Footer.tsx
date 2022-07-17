import React from 'react';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import NxCkLink from '../_atoms/Link';
import Image from 'next/image';

export default function Footer() {
	return (
		<Box>
			<Box bg="mg.primary" py="12">
				<Container maxW="container.lg">
					<Flex align="flex-start" wrap="wrap">
						<Box mr={{ base: 'auto', lg: 8 }} ml={{ base: 'auto', lg: 0 }}>
							<Image src="/symbol-footer.png" width="200px" height="161,5px" />
						</Box>
						<Box mr="10" mt={4}>
							<NxCkLink href="/works" fontSize="lg" mb="4" d="block" color="white">
								Leve uma obra e decore seu ambiente
							</NxCkLink>
							<NxCkLink href="/blog" fontSize="lg" mb="4" d="block" color="white">
								Leia mais sobre o Oriente Médio
							</NxCkLink>
							<NxCkLink href="/education" fontSize="lg" mb="4" d="block" color="white">
								Participe da próxima aula
							</NxCkLink>
						</Box>
						<Box mr="10" mt={4}>
							<NxCkLink href="/contact" fontSize="lg" mb="4" d="block" color="white">
								Fale Conosco
							</NxCkLink>

							<Box
								as="a"
								href="https://www.youtube.com/user/michelgordon74"
								target="_blank"
								fontSize="lg"
								mb="4"
								d="block"
								color="white"
							>
								Se inscreva em nosso canal no YouTube
							</Box>
						</Box>
					</Flex>
				</Container>
			</Box>
			<Box bg="mg.secondary" py="5">
				<Flex align="center" justify="center" wrap={{ base: 'wrap', lg: 'nowrap' }}>
					<Text mr="3">Designed by</Text> <Image src="/mybuu.png" width="88px" height="27px" />
					<Text ml="4">Todos os direitos reservados.</Text>
				</Flex>
			</Box>
		</Box>
	);
}
