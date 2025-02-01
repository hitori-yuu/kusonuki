import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LinkForm from "./forms/LinkForm";

const AccountSettings = () => {
	return (
		<>
			<Accordion type='single' collapsible>
				<AccordionItem value='item-1'>
					<AccordionTrigger>生徒情報連携</AccordionTrigger>
					<AccordionContent className='m-1'>
						<LinkForm />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default AccountSettings;
