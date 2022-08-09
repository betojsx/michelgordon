import React, { FunctionComponent } from 'react';
import { Flex } from '@chakra-ui/react';
import { Title } from './Title';

export const Headline: FunctionComponent = ({ children }) => (
	<Flex
		py="12"
		px={4}
		align="center"
		justify="center"
		bg="white"
		minHeight={200}
		sx={{ '@media(min-width: 768px)': { minHeight: 380 } }}
	>
		<Title>{children}</Title>
	</Flex>
);
