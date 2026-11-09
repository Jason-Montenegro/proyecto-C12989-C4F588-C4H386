import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import styles from "./FeatureSection.module.css";

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
  const picture = (
    <img
      src={image.src}
      alt={imageAlt}
      width={300}
      className={`imageFx ${styles.picture}`}
    />
  );

  return (
    <section aria-label={title} className={styles.feature}>
      {imageLeft && picture}
      <article className={`card ${styles.content}`}>
        <h2 className="cardTitle">{title}</h2>
        {children}
      </article>
      {!imageLeft && picture}
    </section>
  );
}
