import React, { ReactChild } from 'react';
import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

interface NxCkLinkProps {
	href: string;
	children: ReactChild;
	[propName: string]: any;
}
export default function NxCkLink({ href, children, ...props }: NxCkLinkProps) {
	return (
		<Link href={href}>
			<ChakraLink {...props}>{children}</ChakraLink>
		</Link>
	);
}
