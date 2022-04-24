import React, { ReactChild } from 'react';
import Link, { LinkProps } from 'next/link';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

type NxCkLinkProps = LinkProps & ChakraLinkProps;

export default function NxCkLink({ href, children, ...props }: NxCkLinkProps) {
	return (
		<Link href={href}>
			<ChakraLink {...props}>{children}</ChakraLink>
		</Link>
	);
}
