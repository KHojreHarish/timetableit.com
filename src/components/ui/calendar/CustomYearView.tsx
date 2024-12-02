import { useMemo } from "react";
import { DateLocalizer, ViewProps } from "react-big-calendar";
import Calendar from "./Calendar";

export const YearView = ({ date, localizer, onSelectEvent, events }: any) => {
  const currRange = useMemo(
    () => YearView.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <>
      <div className=" h-full w-full overflow-auto border-blue-60 ">
        {currRange &&
          currRange.map((range) => (
            <div key={range} className="  w-full mb-6  ">
              <h1 className="flex items-center justify-center text-large font-bold ">
                <pre>
                  <span>{range.toString().substring(3, 7)}</span>
                  {range.toString().substring(10, 15)}
                </pre>
              </h1>
              <div className="h-[34vh]">
                <Calendar
                  events={events}
                  date={range}
                  view="month"
                  defaultView="month"
                  toolbar={false}
                  onSelectEvent={onSelectEvent}
                  className="YearView-calendar mb-4 border-2 border-[#cbc8c8] "
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

YearView.range = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  const start = localizer.startOf(date, "year");
  const end = localizer.endOf(date, "year");

  let range: any[] = [];
  let current = start;

  while (localizer.lte(current, end, "year")) {
    range.push(current);
    current = localizer.add(current, 1, "month");
  }

  return range;
};

YearView.title = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  return null;
};
