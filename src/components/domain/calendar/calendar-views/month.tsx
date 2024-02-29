"use client";

import Image from "next/image";

import ViewMenu from "../views-menu";
import CalendarMobileMenu from "../calendar-mobile-menu";

const days = [
  { date: "2021-12-27", events: [] },
  { date: "2021-12-28", events: [] },
  { date: "2021-12-29", events: [] },
  { date: "2021-12-30", events: [] },
  { date: "2021-12-31", events: [] },
  { date: "2022-01-01", isCurrentMonth: true, events: [] },
  { date: "2022-01-02", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-03",
    isCurrentMonth: true,
    events: [
      {
        id: 1,
        name: "Design review",
        time: "10AM",
        datetime: "2022-01-03T10:00",
        href: "#",
      },
      {
        id: 2,
        name: "Sales meeting",
        time: "2PM",
        datetime: "2022-01-03T14:00",
        href: "#",
      },
      {
        id: 1,
        name: "Design review",
        time: "10AM",
        datetime: "2022-01-03T10:00",
        href: "#",
      },
      {
        id: 2,
        name: "Sales meeting",
        time: "2PM",
        datetime: "2022-01-03T14:00",
        href: "#",
      },
      {
        id: 1,
        name: "Design review",
        time: "10AM",
        datetime: "2022-01-03T10:00",
        href: "#",
      },
      {
        id: 2,
        name: "Sales meeting",
        time: "2PM",
        datetime: "2022-01-03T14:00",
        href: "#",
      },
      {
        id: 1,
        name: "Design review",
        time: "10AM",
        datetime: "2022-01-03T10:00",
        href: "#",
      },
      {
        id: 2,
        name: "Sales meeting",
        time: "2PM",
        datetime: "2022-01-03T14:00",
        href: "#",
      },
      {
        id: 1,
        name: "Design review",
        time: "10AM",
        datetime: "2022-01-03T10:00",
        href: "#",
      },
      {
        id: 2,
        name: "Sales meeting",
        time: "2PM",
        datetime: "2022-01-03T14:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-04", isCurrentMonth: true, events: [] },
  { date: "2022-01-05", isCurrentMonth: true, events: [] },
  { date: "2022-01-06", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-07",
    isCurrentMonth: true,
    events: [
      {
        id: 3,
        name: "Date night",
        time: "6PM",
        datetime: "2022-01-08T18:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-08", isCurrentMonth: true, events: [] },
  { date: "2022-01-09", isCurrentMonth: true, events: [] },
  { date: "2022-01-10", isCurrentMonth: true, events: [] },
  { date: "2022-01-11", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-12",
    isCurrentMonth: true,
    isToday: true,
    events: [
      {
        id: 6,
        name: "Sam's birthday party",
        time: "2PM",
        datetime: "2022-01-25T14:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-13", isCurrentMonth: true, events: [] },
  { date: "2022-01-14", isCurrentMonth: true, events: [] },
  { date: "2022-01-15", isCurrentMonth: true, events: [] },
  { date: "2022-01-16", isCurrentMonth: true, events: [] },
  { date: "2022-01-17", isCurrentMonth: true, events: [] },
  { date: "2022-01-18", isCurrentMonth: true, events: [] },
  { date: "2022-01-19", isCurrentMonth: true, events: [] },
  { date: "2022-01-20", isCurrentMonth: true, events: [] },
  { date: "2022-01-21", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-22",
    isCurrentMonth: true,
    isSelected: true,
    events: [
      {
        id: 4,
        name: "Maple syrup museum",
        time: "3PM",
        datetime: "2022-01-22T15:00",
        href: "#",
      },
      {
        id: 5,
        name: "Hockey game",
        time: "7PM",
        datetime: "2022-01-22T19:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-23", isCurrentMonth: true, events: [] },
  { date: "2022-01-24", isCurrentMonth: true, events: [] },
  { date: "2022-01-25", isCurrentMonth: true, events: [] },
  { date: "2022-01-26", isCurrentMonth: true, events: [] },
  { date: "2022-01-27", isCurrentMonth: true, events: [] },
  { date: "2022-01-28", isCurrentMonth: true, events: [] },
  { date: "2022-01-29", isCurrentMonth: true, events: [] },
  { date: "2022-01-30", isCurrentMonth: true, events: [] },
  { date: "2022-01-31", isCurrentMonth: true, events: [] },
  { date: "2022-02-01", events: [] },
  { date: "2022-02-02", events: [] },
  {
    date: "2022-02-03",
    events: [
      {
        id: 7,
        name: "Cinema with friends",
        time: "9PM",
        datetime: "2022-02-04T21:00",
        href: "#",
      },
    ],
  },
  { date: "2022-02-04", events: [] },
  { date: "2022-02-05", events: [] },
  { date: "2022-02-06", events: [] },
];

const selectedDay = days.find((day) => day.isSelected);

type Class = string | boolean | undefined;

function classNames(...classes: Class[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MonthView() {
  return (
    <div className="text-lg lg:flex lg:h-full lg:flex-col">
      <header className="relative z-20 flex items-center justify-between border-b border-neutral-200 px-6 py-4 lg:flex-none">
        <h4 className="text-lg font-semibold text-neutral-900">
          <time dateTime="2022-01">January 2022</time>
        </h4>
        <div className="flex items-center">
          <div className="flex items-center rounded-md border border-neutral-900 p-2 font-medium text-neutral-900 shadow-sm">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md text-neutral-400 hover:text-neutral-800 focus:relative md:w-9 md:px-2 md:hover:bg-neutral-50"
            >
              <span className="sr-only">Previous month</span>

              <Image
                src={`/images/icons/Chevron-Left-Icon.svg`}
                alt={"Previous Month"}
                className="mr-2 h-5 w-5 text-neutral-400"
                height={20}
                width={20}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="hidden px-3.5 font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-neutral-300 md:hidden" />
            <button
              type="button"
              className="bg-white flex items-center justify-center rounded-r-md text-neutral-400 hover:text-neutral-800 focus:relative md:w-9 md:px-2 md:hover:bg-neutral-50"
            >
              <span className="sr-only">Next month</span>

              <Image
                src={`/images/icons/Chevron-Right-Icon.svg`}
                alt={"Next Month"}
                className="ml-2 h-5 w-5 text-neutral-400"
                height={20}
                width={20}
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <ViewMenu />
            <div className="ml-6 h-6 w-px bg-neutral-900" />
            <button
              type="button"
              className="border-transparent ml-6 rounded-md border px-4 py-2 font-medium text-neutral-700 shadow-sm hover:text-neutral-900 focus:outline-none"
            >
              Add event
            </button>
          </div>

          <CalendarMobileMenu />
        </div>
      </header>

      <div className="shadow border border-neutral-300 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-neutral-300 bg-neutral-50 text-center font-semibold leading-6 text-neutral-700 lg:flex-none">
          <div className=" py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className=" py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className=" py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className=" py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className=" py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className=" py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className=" py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>

        <div className="flex bg-neutral-50 leading-6 text-neutral-900 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6">
            {days.map((day) => (
              <div
                key={day.date}
                className={classNames(
                  day.isCurrentMonth ? "" : "bg-neutral-100",
                  "relative border-collapse border border-neutral-100 px-3 py-2",
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day.isToday
                      ? "bg-indigo-600 flex h-6 w-6 items-center justify-center rounded-full font-semibold"
                      : undefined
                  }
                >
                  {day?.date?.split("-")?.pop()?.replace(/^0/, "")}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.id}>
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium text-neutral-900">
                            {event.name}
                          </p>
                          <time
                            dateTime={event.datetime}
                            className="ml-3 hidden flex-none text-neutral-800 xl:block"
                          >
                            {event.time}
                          </time>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && (
                      <li className="text-neutral-500">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>

          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? "" : "bg-neutral-50",
                  (day.isSelected ?? day.isToday) && "font-semibold",
                  day.isSelected && "",
                  !day.isSelected && day.isToday && "",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-neutral-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-neutral-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-neutral-100 focus:z-10",
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-neutral-900",
                    "ml-auto",
                  )}
                >
                  {day?.date?.split("-")?.pop()?.replace(/^0/, "")}
                </time>
                <p className="sr-only">{day.events.length} events</p>
                {day.events.length > 0 && (
                  <div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <div
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-neutral-400"
                      />
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedDay?.events?.length && selectedDay.events.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="shadow  divide-y divide-neutral-100 overflow-hidden rounded-lg">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-neutral-50 hover:bg-neutral-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-neutral-900">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-neutral-700"
                  >
                    <Image
                      src={`/images/icons/Clock-Icon.svg`}
                      alt={"Event Time?"}
                      className="ml-2 h-5 w-5 text-neutral-400"
                      height={20}
                      width={20}
                      aria-hidden="true"
                    />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6  flex-none self-center rounded-md border border-neutral-300 px-3 py-2 font-semibold text-neutral-700 opacity-0 shadow-sm hover:bg-neutral-50 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
