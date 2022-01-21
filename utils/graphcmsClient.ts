import { GraphQLClient } from 'graphql-request';

export default () => {
	let client: GraphQLClient;
	if (process.env.DEVELOPMENT) {
		if (process.env.NEXT_PUBLIC_GRAPHCMS_URL && process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN) {
			const headers = {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
			};
			client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL, {
				headers,
			});
		} else {
			throw new Error('Graphcms url missing');
		}
	} else {
		if (process.env.NEXT_GRAPHCMS_URL && process.env.NEXT_GRAPHCMS_TOKEN) {
			const headers = {
				Authorization: `Bearer ${process.env.NEXT_GRAPHCMS_TOKEN}`,
			};
			client = new GraphQLClient(process.env.NEXT_GRAPHCMS_URL, {
				headers,
			});
		} else {
			throw new Error('Graphcms url missing');
		}
	}

	return client;
};
