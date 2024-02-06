'use client';

import { useForm, conform } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import { useFormState } from 'react-dom';

import { Button } from '@/components/core/button';
import { Field } from '@/components/core/form/field';
import { TextareaField } from '@/components/core/form/textarea';

import { createArticle } from '@/lib/actions/articles';
import { articleSchema } from '@/lib/validations/articles';

export default function NewArticle({ params }: { params: { topicId: string } }) {
	const [state, formAction] = useFormState(createArticle, null);

	const [form, fields] = useForm({
		id: 'article-form',
		lastSubmission: state?.submission,
		constraint: getFieldsetConstraint(articleSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: articleSchema });
		},
		shouldValidate: 'onSubmit',
		shouldRevalidate: 'onInput',
	});

	return (
		<div className="h-full flex flex-col">
			<header className="p-lg flex items-center justify-between px-md py-lg border-b border-b-gray-100">
				<h3 className="text-h3">New Article</h3>
			</header>
			<section className="p-lg h-full">
				<form {...form.props} action={formAction} className="flex flex-col flex-basis-[20rem] grow-0">
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
					<Button className="self-end">Create</Button>
				</form>
			</section>
		</div>
	);
}
