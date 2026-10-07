import Image, { type StaticImageData } from "next/image";
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
  const picture = <Image src={image} alt={imageAlt} width={300} />;

  return (
    <div>
      {imageLeft && picture}
      <article>
        <h2>{title}</h2>
        {children}
      </article>
      {!imageLeft && picture}
    </div>
  );
}
