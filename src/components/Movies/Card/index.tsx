"use client";
import Image from "next/image";
import { MovieCardProps } from "./types";
import styles from "./rwd.module.scss";
import { CrossIcon, HeartIcon } from "@/components/Icons";
import { motion } from "framer-motion";

export function MovieCard({
	imageURL,
	title,
	rating,
	summary,
	onRemove,
}: MovieCardProps) {
	return (
		<div className={styles["movie-card"]}>
			<div className={styles["movie-card__image-container"]}>
				<Image
					src={imageURL}
					alt={`${title} poster`}
					className={styles["movie-card__image"]}
					sizes="(min-width: 768px) 300px, 100vw"
					fill
					priority
				/>
			</div>
			<div className={styles["movie-card__content"]}>
				<header className={styles["movie-card__header"]}>
					<h2 className={styles["movie-card__title"]}>{title}</h2>
					<div className={styles["movie-card__rating"]}>
						<span className={styles["movie-card__rating-star"]}>⭐</span>
						<span className={styles["movie-card__rating-value"]}>
							{rating.toFixed(1)}
						</span>
					</div>
				</header>
				<p className={styles["movie-card__summary"]}>{summary}</p>
				<div className={styles["movie-card__actions"]}>
					<button
						className={`${styles["movie-card__button"]} ${styles["movie-card__button--dislike"]}`}
						aria-label="Dislike movie"
					>
						<CrossIcon className={styles["movie-card__icon"]} />
					</button>
					<button
						className={`${styles["movie-card__button"]} ${styles["movie-card__button--like"]}`}
						aria-label="Like movie"
					>
						<HeartIcon className={styles["movie-card__icon"]} />
					</button>
				</div>
			</div>
		</div>
	);
}
