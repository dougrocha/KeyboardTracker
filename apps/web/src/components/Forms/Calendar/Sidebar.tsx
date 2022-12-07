import { CalendarIcon } from "@heroicons/react/24/solid"
import { format, isEqual } from "date-fns"

import { SelectedDates } from "./Calendar"

const CalendarSidebar = ({ dates }: { dates: SelectedDates }) => {
  return (
    <>
      <section className="mt-12 md:mt-0 md:pl-14">
        <div className="space-y-10">
          {Object.keys(dates).map((key, i) => (
            <div key={i} className="flex items-center">
              {i <= 0 || !isEqual(dates.startDate, dates.endDate) ? (
                <>
                  <div className="flex-shrink-0">
                    <h2>{Object.values(i)}</h2>
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                      <CalendarIcon className="h-6 w-6" aria-hidden />
                    </div>
                  </div>

                  <div className="ml-4">
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900">
                      {format(Object.values(dates)[i] as Date, "EEEE, MMMM do")}
                    </h3>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CalendarSidebar
