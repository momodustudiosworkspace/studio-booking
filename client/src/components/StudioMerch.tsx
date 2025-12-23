import { shopifyFetch } from "@/lib/shopify";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// const products = [
//   {
//     id: 1,
//     name: "Glow in the Dark",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Glow in the Dark",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: "$35",
//     color: "Aspen White",
//   },
//   {
//     id: 3,
//     name: "Glow in the Dark",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
//     imageAlt: "Front of men's Basic Tee in dark gray.",
//     price: "$35",
//     color: "Charcoal",
//   },
//   {
//     id: 4,
//     name: "Glow in the Dark",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
//     imageAlt:
//       "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
//     price: "$35",
//     color: "Iso Dots",
//   },
// ];
const StudioMerch = async () => {
  const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

  const VARIABLES = { first: 10 };

  const data = await shopifyFetch(PRODUCTS_QUERY, VARIABLES);

  const products = data.data.products.edges.map((e: any) => e.node);

  if (!products || products.length === 0) {
    return <div>We are restocking.</div>;
  }
  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(Number(amount));
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Curated by Momodustudios
        </h2>
        <p>Objects designed with the same discipline and intent.</p>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product: any) => {
            const image = product.images.edges[0]?.node;

            return (
              <div key={product.id} className='group relative'>
                <div className='aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:h-80'>
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      width={400}
                      height={400}
                      unoptimized
                      className='h-full w-full object-cover group-hover:opacity-75'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center text-sm text-gray-500'>
                      No image
                    </div>
                  )}
                </div>

                <div className='mt-4 flex justify-between'>
                  <div>
                    <h3 className='text-sm text-gray-700'>
                      <Link
                        href={`https://www.momodustudios.com/products/${product.handle}`}
                      >
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.title}
                      </Link>
                    </h3>
                  </div>

                  <p className='text-sm font-medium text-gray-900'>
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-10'>
          <Link
            href='https://www.momodustudios.com/pages/merch'
            className='flex items-center gap-2 text-sm font-medium text-gray-900'
          >
            See more
            <ArrowLongRightIcon aria-hidden='true' className='size-6' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudioMerch;
