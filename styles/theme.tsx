import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
	fonts: {
		body: 'Rubik, system-ui, sans-serif',
		heading: 'Poppins, system-ui, sans-serif',
		mono: 'Menlo, monospace',
	},
	colors: {
		mg: {
			primary: '#421903',
			secondary: '#C8834E',

			primaryAlpha60: 'rgba(66, 25, 3, 0.6)',
		},
	},
});
