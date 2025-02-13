import type { Metadata, Viewport } from "next";
import "@/styles/global.scss";
import { Header, Main, Footer } from "@/components";

export const metadata: Metadata = {
	title: "Movie Matcher",
	description:
		"Find your next favorite movie with our Tinder-like movie recommendation app",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="container">
				<Header />
				<Main>{children}</Main>
				<Footer />
			</body>
		</html>
	);
}
