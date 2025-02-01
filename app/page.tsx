import FormTabs from "@/components/layouts/FormTabs";
import LinkedAlert from "@/components/layouts/LinkedAlert";
import AssignmentCard from "@/components/layouts/AssignmentCard";
import WeeklyInformation from "@/components/layouts/WeeklyInformation";
import AdminCards from "@/components/layouts/AdminCards";
import DailyTimetable from "@/components/layouts/DailyTimetable";
import DailyQuiz from "@/components/layouts/DailyQuiz";

const page = async () => {
	return (
		<div className='space-y-4'>
			<LinkedAlert />
			<DailyTimetable />
			<DailyQuiz />
			<WeeklyInformation />
			<AssignmentCard />
			<FormTabs />
			<AdminCards />
		</div>
	);
};

export default page;
