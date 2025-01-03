import { TitleProps } from "@/types";

export function Title({ title, subtitle, visibleDescription }: TitleProps) {
	return (
		<>
			<h1 className="text-4xl font-bold">{title}</h1>
			{visibleDescription && (
				<p className="text-lg text-gray-500">{subtitle}</p>
			)}
		</>
	);
}
