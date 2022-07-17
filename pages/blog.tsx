import React from 'react';
import Image from 'next/image';
import {
	Box,
	Flex,
	Heading,
	Text,
	Stack,
	Button,
	Tag,
	TagLabel,
	HStack,
	Container,
	Divider,
	Icon,
} from '@chakra-ui/react';
import { GraphQLClient } from 'graphql-request';

import BoxContainer from '../components/_atoms/BoxContainer';
import Menu from '../components/_molecules/Menu';
import Footer from '../components/_molecules/Footer';
import NxCkLink from '../components/_atoms/Link';
import graphcmsClient from '../utils/graphcmsClient';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa';

const Headline = () => (
	<Box py="12" minH="200" alignContent="center" justifyContent="center" bg="white" flexWrap="wrap">
		<Container maxW="container.xl">
			<Heading size="2xl" color="mg.primary" textAlign="center" mb="8">
				Blog
			</Heading>
			<Divider borderColor="gray.300" />
		</Container>
	</Box>
);

const PostsSection = ({ posts }: { posts: Array<any> }) => (
	<Box bg="white" py="12">
		<Container maxW="container.xl">
			<Heading color="mg.primary" mb="2">
				Postagens Anteriores
			</Heading>
			<Flex wrap="wrap" align="flex-start" justify="flex-start">
				{posts.map((post) => (
					<Box
						w={{ base: '100%', lg: 'calc(33% - 16px)' }}
						mb="8"
						mx="2"
						pos="relative"
						_hover={{
							span: {
								transform: 'translateY(0)',
							},
						}}
					>
						<NxCkLink href={`/posts/${post.slug}`}>
							<>
								<Box
									pos="relative"
									mb="4"
									_hover={{
										_after: {
											bg: 'mg.primaryAlpha60',
										},
									}}
									_after={{
										content: '""',
										position: 'absolute',
										top: '0',
										right: '0',
										bottom: '0',
										left: '0',
										bg: 'transparent',
										transition: 'all 420ms ease',
									}}
								>
									<Image
										src={post.featuredImage?.url || 'https://picsum.photos/seed/picsum/600/428'}
										width="428px"
										height="428px"
										layout="responsive"
									/>
								</Box>
								<Box
									pos="absolute"
									bottom="40px"
									left="20px"
									display="flex"
									justifyContent="space-between"
									alignItems="flex-end"
									right="20px"
								>
									<Heading as="h3" size="md" color="white">
										{post.title}
									</Heading>
									<Box
										color="white"
										display="flex"
										justifyContent="space-between"
										alignItems="center"
										as="span"
										transition="all 420ms ease"
										transform="translateY(100px)"
									>
										<Icon as={FaBookOpen} />
										<Text ml="2">Ler</Text>
									</Box>
								</Box>
							</>
						</NxCkLink>
					</Box>
				))}
			</Flex>
		</Container>
	</Box>
);

const CallToAction = () => (
	<Flex justify="center" align="center" py="12" bg="white" wrap="wrap">
		<Heading as="h3" size="xl" textTransform="uppercase" color="mg.primary" mb="4" w="100%" textAlign="center">
			Compre Agora
		</Heading>
		<Button
			bg="mg.primary"
			_hover={{
				bg: 'mg.secondary',
			}}
			color="white"
			size="lg"
		>
			Quero Adquirir uma Obra
		</Button>
	</Flex>
);
const LastPost = ({ lastPost }: any) => (
	<Box bg="white">
		<Container maxW="container.xl">
			<Heading color="mg.primary" mb="2">
				Último Post
			</Heading>
			<NxCkLink href={`/posts/${lastPost.slug}`} _hover={{ textDecoration: 'none' }}>
				<HStack wrap="wrap" spacing="4" bg="mg.primary">
					<Box width={{ base: '100%', lg: '58%' }} height="336px" pos="relative">
						<Image
							src={lastPost.featuredImage?.url || 'https://picsum.photos/seed/picsum/800/428'}
							layout="fill"
						/>
					</Box>
					<Box w={{ base: '100%', lg: '39%' }} px={{ base: 2, lg: 6 }} py={{ base: 4, lg: 0 }}>
						<Heading as="h3" size="lg" color="white" mb="2">
							{lastPost.title}
						</Heading>
						<Box
							color="white"
							dangerouslySetInnerHTML={{ __html: truncateHTML(lastPost.content.html, 200) + '[...]' }}
						></Box>
					</Box>
				</HStack>
			</NxCkLink>
		</Container>
	</Box>
);
export default function Collection({ posts }: { posts: Array<any> }) {
	const [lastPost] = posts.splice(0, 1);

	return (
		<BoxContainer>
			<Box bg="white">
				<Menu />
				<Headline />
				{lastPost && <LastPost lastPost={lastPost} />}
				<PostsSection posts={posts} />

				<Footer />
			</Box>
		</BoxContainer>
	);
}
const graphcms = graphcmsClient();
export async function getStaticProps({ params }: any) {
	const { posts } = await graphcms.request(
		`
		query Posts{
			posts{
			  title
			  slug
			  featuredImage{
				 url
			  }
			  content{
				  html
			  }
			}
		  }
		`
	);

	return {
		props: {
			posts,
		},
	};
}
function truncateHTML(text: any, length: number) {
	var truncated = text.substring(0, length);
	// Remove line breaks and surrounding whitespace
	truncated = truncated.replace(/(\r\n|\n|\r)/gm, '').trim();
	// If the text ends with an incomplete start tag, trim it off
	truncated = truncated.replace(/<(\w*)(?:(?:\s\w+(?:={0,1}(["']{0,1})\w*\2{0,1})))*$/g, '');
	// If the text ends with a truncated end tag, fix it.
	const truncatedEndTagExpr = /<\/((?:\w*))$/g;
	const truncatedEndTagMatch = truncatedEndTagExpr.exec(truncated);
	if (truncatedEndTagMatch != null) {
		const truncatedEndTag = truncatedEndTagMatch[1];
		// Check to see if there's an identifiable tag in the end tag
		if (truncatedEndTag.length > 0) {
			// If so, find the start tag, and close it
			const startTagExpr = new RegExp('<(' + truncatedEndTag + '\\w?)(?:(?:\\s\\w+(?:=(["\'])\\w*\\2)))*>');
			let testString = truncated;
			let startTagMatch = startTagExpr.exec(testString);

			let startTag = null;
			while (startTagMatch != null) {
				startTag = startTagMatch[1];
				testString = testString.replace(startTagExpr, '');
				startTagMatch = startTagExpr.exec(testString);
			}
			if (startTag != null) {
				truncated = truncated.replace(truncatedEndTagExpr, '</' + startTag + '>');
			}
		} else {
			// Otherwise, cull off the broken end tag
			truncated = truncated.replace(truncatedEndTagExpr, '');
		}
	}
	// Now the tricky part. Reverse the text, and look for opening tags. For each opening tag,
	//  check to see that he closing tag before it is for that tag. If not, append a closing tag.
	let testString = reverseHtml(truncated);
	const reverseTagOpenExpr = /<(?:(["'])\w*\1=\w+ )*(\w*)>/;
	let tagMatch = reverseTagOpenExpr.exec(testString);
	while (tagMatch != null) {
		const tag = tagMatch[0];
		const tagName = tagMatch[2];
		const startPos = tagMatch.index;
		const endPos = startPos + tag.length;
		const fragment = testString.substring(0, endPos);
		// Test to see if an end tag is found in the fragment. If not, append one to the end
		//  of the truncated HTML, thus closing the last unclosed tag
		if (!new RegExp('<' + tagName + '/>').test(fragment)) {
			truncated += '</' + reverseHtml(tagName) + '>';
		}
		// Get rid of the already tested fragment
		testString = testString.replace(fragment, '');
		// Get another tag to test
		tagMatch = reverseTagOpenExpr.exec(testString);
	}
	return truncated;
}

function reverseHtml(str: string) {
	var ph = String.fromCharCode(206);
	var result = str.split('').reverse().join('');
	while (result.indexOf('<') > -1) {
		result = result.replace('<', ph);
	}
	while (result.indexOf('>') > -1) {
		result = result.replace('>', '<');
	}
	while (result.indexOf(ph) > -1) {
		result = result.replace(ph, '>');
	}
	return result;
}
