import {
	Box,
	Flex,
	Icon,
	IconButton,
	Link as ChakraLink,
	Modal,
	ModalCloseButton,
	ModalContent,
	useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { Media } from '../../media';
import NxCkLink from '../_atoms/Link';
const menuItems = [
	{
		label: 'Home',
		url: '/',
	},
	{
		label: 'Obras',
		url: '/works',
	},
	{
		label: 'Educação',
		url: '/education',
	},
	{
		label: 'Sobre',
		url: '/about',
	},
	{
		label: 'Contato',
		url: '/contact',
	},
	{
		label: 'Blog',
		url: '/blog',
	},
];

const Nav = () => {
	return (
		<Flex as="nav" direction={{ base: 'column', lg: 'row' }} align="center">
			{menuItems.map(({ label, url }, index) => (
				<Box ml="6" key={label}>
					<Link href={url}>
						<ChakraLink
							textTransform="uppercase"
							color="white"
							fontWeight={{ base: 'bold', lg: 'normal' }}
							mb={{ base: 4, lg: 0 }}
							display="inline-block"
						>
							{label}
						</ChakraLink>
					</Link>
				</Box>
			))}
		</Flex>
	);
};
const DesktopMenu = () => {
	const [isSticky, setIsSticky] = useState(false);
	const headerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// @ts-ignore
		const headerTop = headerRef.current?.getBoundingClientRect().top + window.pageYOffset;
		const headerHeight = headerRef.current?.getBoundingClientRect().height;

		const handleScroll = () => {
			const windowTop = window.pageYOffset;

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
			document.body.style.paddingTop = '0';
		};
	}, []);
	return (
		<Box
			bg="mg.primary"
			pos={isSticky ? 'fixed' : 'static'}
			top="0"
			left="0"
			right="0"
			zIndex="2"
			shadow="sm"
			h={100}
			ref={headerRef}
			display="flex"
			alignItems="center"
		>
			<Flex px="8" flex="0 0 100%" justify="space-between" align="center" maxW="1440px" mx="auto">
				<NxCkLink href="/" cursor="pointer">
					<Image src="/logo_michel_gordon.png" width="280" height="83" />
				</NxCkLink>
				<Nav />
			</Flex>
		</Box>
	);
};

const MobileMenu = () => {
	const { isOpen, onOpen: handleOpen, onClose: handleClose } = useDisclosure();

	return (
		<>
			<Flex p="4" bg="mg.primary" alignItems="center" justifyContent="space-between">
				<NxCkLink href="/" cursor="pointer">
					<Image src="/logo_symbol.png" width="45" height="36" />
				</NxCkLink>
				<IconButton
					onClick={handleOpen}
					aria-label="Open menu"
					variant="outline"
					colorScheme="whiteAlpha"
					icon={<Icon as={RiMenuLine} />}
				/>
			</Flex>
			<Modal isOpen={isOpen} onClose={handleClose} size="full" motionPreset="slideInBottom" trapFocus={false}>
				<ModalContent
					bgColor="mg.primary"
					pt="10em"
					sx={{
						'@supports (min-height: -webkit-fill-available)': {
							minHeight: '100%',
						},
					}}
				>
					<ModalCloseButton color="white" size="lg" />
					<Nav />
				</ModalContent>
			</Modal>
		</>
	);
};

const Menu = () => {
	return (
		<>
			<Media lessThan="lg">
				<MobileMenu />
			</Media>
			<Media greaterThan="lg">
				<DesktopMenu />
			</Media>
		</>
	);
};

export default Menu;
