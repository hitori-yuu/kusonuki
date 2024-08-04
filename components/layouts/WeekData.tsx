import React from "react";

const WeekData = () => {
	const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
	const today = new Date();
	today.setDate(today.getDate() - today.getDay());

	const days = Array.from({ length: 7 }, (_, i) => {
		const date = new Date(today);
		date.setDate(today.getDate() + i);
		var month = String(date.getMonth() + 1).slice(-2);
		var day = String(date.getDate()).slice(-2);
		const dateString = month + "/" + day;
		const dayOfWeek = daysOfWeek[date.getDay()];

		return {
			dateString,
			dayOfWeek,
		};
	});
	return (
		<div>
			<div className="overflow-x-auto whitespace-no-wrap">
				<div className="flex space-x-4">
					{days.map(({ dateString, dayOfWeek }) => (
						<div key={dateString} className="block p-4 cursor-pointer text-center">
							<p className="text-lg font-bold">{dateString}</p>
							<p>{dayOfWeek}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default WeekData;
