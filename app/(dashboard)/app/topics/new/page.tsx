'use client';

import { useEffect, useState } from 'react';

import { useForm, conform } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import { type Topic } from '@prisma/client';
import { useFormState } from 'react-dom';

import { Button } from '@/components/core/button';
import { Field } from '@/components/core/form/field';
import { Select } from '@/components/core/form/select';

import { createTopic } from '@/lib/actions/topics';
import { topicSchema } from '@/lib/validations/topics';

export default function NewTopic() {
	const [topics, setTopics] = useState<Array<{ value: string; label: string }>>([]);
	const [state, formAction] = useFormState(createTopic, null);

	const [form, fields] = useForm({
		id: 'topic-form',
		lastSubmission: state?.submission,
		constraint: getFieldsetConstraint(topicSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: topicSchema });
		},
		shouldValidate: 'onSubmit',
		shouldRevalidate: 'onInput',
	});

	useEffect(() => {
		const getTopics = async () => {
			const response = await fetch('/api/topics');
			const { topics } = await response.json();
			const mappedTopics = (topics as Topic[]).map(topic => ({ value: topic.id, label: topic.title }));
			setTopics(mappedTopics);
		};

		getTopics();
	}, []);

	return (
		<div className="h-full flex flex-col">
			<header className="p-lg flex items-center justify-between px-md py-lg border-b border-b-gray-100">
				<h3 className="text-h3">New topic</h3>
			</header>
			<section className="p-lg h-full">
				<form {...form.props} action={formAction} className="flex-basis-[20rem] grow-0 flex flex-col">
					<Select
						labelProps={{ children: 'Parent topic' }}
						placeholder="Select a topic as a parent"
						items={topics}
						disabled={!topics.length}
						name="parentId"
						className="mb-xl"
						errors={fields.parentId.errors}
					/>
					<Field
						labelProps={{ children: 'Topic title' }}
						inputProps={{
							placeholder: 'Enter your topic title',
							...conform.input(fields.title),
						}}
						className="mb-xl"
						errors={fields.title.errors}
					/>
					<Button className="self-end">Create</Button>
				</form>
			</section>
		</div>
	);
}
