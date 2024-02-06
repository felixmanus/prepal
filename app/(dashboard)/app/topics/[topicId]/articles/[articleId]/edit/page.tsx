'use client';

import { useEffect, useState } from 'react';

import { useForm, conform } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import { useFormState } from 'react-dom';

import { Button } from '@/components/core/button';
import { Field } from '@/components/core/form/field';
import { TextareaField } from '@/components/core/form/textarea';

import { editArticle } from '@/lib/actions/articles';
import { articleSchema } from '@/lib/validations/articles';

export default function EditArticle({ params }: { params: { topicId: string; articleId: string } }) {
	const [article, setArticle] = useState<{ title: ''; content: '' }>({ title: '', content: '' });

	const [state, formAction] = useFormState(editArticle, null);

	const [form, fields] = useForm({
		id: 'edit-article-form',
		lastSubmission: state?.submission,
		constraint: getFieldsetConstraint(articleSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: articleSchema });
		},
		defaultValue: { ...article, id: params.articleId, topicId: params.topicId },
		shouldRevalidate: 'onInput',
	});

	useEffect(() => {
		const getArticle = async () => {
			const res = await fetch(`/api/articles/${params.articleId}`);
			const article = await res.json();
			setArticle(article);
		};

		getArticle();
	}, []);

	return (
		<div className="h-full flex flex-col">
			<header className="p-lg flex items-center justify-between px-md py-lg border-b border-b-gray-100">
				<h3 className="text-h3">Edit Article</h3>
			</header>
			<section className="p-lg h-full flex flex-col">
				<form {...form.props} action={formAction} className="flex flex-col flex-basis-[20rem] grow">
					<Field
						labelProps={{ children: 'Article title' }}
						inputProps={{
							placeholder: 'Enter your article title',
							...conform.input(fields.title),
						}}
						className="mb-xl"
						errors={fields.title.errors}
					/>
					<TextareaField
						labelProps={{ children: 'Article content' }}
						textareaProps={{
							placeholder: 'Enter your article title',
							...conform.input(fields.content),
						}}
						className="mb-xl"
						errors={fields.content.errors}
					/>
					<input type="hidden" value={params.topicId} name="topicId" />
					<input type="hidden" value={params.articleId} name="id" />
					<Button className="self-end mt-auto">Update</Button>
				</form>
			</section>
		</div>
	);
}
