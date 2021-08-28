import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider, CSSReset } from '@chakra-ui/react';

import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/600.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/700.css';
import '@fontsource/rubik/600.css';

import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
export default MyApp;
