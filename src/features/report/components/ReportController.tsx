"use client";

import { useEffect, useState } from "react";
import { ReportView } from "./ReportView";
import type { Souvenir } from "@/types/souvenir";
import { getReportAction } from "../actions/GetReportAction";
import { Report } from "../schemas/ReportSchema";
import { usePetSession } from "@/hooks/usePetSession";
import { getSubscriptionReportAction } from "../actions/GetSubscriptionReportAction";

interface ReportControllerProps {
  isSubscriptionActive: boolean;
}

function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}

function formatDateForApi(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function ReportController({
  isSubscriptionActive,
}: ReportControllerProps) {
  const [date, setDate] = useState(getYesterday);
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
        const targetDate = formatDateForApi(date);

        const data = isSubscriptionActive
          ? await getSubscriptionReportAction(targetDate)
          : await getReportAction(targetDate);

        if (ignore) return;

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
      } catch {
        if (ignore) return;

        setReports([]);
        setTodaySouvenirs([]);
      }
    }

    fetchReports();

    return () => {
      ignore = true;
    };
  }, [date, isSubscriptionActive]);

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

  const yesterday = getYesterday();

  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  const dateLabel = isToday ? "今日" : isYesterday ? "昨日" : selectDate;

  const title = `${dateLabel}の${petSnapshot.petName}YO-YO`;

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
