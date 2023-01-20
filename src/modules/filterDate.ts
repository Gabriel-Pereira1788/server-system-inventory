import { Filter } from "./calculateByFilter";

function createIntervalTime(
  interval: number,
  typeInterval: "month" | "week" | "day" | "year"
) {
  const currentDate = new Date();
  // console.log(currentDate.getMonth());

  if (typeInterval === "day") {
    currentDate.setDate(currentDate.getDate() - 1);
    return [
      `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`,
    ];
  }

  if (typeInterval === "week") {
    return Array.from({
      length: interval,
    }).map((_, index) => {
      const date = new Date(currentDate);
      currentDate.setDate(date.getDate() - 1);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    });
  }

  return Array.from({
    length: interval,
  }).map((_, index) => {
    const date = new Date(currentDate);
    currentDate.setMonth(date.getMonth() - 1);
    return `${date.getFullYear()}-${date.getMonth()}`;
  });
}

const METHODS_TIME: Record<
  Filter,
  {
    method: keyof Pick<Date, "getDate" | "getMonth" | "getFullYear">;
    intervalTime: string[];
  }
> = {
  day: { method: "getDate", intervalTime: createIntervalTime(1, "day") },
  "3 month": {
    method: "getMonth",
    intervalTime: createIntervalTime(3, "month"),
  },
  "6 month": {
    method: "getMonth",
    intervalTime: createIntervalTime(6, "month"),
  },
  month: { method: "getMonth", intervalTime: createIntervalTime(1, "month") },
  week: { method: "getDate", intervalTime: createIntervalTime(7, "week") },
  year: { method: "getMonth", intervalTime: createIntervalTime(12, "year") },
};

export function filterDate<T extends { createdAt: Date }>(
  data: T[],
  filter: Filter
) {
  const interval = METHODS_TIME[filter];
  console.log(interval);

  const dataFiltered = data.filter((item) => {
    const dateItem = new Date(item.createdAt);
    const normalizedDateItem =
      interval.method === "getDate"
        ? `${dateItem.getFullYear()}-${dateItem.getMonth()}-${dateItem.getDate()}`
        : `${dateItem.getFullYear()}-${dateItem.getMonth()}`;

    return interval.intervalTime.includes(normalizedDateItem);
  });

  return dataFiltered;
}
