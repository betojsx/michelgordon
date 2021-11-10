import { Stack, Image } from '@chakra-ui/react';
import NxCkLink from './Link';

const LinkIcon = ({ url, icon }: any) => (
	<NxCkLink href={url} w="48px" h="48px">
		<Image src={icon} />
	</NxCkLink>
);

const socialIcons = [
	{
		icon: '/social_youtube.png',
		url: '#',
	},
	{
		icon: '/social_facebook.png',
		url: '#',
	},
	{
		icon: '/social_instagram.png',
		url: '#',
	},
	{
		icon: '/social_whatsapp.png',
		url: '#',
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
