import WeekData from "@/components/layouts/WeekData";
import FormTabs from "@/components/layouts/FormTabs";
import ExamScheduleForm from "@/components/forms/ExamScheduleForm";
import LinkedAlert from "@/components/layouts/LinkedAlert";
import AssignmentCard from "@/components/layouts/AssignmentCard";
import DailyInformation from "@/components/layouts/DailyInformation";
import WeeklyInformation from "@/components/layouts/WeeklyInformation";
import AdminCards from "@/components/layouts/AdminCards";

const page = async () => {
	return (
		<div>
			<LinkedAlert />
			<DailyInformation />
			<WeeklyInformation />
			<AssignmentCard />
			<FormTabs />
			<AdminCards />
		</div>
	);
};

export default page;
