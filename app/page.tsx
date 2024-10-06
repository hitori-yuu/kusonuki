import WeekData from "@/components/layouts/WeekData";
import FormTabs from "@/components/layouts/FormTabs";
import ExamScheduleForm from "@/components/layouts/ExamScheduleForm";
import LinkedAlert from "@/components/layouts/LinkedAlert";
import AssignmentCard from "@/components/layouts/AssignmentCard";

const page = async () => {
	return (
		<div>
			<LinkedAlert />
			<WeekData />
			<AssignmentCard />
			<FormTabs />
		</div>
	);
};

export default page;
