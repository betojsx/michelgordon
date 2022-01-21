import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react';
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
		url: '#',
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
const Menu = () => {
	const [isSticky, setIsSticky] = useState(false);
	const headerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// @ts-ignore
		const headerTop = headerRef.current.getBoundingClientRect().top + window.pageYOffset;
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
			zIndex="2"
			maxW="1440px"
			mx="auto"
		>
			<Image src="/logo_michael_gordon.png" width="268" height="59" />
			<Flex as="nav">
				{menuItems.map(({ label, url }, index) => (
					<Box ml="6" key={label}>
						<Link href={url}>
							<ChakraLink textTransform="uppercase" color="white">
								{label}
							</ChakraLink>
						</Link>
					</Box>
				))}
			</Flex>
		</Flex>
	);
};

export default Menu;
