import { MovieCardProps } from "./types";

export function MovieCard({
	title,
	rating,
	summary,
	imageURL,
}: MovieCardProps) {
	return (
		<div>
			<h3>{title}</h3>
			<p>{rating}</p>
			<p>{summary}</p>
			<p>{imageURL}</p>
		</div>
	);
}
