import { DiaryForm } from "@/app/_components/containers/diary/form";
import { Header } from "@/app/_layouts/header";
export default function DiaryCreatePage() {
	return (
		<>
			<Header />
			<div className="container mx-auto py-6 max-w-4xl">
				<DiaryForm />
			</div>
		</>
	);
}
