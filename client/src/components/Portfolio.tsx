import React from "react";
import SectionHeader from "./SectionHeader";
import CardOne from "./cards/CardOne";

const Portfolio = (): React.JSX.Element => {
  const PORTFOLIO = [
    {
      id: 1,
      image: "/home/portfolio-one.png",
      title: "Weddings & Engagements",
      description:
        "Elegant, timeless, and full of emotion — we document your big day so you can relive it for a lifetime.",
    },
    {
      id: 2,
      image: "/home/portfolio-two.png",
      title: "Portrait Photography",
      description:
        "From professional headshots to personal lifestyle portraits, we capture the essence of who you are.",
    },
    {
      id: 3,
      image: "/home/portfolio-three.png",
      title: "Event Photography",
      description:
        "Birthdays, concerts, corporate events — we make sure no highlight goes unseen",
    },
    {
      id: 4,
      image: "/home/portfolio-four.png",
      title: "Product Shoots",
      description:
        "Showcasing your products in the best light to attract and engage your audience.",
    },
  ];
  return (
    <section>
      <SectionHeader
        variation='dark'
        badgeWidth='w-[180px]'
        badgeText='Our portfolio'
        headerText='Every Moment, Perfectly Captured'
        paragraphText='Your moments deserve more than a memory — they deserve to be unforgettable.'
      />
      <div className='mt-14 grid grid-cols-1 gap-10 md:grid-cols-2'>
        {PORTFOLIO.map((item, key) => (
          <CardOne
            key={key}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
