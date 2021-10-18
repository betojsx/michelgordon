import { Box } from '@chakra-ui/react';
import React, { ReactChild } from 'react';

export default function BoxContainer({ children }: { children: ReactChild }) {
	return (
		<Box maxW="1440px" mx="auto">
			<Box>{children}</Box>
		</Box>
	);
}
