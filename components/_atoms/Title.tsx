import type { FunctionComponent } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const Title: FunctionComponent<HeadingProps> = (props) => {
	return <Heading size="lg" {...props}></Heading>;
};

Title.defaultProps = {
	textAlign: 'center',
	color: 'mg.primary',
	maxW: 'container.md',
	fontSize: { base: 'xl', md: '2xl', lg: '5xl' },
};
