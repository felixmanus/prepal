'use client';

import { Fragment, useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { Icon } from '../icon';

interface MarkdownRenderProps {
	mdString: string;
}

export default function MarkdownRender({ mdString }: MarkdownRenderProps) {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		let id: NodeJS.Timeout;

		if (isCopied) {
			id = setTimeout(() => setIsCopied(false), 3000);
		}

		return () => clearTimeout(id);
	}, [isCopied]);

	return (
		<ReactMarkdown
			className="prose prose-code:before:hidden prose-code:after:hidden"
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
				pre({ children }) {
					return <Fragment>{children}</Fragment>;
				},
				code({ children, className, node, ...rest }) {
					const match = /language-(\w+)/.exec(className || '');
					return match ? (
						<div className="bg-gray-700 rounded-md overflow-auto">
							<div className="flex items-center justify-between h-full py-sm px-md">
								<span className="text-gray-200 text-body-sm">Example code</span>
								<div
									className="flex items-center cursor-pointer"
									onClick={async () => {
										try {
											await navigator.clipboard.writeText(String(children));
											setIsCopied(true);
										} catch (err: any) {
											console.error(err.message);
										}
									}}
								>
									<Icon name={!isCopied ? 'copy' : 'check'} className="text-gray-200" />
									<span className="text-gray-200 ml-xxs">{!isCopied ? 'Copy code' : 'Copied!'}</span>
								</div>
							</div>
							<SyntaxHighlighter
								language="javascript"
								style={dracula}
								customStyle={{ borderRadius: '0px', marginTop: '0px' }}
							>
								{String(children).replace(/\n$/, '')}
							</SyntaxHighlighter>
						</div>
					) : (
						<code {...rest} className="bg-gray-100 rounded-lg p-xxs">
							{children}
						</code>
					);
				},
			}}
		>
			{mdString}
		</ReactMarkdown>
	);
}
