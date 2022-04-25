import { useBreakpoint as useChakraBreakpoint, useMediaQuery } from '@chakra-ui/react';

const breakpoints = {
	base: 0,
	sm: 30,
	md: 48,
	lg: 62,
	xl: 80,
	'2xl': 96,
};
type Size = keyof typeof breakpoints;
export const useBreakpoint = (size: Size, direction: 'up' | 'down' = 'up') => {
	const chakraBreakpoint = useChakraBreakpoint('base') || 'base';

	return direction === 'up'
		? breakpoints[chakraBreakpoint] >= breakpoints[size]
		: breakpoints[chakraBreakpoint] <= breakpoints[size];
};
