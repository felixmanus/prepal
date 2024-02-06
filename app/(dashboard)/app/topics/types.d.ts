interface IArticle {
	id: string;
	title: string;
	content: string;
	topicId: string;
}

interface ITopic {
	id: string;
	title: string;
	parentId: string | null;
	articles: IArticle[];
}

interface IMappedTopic extends Omit<ITopic, 'parentId'> {
	topics: Array<Omit<ITopic, 'parentId'>>;
}
