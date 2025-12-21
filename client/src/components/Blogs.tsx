import { shopifyFetch } from "@/lib/shopify";
// import Image from "next/image";
import React from "react";
import Link from "next/link";

const BLOG_ARTICLES_QUERY = `
  query BlogArticles($handle: String!, $first: Int!) {
    blog(handle: $handle) {
      title
      articles(first: $first) {
        edges {
          node {
            id
            title
            handle
            excerpt
            contentHtml
            publishedAt
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

const formatDate = (date: string) => {
  const d = new Date(date);
  return {
    readable: d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    iso: d.toISOString().split("T")[0],
  };
};

const Blogs = async () => {
  const data = await shopifyFetch(BLOG_ARTICLES_QUERY, {
    handle: "news", // 👈 your Shopify blog handle
    first: 6,
  });

  console.log(data);

  const articles =
    data?.data?.blog?.articles?.edges?.map((e: any) => e.node) || [];

  if (!articles.length) {
    return <div>No blog posts yet.</div>;
  }

  return (
    <div className='bg-black py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
            From the blog
          </h2>
          <p className='mt-2 text-lg text-gray-300'>
            Learn how to grow your business with our expert advice.
          </p>
        </div>

        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-white pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {articles.map((article: any) => {
            const date = formatDate(article.publishedAt);

            return (
              <article
                key={article.id}
                className='flex max-w-xl flex-col items-start justify-between'
              >
                {/* Date + Category (static label) */}
                <div className='flex items-center gap-x-4 text-xs'>
                  <time dateTime={date.iso} className='text-gray-400'>
                    {date.readable}
                  </time>
                  <span className='relative z-10 rounded-full bg-black px-3 py-1.5 font-medium text-gray-300'>
                    Blog
                  </span>
                </div>

                {/* Content */}
                <div className='group relative grow'>
                  <h3 className='mt-3 text-lg font-semibold text-white group-hover:text-gray-300'>
                    <Link
                      href={`https://www.momodustudios.com/blogs/news/${article.handle}`}
                    >
                      <span className='absolute inset-0' />
                      {article.title}
                    </Link>
                  </h3>
                  <p className='mt-5 line-clamp-3 text-sm text-gray-400'>
                    {article.excerpt ||
                      article.contentHtml
                        ?.replace(/<[^>]+>/g, "")
                        .slice(0, 140) + "..."}
                  </p>
                </div>

                {/* Author (Shopify has no author image → safe fallback) */}
                <div className='relative mt-8 flex items-center gap-x-4'>
                  <div className='flex size-10 items-center justify-center rounded-full bg-gray-800 text-xs text-white'>
                    MS
                  </div>
                  <div className='text-sm'>
                    <p className='font-semibold text-white'>Momodu Studios</p>
                    <p className='text-gray-400'>Editorial</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
