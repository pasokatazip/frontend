"use client";

import { useEffect, useState } from "react";
import { ReportView } from "./ReportView";
import type { Souvenir } from "@/types/souvenir";
import { getReportAction } from "../actions/GetReportAction";
import { Report } from "../schemas/ReportSchema";
import { usePetSession } from "@/hooks/usePetSession";

export function ReportContainer() {
  const [date, setDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openRewardModal, setOpenRewardModal] = useState(false);

  const [todaySouvenirs, setTodaySouvenirs] = useState<Souvenir[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const today = new Date();

  const petSnapshot = usePetSession();

  useEffect(() => {
    let ignore = false;

    setTodaySouvenirs([]);
    setOpenRewardModal(false);

    async function fetchReports() {
      try {
        const targetDate = date.toISOString().split("T")[0];
        const data = await getReportAction(targetDate);

        if (!ignore) {
          setReports(data.reports);
          setTodaySouvenirs(
            data.reports.flatMap((report) =>
              report.souvenirs.map((souvenir) => ({
                id: souvenir.id,
                name: souvenir.displayName,
                image: souvenir.imageURL || "/images/souvenir/secret.png",
              })),
            ),
          );
        }
      } catch (error) {
        if (!ignore) {
          console.error("レポート取得失敗", error);
        }
      }
    }

    fetchReports();

    return () => {
      ignore = true;
    };
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
    if (todaySouvenirs.length === 0) return;

    setOpenRewardModal(true);
  };

  const selectDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const title = `${isToday ? "今日" : selectDate}の${petSnapshot.petName}YO-YO`;

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
        openSouvenirBubble: handlePraise,

        openRewardModal,
        closeRewardModal: () => setOpenRewardModal(false),
      }}
      pet={petSnapshot}
    />
  );
}
