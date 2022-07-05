import { Stack, Image, Box } from '@chakra-ui/react';

const LinkIcon = ({ url, icon }: any) => (
	<Box as="a" href={url} w="48px" h="48px" target="_blank" rel="noopener noreferrer">
		<Image src={icon} />
	</Box>
);

const socialIcons = [
	{
		icon: '/social_youtube.png',
		url: 'https://www.youtube.com/user/michelgordon74',
	},
	{
		icon: '/social_facebook.png',
		url: 'https://www.facebook.com/michelgordon.art',
	},
	{
		icon: '/social_instagram.png',
		url: 'https://www.instagram.com/michelgordon.art/',
	},
	{
		icon: '/social_whatsapp.png',
		url: 'https://wa.me/+352691558163',
	},
];

export default function SocialLinks(props: any) {
	const { isFloating } = props;
	return (
		<Stack direction={isFloating ? 'column' : 'row'} spacing="4" {...props}>
			{socialIcons.map((item, index) => (
				<LinkIcon url={item.url} icon={item.icon} key={index} />
			))}
		</Stack>
	);
}
