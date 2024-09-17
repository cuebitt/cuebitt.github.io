import {
	Card,
	CardHeader,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@/router";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
	return (
		<>
			<div className="container h-full mx-auto">
				<div className="flex h-full justify-center items-center">
					<Card className="p-6">
						<CardHeader>
							<CardTitle className="text-6xl">Error 404</CardTitle>
							<CardDescription className="text-4xl">Not Found</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex justify-center items-center py-6">
								<span className="text-xl">
									🚨&nbsp;try again 4head :P&nbsp;🚨
								</span>
							</div>
						</CardContent>
						<CardFooter className="justify-center">
							<Link to="/" className={buttonVariants({})}>
								Back to Home
							</Link>
						</CardFooter>
					</Card>
				</div>
			</div>
		</>
	);
}
