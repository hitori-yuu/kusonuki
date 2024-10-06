import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import LinkForm from "./LinkForm";

const AccountSettings = () => {
	return (
		<>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Student Information Linking</AccordionTrigger>
					<AccordionContent className="m-1">
						<LinkForm />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default AccountSettings;
