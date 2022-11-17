import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  isWithinInterval,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns"
import { getHolidays, isHoliday } from "date-fns-holiday-us"
import type { Holidays } from "date-fns-holiday-us"
import dynamic from "next/dynamic"
import { useCallback, useState } from "react"

import classNames from "../../../utils/classNames"
import ToolTip from "../../ToolTip"

const CalendarSidebar = dynamic(() => import("./Sidebar"), {
  ssr: false,
})

interface CalendarProps extends Partial<SelectedDates> {
  sidebar?: boolean
  holidays?: boolean
}

export interface SelectedDates {
  startDate: Date
  endDate: Date
}

const Calender = ({
  startDate,
  endDate,
  sidebar = false,
  holidays = false,
}: CalendarProps) => {
  const today = startOfToday()

  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: startDate ?? today,
    endDate: endDate ?? today,
  })
  const [selectedDate, setSelectedDate] = useState<"start" | "end">("start")

  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
  const firstDayOfMonth = parse(currentMonth, "MMM-yyyy", new Date())

  const currentYear = firstDayOfMonth.getFullYear()

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  })

  const changeMonth = (direction: "next" | "prev") => {
    const newMonth =
      direction === "next"
        ? add(firstDayOfMonth, { months: 1 })
        : add(firstDayOfMonth, { months: -1 })
    setCurrentMonth(format(newMonth, "MMM-yyyy"))
  }

  const handleDateSelect = (date: Date) => {
    if (isBefore(date, selectedDates.startDate) || selectedDate === "start") {
      setSelectedDates({
        startDate: date,
        endDate: date,
      })
      setSelectedDate("end")
    } else {
      setSelectedDates({
        startDate: selectedDates.startDate,
        endDate: date,
      })
      setSelectedDate("start")
    }
  }

  const isWithinSelectedDates = (date: Date) => {
    return isWithinInterval(date, {
      start: selectedDates.startDate,
      end: selectedDates.endDate,
    })
  }

  const getAllHolidays = useCallback(() => {
    return getHolidays(currentYear)
  }, [currentYear])

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold dark:text-gray-200">
                {format(firstDayOfMonth, "MMMM yyyy")}
              </h2>
              <button
                onClick={() => changeMonth("prev")}
                type="button"
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous Month</span>
                <ChevronLeftIcon className="h-6 w-6" aria-hidden />
              </button>
              <button
                onClick={() => changeMonth("next")}
                type="button"
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next Month</span>
                <ChevronRightIcon className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <WeekNames />

            <div className="mt-2 grid grid-cols-7 text-sm">
              {days.map((day, index) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    index > 6 && "border-t border-gray-200",
                    index === 0 && colStart[getDay(day)],
                    "group relative py-1.5"
                  )}
                  onClick={() => handleDateSelect(day)}
                >
                  <button
                    type="button"
                    className={classNames(
                      isWithinSelectedDates(day) && "text-white",
                      !isWithinSelectedDates(day) &&
                        isToday(day) &&
                        "text-red-500",
                      !isWithinSelectedDates(day) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayOfMonth) &&
                        "text-gray-900",
                      !isWithinSelectedDates(day) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayOfMonth) &&
                        "text-gray-400",
                      isWithinSelectedDates(day) &&
                        isToday(day) &&
                        "bg-red-500",
                      isWithinSelectedDates(day) &&
                        !isToday(day) &&
                        "bg-gray-800",
                      !isWithinSelectedDates(day) && "group-hover:bg-gray-200",
                      (isWithinSelectedDates(day) || isToday(day)) &&
                        "font-semibold",
                      `mx-auto flex h-8 w-8 items-center justify-center rounded-full`
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  {holidays && isHoliday(day) ? (
                    <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-sky-500 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0">
                      <ToolTip>
                        {Object.keys(getAllHolidays()).map(
                          (holiday: string) => (
                            <div
                              key={getAllHolidays()[
                                holiday as keyof Holidays
                              ].date.toString()}
                            >
                              {isEqual(
                                getAllHolidays()[holiday as keyof Holidays]
                                  .date,
                                day
                              ) ? (
                                <div className="whitespace-nowrap capitalize">
                                  {holiday.replace(/([A-Z])/g, " $1").trim()}
                                </div>
                              ) : null}
                            </div>
                          )
                        )}
                      </ToolTip>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {sidebar ? <CalendarSidebar dates={selectedDates} /> : null}
        </div>
      </div>
    </div>
  )
}

const WeekNames = () => {
  return (
    <div className="mt-10 grid grid-cols-7 text-center text-sm leading-6 text-gray-500">
      {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
        <div key={day} className="uppercase">
          {day}
        </div>
      ))}
    </div>
  )
}

const colStart = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]

export default Calender
