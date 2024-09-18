import { StrictMode } from "react";
import "./tailwind.css";
import { clientOnly } from "vike-react/clientOnly";

const ThemeProviderClient = clientOnly(() =>
	import("../components/ui/theme-provider.tsx").then((module) => ({
		default: module.ThemeProvider,
	})),
);

export default function LayoutDefault({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<StrictMode>
			<Content>{children}</Content>
		</StrictMode>
	);
}

function Content({ children }: { children: React.ReactNode }) {
	return (
		<div id="page-container">
			<div id="page-content" className="min-h-screen">
				<ThemeProviderClient>{children}</ThemeProviderClient>
			</div>
		</div>
	);
}
