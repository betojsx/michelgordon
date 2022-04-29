import React, { useCallback } from 'react';
import Image from 'next/image';
import {
	Box,
	Flex,
	Heading,
	Text,
	Stack,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useBreakpointValue,
} from '@chakra-ui/react';
import graphcmsClient from '../../utils/graphcmsClient';
import BoxContainer from '../../components/_atoms/BoxContainer';
import Menu from '../../components/_molecules/Menu';
import Footer from '../../components/_molecules/Footer';
import Masonry from 'react-masonry-css';
import { IPhoto } from '../../types/photo.interface';

const Hero = ({ title, image }: { title: string; image: any }) => (
	<Flex
		pos="relative"
		h="calc(100vh - 200px)"
		align="center"
		justify="center"
		bgImg={image.url}
		bgSize="cover"
		bgPos="center"
	>
		<Heading
			size="4xl"
			maxW="container.md"
			mb="3"
			color="transparent"
			bgImage="inherit"
			bgClip="text"
			mixBlendMode="screen"
			textShadow="xl"
		>
			{title}
		</Heading>
	</Flex>
);

const breakpointColumnsObj = {
	default: 3,
	700: 2,
	500: 1,
};
const PhotosSection = ({ photos }: { photos: Array<any> }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [displayPhoto, setDisplayPhoto] = React.useState<IPhoto | null>(null);
	const modalSize = useBreakpointValue({ base: 'full', lg: '2xl' });
	const openImageOnDialog = useCallback(
		(photo) => {
			onOpen();
			setDisplayPhoto(photo);
		},
		[onOpen]
	);

	return (
		<Box bg="white">
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{photos.map((photo) => (
					<Box w="100%" pos="relative" mb="4" cursor="pointer" onClick={() => openImageOnDialog(photo)}>
						<Image src={photo.url} width={photo.width} height={photo.height} layout="responsive" />
					</Box>
				))}
			</Masonry>
			<Modal isOpen={isOpen} onClose={onClose} size={modalSize} trapFocus={false}>
				<ModalOverlay />
				<ModalContent bg="mg.primary">
					<ModalHeader />
					<ModalCloseButton color="white" />
					{displayPhoto && (
						<Box p={2} mt={2}>
							<Image
								src={displayPhoto.url}
								layout="responsive"
								width={displayPhoto.width}
								height={displayPhoto.height}
							/>
						</Box>
					)}
				</ModalContent>
			</Modal>
		</Box>
	);
};

const CallToAction = () => (
	<Flex justify="center" align="center" py="12" bg="white" wrap="wrap">
		<Heading as="h3" size="xl" textTransform="uppercase" color="mg.primary" mb="4" w="100%" textAlign="center">
			Compre Agora
		</Heading>
		<Button bg="mg.primary" color="white" size="lg">
			Quero Adquirir uma Obra
		</Button>
	</Flex>
);
export default function Collection({ collection, hero }: any) {
	const { title, description, image, photos } = collection;
	return (
		<BoxContainer>
			<>
				<Menu />
				<Hero title={title} image={image} />
				<PhotosSection photos={photos} />
				<CallToAction />
				<Footer />
			</>
		</BoxContainer>
	);
}
const graphcms = graphcmsClient();
export async function getStaticProps({ params }: any) {
	const { collection } = await graphcms.request(
		`
		query CollectionBySlug($slug: String){
			collection(where: {slug: $slug}){
			  title
			  description
			  image {
				  url
			  }
			  photos{
				url
				description
				width
				height
			  }
			}
		  }
		`,
		{
			slug: params.slug,
		}
	);
	return {
		props: {
			collection,
		},
	};
}

export async function getStaticPaths() {
	const { collections } = await graphcms.request(`
		query Collections{
			collections{
		 		slug
			}
		}
	`);

	return {
		paths: collections.map(({ slug }: { slug: string }) => ({
			params: { slug },
		})),
		fallback: false,
	};
}
