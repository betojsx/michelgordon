import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider, CSSReset } from '@chakra-ui/react';

import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
export default MyApp;
