import React, { ComponentType } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPostIds, getPostData, PostData } from '../api/posts';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Node } from 'unist';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) {
    return {
      notFound: true,
    };
  }

  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden my-4">
    <div className="px-4 py-2 bg-gray-700 text-white font-semibold">{title}</div>
    <div className="p-4">{children}</div>
  </div>
);

const ModelExample = ({ input, output }: { input: string; output: string }) => (
  <Card title="Model Example">
    <div className="mb-2">
      <strong>Input:</strong>
      <pre className="bg-gray-700 p-2 rounded mt-1">{input}</pre>
    </div>
    <div>
      <strong>Output:</strong>
      <pre className="bg-gray-700 p-2 rounded mt-1">{output}</pre>
    </div>
  </Card>
);

const MarkdownComponents: Partial<Components> = {
  h1: ({ node, ...props }: { node?: Node; [key: string]: any }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
  h2: ({ node, ...props }: { node?: Node; [key: string]: any }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-white" {...props} />,
  h3: ({ node, ...props }: { node?: Node; [key: string]: any }) => <h3 className="text-xl font-medium mt-4 mb-2 text-white" {...props} />,
  p: ({ node, ...props }: { node?: Node; [key: string]: any }) => <p className="mb-4" {...props} />,
  a: ({ node, ...props }: { node?: Node; [key: string]: any }) => <a className="text-blue-400 hover:underline" {...props} />,
  img: ({ node, ...props }: { node?: Node; [key: string]: any }) => (
    <div className="my-4">
      <Image
        src={props.src || ''}
        alt={props.alt || ''}
        width={600}
        height={400}
        layout="responsive"
        className="rounded-lg"
      />
    </div>
  ),
  code: ({ node, inline, className, children, ...props }: { node?: Node; inline?: boolean; className?: string; children?: React.ReactNode; [key: string]: any }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const processContent = (content: string) => {
  const regex = /:::model-example\s*input:\s*([\s\S]*?)\s*output:\s*([\s\S]*?)\s*:::/g;
  let lastIndex = 0;
  const parts: Array<string | JSX.Element> = [];

  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    parts.push(
      <ModelExample
        key={match.index}
        input={match[1].trim()}
        output={match[2].trim()}
      />
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts;
};

export default function Post({ postData }: { postData: PostData }) {
  const processedContent = processContent(postData.content);

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-300">
      <Head>
        <title>{`${postData.title} | RAAO`}</title>
      </Head>
      
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <div className="mb-8">
            <Image
              src="/transparent.png"
              alt="RAAO Logo"
              width={200}
              height={200}
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            />
          </div>

          <article className="w-full">
            <h1 className="text-4xl font-bold mb-4 text-center text-white">{postData.title}</h1>
            <div className="text-gray-400 mb-2 text-center">
              <time dateTime={postData.date}>{new Date(postData.date).toLocaleDateString()}</time>
            </div>
            {postData.author && (
              <div className="text-gray-400 mb-8 text-center">
                By {postData.author}
              </div>
            )}
            {processedContent.map((part, index) => 
              typeof part === 'string' ? (
                <ReactMarkdown 
                  key={index}
                  components={MarkdownComponents}
                  rehypePlugins={[rehypeRaw]}
                  className="text-gray-300"
                >
                  {part}
                </ReactMarkdown>
              ) : (
                part
              )
            )}
          </article>

          <div className="mt-12">
            <Link href="/" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-700 hover:bg-gray-800">
              <span className="text-xl font-semibold">
                ← Back to home
              </span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-gray-500 py-4 text-sm backdrop-blur-md mt-auto">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Rochester Asian American Organization LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
