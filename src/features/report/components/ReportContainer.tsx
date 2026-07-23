"use client";

import { useEffect, useState } from "react";
import { ReportView } from "./ReportView";
import type { Souvenir } from "@/types/souvenir";
import { getReportAction } from "../actions/GetReportAction";
import { Report } from "../schemas/ReportSchema";

export function ReportContainer() {
  const [date, setDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openRewardModal, setOpenRewardModal] = useState(false);

  const [todaySouvenirs, setTodaySouvenirs] = useState<Souvenir[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const today = new Date();

  useEffect(() => {
    async function fetchReports() {
      try {
        const targetDate = date.toISOString().split("T")[0];

        const data = await getReportAction(targetDate);

        setReports(data.reports);
      } catch (error) {
        console.error("レポート取得失敗", error);
      }
    }

    fetchReports();
  }, [date]);

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

  const handlePraise = () => {
    if (todaySouvenirs.length > 0) return;

    const rewards = [
      {
        id: 1,
        image: "/images/souvenir/secret.png",
        name: "ああああああああ",
      },
      {
        id: 2,
        image: "/images/souvenir/secret.png",
        name: "ああああああああ",
      },
      {
        id: 3,
        image: "/images/souvenir/secret.png",
        name: "ああああああああ",
      },
    ];

    setTodaySouvenirs(rewards);
    setOpenRewardModal(true);
  };

  const selectDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const title = `${isToday ? "今日" : selectDate}のペット名YO-YO`;

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

        onSelectDate: (date) => {
          setDate(date);
          setOpenCalendar(false);
        },

        reports,

        todaySouvenirs,
        onPraise: handlePraise,

        openRewardModal,
        closeRewardModal: () => setOpenRewardModal(false),
      }}
      petImage={{
        src: "/images/home/pet1.png",
        alt: "ペット",
        height: 120,
        width: 120,
      }}
    />
  );
}
