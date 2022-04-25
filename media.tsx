import { createMedia } from '@artsy/fresnel';

const ExampleAppMedia = createMedia({
	breakpoints: {
		xs: 0,
		sm: 480,
		md: 768,
		lg: 992,
		xl: 1280,
		'2xl': 1536,
	},
});

// Make styles for injection into the header of the page
export const mediaStyles = ExampleAppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = ExampleAppMedia;
