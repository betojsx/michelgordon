import * as React from 'react';
import { useMediaQuery } from './useMediaQuery';

export function chunkArray(myArray: Array<any>, chunkSize: number, exception?: number[]) {
	const arrayLength = myArray.length;
	const tempArray = [];
	let myChunk = [];
	for (let index = 0; index < arrayLength; index += chunkSize) {
		if (exception?.length && exception.includes(index + 1)) {
			myChunk = myArray.slice(index, index + 1);
			index -= chunkSize;
			index += 1;
		} else {
			myChunk = myArray.slice(index, index + chunkSize);
		}
		// Do something if you want with the group
		tempArray.push(myChunk);
	}

	return tempArray;
}

const breakpoints = {
	sm: '30em',
	md: '48em',
	lg: '62em',
	xl: '80em',
	'2xl': '96em',
};
type Size = keyof typeof breakpoints;
export function useBreakpoint(size: Size, direction: 'up' | 'down' = 'up') {
	const directionValue = direction === 'up' ? 'min' : 'max';

	return useMediaQuery(`(${directionValue}-width: ${breakpoints[size]})`, false);
}
