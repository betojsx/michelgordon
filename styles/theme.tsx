import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
	styles: {
		global: {
			body: {
				backgroundColor: 'mg.primary',
			},
			'.my-masonry-grid': {
				display: 'flex',
				marginLeft: '-16px' /* gutter size offset */,
				width: 'auto',
				padding: '16px',
			},
			'.my-masonry-grid_column': {
				paddingLeft: '16px' /* gutter size */,
				backgroundClip: 'padding-box',
			},

			/* Style your items */
			'.my-masonry-grid_column > div': {
				background: 'grey',
				marginBottom: '16px',
			},
		},
	},
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
			secondaryAlpha60: 'rgba(200, 131, 78, 0.6);',
		},
	},
});
