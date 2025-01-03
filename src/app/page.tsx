import { Title } from "@/components";

export default async function Home() {
	return (
		<section className="flex flex-col items-center justify-center min-h-screen">
			<Title
				title="Movies Matcher"
				subtitle="Find your next favorite movie"
				visibleDescription
			/>
		</section>
	);
}
