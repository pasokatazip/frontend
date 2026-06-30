"use client";

import { useState } from "react";
import { ReportView } from "./ReportView";

export function ReportContainer() {
  const [date, setDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);

  const prevDay = () => {
    setDate((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() - 1);
      return next;
    });
  };

  const nextDay = () => {
    setDate((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + 1);
      return next;
    });
  };

  const handleSelectDate = (date: Date) => {
    setDate(date);
    setOpenCalendar(false);
  };

  const selectDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

  // APIから取得したら{ペット名}差し替える
  const title = `${selectDate}のペット名YO-YO`;

  return (
    <ReportView
      reportInfo={{
        date,
        selectDate,
        title,
        openCalendar,
        prevDay,
        nextDay,
        openCalendarPicker: () => setOpenCalendar(true),
        closeCalendarPicker: () => setOpenCalendar(false),
        onSelectDate: handleSelectDate,
      }}
    />
  );
}
