import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

type FeatureSectionProps = {
  title: string;
  image: StaticImageData;
  imageAlt: string;
  imageLeft?: boolean;
  children: ReactNode;
};

export default function FeatureSection({
  title,
  image,
  imageAlt,
  imageLeft = true,
  children,
}: FeatureSectionProps) {
  const picture = <img src={image.src} alt={imageAlt} width={300} />;

  return (
    <section aria-label={title}>
      {imageLeft && picture}
      <article>
        <h2>{title}</h2>
        {children}
      </article>
      {!imageLeft && picture}
    </section>
  );
}
