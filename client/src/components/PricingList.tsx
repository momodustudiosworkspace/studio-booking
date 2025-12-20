import nairaSymbol from "@/utils/symbols";
import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    name: "Individual",
    id: "tier-hobby",
    href: "/auth",
    priceMonthly: `${nairaSymbol()}250,000`,
    description:
      "The perfect plan if you're just getting started with our product.",
    features: [
      "3 studio session",
      "Up to 12 studio hours",
      "Advanced AI retouching model",
      "24-hour support response time",
    ],
    featured: false,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "auth/",
    priceMonthly: `${nairaSymbol()}420,000`,
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "Dedicated support representative",
      "Marketing automations",
      "Custom integrations",
    ],
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingList() {
  return (
    <div className='relative isolate bg-black px-6 py-16 sm:py-32 lg:px-8'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl'
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className='mx-auto aspect-[1155/678] w-[288.75rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20'
        />
      </div>
      <div className='mx-auto max-w-4xl text-center'>
        <h2 className='text-base/7 font-semibold text-white'>
          Studio packages
        </h2>
        <p className='mt-2 sm:font-sem text-3xl font-semibold tracking-tight text-balance text-white sm:text-6xl'>
          Choose the right plan for your studio session
        </p>
      </div>
      <p className='mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-400 sm:text-xl/8'>
        Choose an affordable plan that’s packed with the best features for
        engaging your audience, creating customer loyalty, and driving sales.
      </p>
      <div className='mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2'>
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-black"
                : "bg-white/[0.025] sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                  : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
              "rounded-3xl p-8 ring-1 ring-white/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-white" : "text-white",
                "text-base/7 font-semibold"
              )}
            >
              {tier.name}
            </h3>
            <p className='mt-4 flex items-baseline gap-x-2'>
              <span
                className={classNames(
                  tier.featured ? "text-white" : "text-white",
                  "sm:text-5xl text-3xl font-semibold tracking-tight"
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-400",
                  "text-base"
                )}
              >
                /month
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-300",
                "mt-6 text-base/7"
              )}
            >
              {tier.description}
            </p>
            <ul
              role='list'
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-300",
                "mt-8 space-y-3 text-sm/6 sm:mt-10"
              )}
            >
              {tier.features.map(feature => (
                <li key={feature} className='flex gap-x-3'>
                  <CheckIcon
                    aria-hidden='true'
                    className={classNames(
                      tier.featured ? "text-white" : "text-white",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? "bg-white text-black hover:bg-white/35 focus-visible:outline-white/75"
                  : "bg-white/10 text-white inset-ring inset-ring-white/5 hover:bg-white/20 focus-visible:outline-white/75",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
