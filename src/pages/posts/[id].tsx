import React, { ComponentType, useEffect, useState, ReactNode } from 'react';
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

interface Exchange {
  type: 'input' | 'output' | 'date';
  content: string;
}

interface Footnote {
  id: number;
  text: string;
}

const ModelExample = ({ exchanges }: { exchanges: Exchange[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="imessage">
      {exchanges.map((exchange, index) => {
        if (exchange.type === 'date') {
          return (
            <div key={index} className="date-container">
              <span className="date-heading">{exchange.content}</span>
            </div>
          );
        }
        return (
          <p key={index} className={exchange.type === 'input' ? 'from-them' : 'from-me'}>
            <span dangerouslySetInnerHTML={{ __html: exchange.content }} />
          </p>
        );
      })}
    </div>
  );
};

const processContent = (content: string) => {
  const modelExampleRegex = /:::model-example\s*([\s\S]*?):::/g;
  const footnoteRegex = /\?\[\*([\s\S]*?)\*\]/g;
  const footnotesSectionRegex = /:::footnotes-section:::/g;
  let lastIndex = 0;
  const parts: Array<string | JSX.Element> = [];
  const footnotes: Footnote[] = [];
  const textMap = new Map<string, number>();

  const processFootnotes = (text: string) => {
    return text.replace(footnoteRegex, (match, footnoteText) => {
      let footnoteId: number;
      if (textMap.has(footnoteText)) {
        footnoteId = textMap.get(footnoteText)!;
      } else {
        footnoteId = footnotes.length + 1;
        footnotes.push({ id: footnoteId, text: footnoteText });
        textMap.set(footnoteText, footnoteId);
      }
      return `<sup><a href="#footnote-${footnoteId}" class="footnote-link"><strong>[${footnoteId}]</strong></a></sup>`;
    });
  };

  const renderFootnotes = () => (
    <div key="footnotes" className="footnotes-container">
      {footnotes.map((footnote, index) => (
        <React.Fragment key={footnote.id}>
          <span id={`footnote-${footnote.id}`} className="footnote-item">
            <sup><strong>[{footnote.id}]</strong></sup>
            <span className="footnote-content">
              <ReactMarkdown components={MarkdownComponents}>
                {footnote.text}
              </ReactMarkdown>
            </span>
          </span>
          {index < footnotes.length - 1 && <span className="footnote-separator">&nbsp;&nbsp;&nbsp;&nbsp;</span>}
        </React.Fragment>
      ))}
    </div>
  );

  const processExchanges = (text: string) => {
    return text
      .split(/\n(?=input:|output:|date:)/)
      .filter(Boolean)
      .map(item => {
        const [type, ...contentParts] = item.split(':');
        return {
          type: type.trim() as 'input' | 'output' | 'date',
          content: processFootnotes(contentParts.join(':').trim())
        };
      });
  };

  let match;
  while ((match = modelExampleRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(processFootnotes(content.slice(lastIndex, match.index)));
    }

    const exchanges: Exchange[] = processExchanges(match[1]);

    parts.push(
      <ModelExample
        key={match.index}
        exchanges={exchanges}
      />
    );
    lastIndex = modelExampleRegex.lastIndex;
  }

  // Process remaining content
  if (lastIndex < content.length) {
    const remainingContent = content.slice(lastIndex);
    const footnoteSectionMatch = footnotesSectionRegex.exec(remainingContent);
    
    if (footnoteSectionMatch) {
      // Add content before footnotes section
      parts.push(processFootnotes(remainingContent.slice(0, footnoteSectionMatch.index)));
      
      // Add footnotes section
      parts.push(renderFootnotes());
      
      // Add any content after footnotes section
      parts.push(processFootnotes(remainingContent.slice(footnoteSectionMatch.index + footnoteSectionMatch[0].length)));
    } else {
      // No footnotes section specified, add all remaining content
      parts.push(processFootnotes(remainingContent));
      
      // Add footnotes at the end if not placed manually
      if (footnotes.length > 0) {
        parts.push(renderFootnotes());
      }
    }
  }

  return parts;
};

const MarkdownComponents: Partial<Components> = {
  h1: ({ node, ...props }: { node?: Node; [key: string]: any }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
  h2: ({ node, ...props }: { node?: Node; [key: string]: any }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-white" {...props} />,
  h3: ({ node, ...props }: { node?: Node; [key: string]: any }) => <h3 className="text-xl font-medium mt-4 mb-2 text-white" {...props} />,
  p: ({ node, children, ...props }: { node?: Node; children?: ReactNode; [key: string]: any }) => <p className="mb-4" {...props}>{children}</p>,
  strong: ({ node, children, ...props }: { node?: Node; children?: ReactNode; [key: string]: any }) => <strong {...props}>{children}</strong>,
  em: ({ node, children, ...props }: { node?: Node; children?: ReactNode; [key: string]: any }) => <em {...props}>{children}</em>,
  a: ({ node, children, ...props }: { node?: Node; children?: ReactNode; [key: string]: any }) => <a className="text-blue-400 hover:underline" {...props}>{children}</a>,
  img: ({ node, ...props }: { node?: Node; [key: string]: any }) => {
    return (
      <Image
        src={props.src || ''}
        alt={props.alt || ''}
        width={parseInt(props.width || '1000', 10)}
        height={parseInt(props.height || '400', 10)}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        className="rounded-lg"
      />
    );
  },
  code: ({ node, inline, className, children, ...props }: { node?: Node; inline?: boolean; className?: string; children?: ReactNode; [key: string]: any }) => {
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

export default function Post({ postData }: { postData: PostData }) {
  const [isClient, setIsClient] = useState(false);
  const processedContent = processContent(postData.content);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-300">
      <Head>
        <title>{`${postData.title} | RAAO`}</title>
        <style>{`
          @font-face {
            font-family: "SFPro";
            src:
              url("https://raw.githubusercontent.com/BuildOnViction/tomomaster/master/app/assets/fonts/SFPro/sf-pro-text-bold.woff") format("woff");
          }
          .imessage {
            background-color: #fff;
            border: 1px solid #e5e5ea;
            border-radius: 0.25rem;
            display: flex;
            flex-direction: column;
            font-family: "SanFrancisco", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            font-size: 1.25rem;
            margin: 0 auto 1rem;
            max-width: 600px;
            padding: 0.5rem 1.5rem;
          }
          .imessage p {
            border-radius: 1.15rem;
            line-height: 1.25;
            max-width: 75%;
            padding: 0.5rem .875rem;
            position: relative;
            word-wrap: break-word;
          }
          .imessage p::before,
          .imessage p::after {
            bottom: -0.1rem;
            content: "";
            height: 1rem;
            position: absolute;
          }
          p.from-me {
            align-self: flex-end;
            background-color: #248bf5;
            color: #fff; 
          }
          p.from-me::before {
            border-bottom-left-radius: 0.8rem 0.7rem;
            border-right: 1rem solid #248bf5;
            right: -0.35rem;
            transform: translate(0, -0.1rem);
          }
          p.from-me::after {
            background-color: #fff;
            border-bottom-left-radius: 0.5rem;
            right: -40px;
            transform:translate(-30px, -2px);
            width: 10px;
          }
          p[class^="from-"] {
            margin: 0.5rem 0;
            width: fit-content;
          }
          p.from-me ~ p.from-me {
            margin: 0.25rem 0 0;
          }
          p.from-me ~ p.from-me:not(:last-child) {
            margin: 0.25rem 0 0;
          }
          p.from-me ~ p.from-me:last-child {
            margin-bottom: 0.5rem;
          }
          p.from-them {
            align-items: flex-start;
            background-color: #e5e5ea;
            color: #000;
          }
          p.from-them:before {
            border-bottom-right-radius: 0.8rem 0.7rem;
            border-left: 1rem solid #e5e5ea;
            left: -0.35rem;
            transform: translate(0, -0.1rem);
          }
          p.from-them::after {
            background-color: #fff;
            border-bottom-right-radius: 0.5rem;
            left: 20px;
            transform: translate(-30px, -2px);
            width: 10px;
          }
          p[class^="from-"].emoji {
            background: none;
            font-size: 2.5rem;
          }
          p[class^="from-"].emoji::before {
            content: none;
          }
          .no-tail::before {
            display: none;
          }
          .margin-b_none {
            margin-bottom: 0 !important;
          }
          .margin-b_one {
            margin-bottom: 1rem !important;
          }
          .margin-t_one {
            margin-top: 1rem !important;
          }
          .footnotes-container {
            color: white;
            display: flex;
            flex-wrap: wrap;
          }
          .footnote-item {
            display: inline-flex;
            align-items: baseline;
          }
          .footnote-content {
            display: inline;
          }
          .footnote-content p {
            display: inline;
            margin: 0;
          }
          .footnote-separator {
            white-space: pre;
          }
          .footnote-link {
            text-decoration: none;
            color: inherit;
          }
          .footnote-link:hover {
            text-decoration: underline;
          }
          .date-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 0.5rem 0;
          }
          .date-heading {
            color: #8e8e93;
            font-size: 0.9rem;
            background-color: rgba(229, 229, 234, 0.5);
            padding: 0.25rem 0.5rem;
            border-radius: 0.8rem;
          }
          @media screen and (max-width: 800px) {
            .imessage {
              font-size: 1.05rem;
              margin: 0 auto 1rem;
              max-width: 600px;
              padding: 0.25rem 0.875rem;
            }
            .imessage p {
              margin: 0.5rem 0;
            }
          }
        `}</style>
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
            {isClient ? (
              processedContent.map((part, index) => 
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
              )
            ) : (
              <div>Loading...</div>
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
