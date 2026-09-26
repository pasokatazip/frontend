import { getSubscriptionStatusAction } from "@/actions/getSubscriptionStatusAction";
import { ReportController } from "./ReportController";

function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export async function ReportContainer() {
  const subscriptionResult = await getSubscriptionStatusAction();

  const isSubscriptionActive =
    subscriptionResult.success && subscriptionResult.status.active;

  return (
    <ReportController
      isSubscriptionActive={isSubscriptionActive}
      initialDate={getYesterday()}
    />
  );
}
