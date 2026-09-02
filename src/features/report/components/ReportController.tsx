"use client";

import { useEffect, useState } from "react";
import { ReportView } from "./ReportView";
import type { Souvenir } from "@/types/souvenir";
import { getReportAction } from "../actions/GetReportAction";
import { getSubscriptionReportAction } from "../actions/GetSubscriptionReportAction";
import { Report } from "../schemas/ReportSchema";
import { usePetSession } from "@/hooks/usePetSession";
import { markSouvenirPraisedAction } from "../actions/MarkSouvenirPraisedAction";

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

  const [hasPraised, setHasPraised] = useState(false);
  const [isPraising, setIsPraising] = useState(false);
  const [praiseError, setPraiseError] = useState<string>();

  const today = new Date();
  const petSnapshot = usePetSession();

  useEffect(() => {
    let ignore = false;

    setTodaySouvenirs([]);
    setReports([]);
    setHasPraised(false);
    setIsPraising(false);
    setPraiseError(undefined);
    setOpenRewardModal(false);

    async function fetchReports() {
      try {
        const targetDate = formatDateForApi(date);

        const data = isSubscriptionActive
          ? await getSubscriptionReportAction(targetDate)
          : await getReportAction(targetDate);

        if (ignore) return;

        setReports(data.reports);
        setHasPraised(data.hasPraised);

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

  const handlePraise = async () => {
    if (todaySouvenirs.length === 0 || hasPraised || isPraising) {
      return;
    }

    const targetDate = formatDateForApi(date);

    setIsPraising(true);
    setPraiseError(undefined);

    try {
      const result = await markSouvenirPraisedAction(targetDate);

      if (!result.success) {
        setPraiseError(result.error);
        return;
      }

      setHasPraised(true);
      setOpenRewardModal(true);
    } catch {
      setPraiseError(
        "ほめた記録を保存できませんでした。少し待ってからもう一度お試しください",
      );
    } finally {
      setIsPraising(false);
    }
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

        hasPraised,
        isPraising,
        praiseError,

        praiseSouvenirs: () => {
          void handlePraise();
        },

        openSouvenirBubble: () => {
          setOpenRewardModal(true);
        },

        openRewardModal,

        closeRewardModal: () => {
          setOpenRewardModal(false);
        },
      }}
      pet={petSnapshot}
    />
  );
}
