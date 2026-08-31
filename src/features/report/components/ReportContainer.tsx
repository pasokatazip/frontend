import { getSubscriptionStatusAction } from "@/actions/getSubscriptionStatusAction";
import { ReportController } from "./ReportController";

export async function ReportContainer() {
  const subscriptionResult = await getSubscriptionStatusAction();

  const isSubscriptionActive =
    subscriptionResult.success && subscriptionResult.status.active;

  return <ReportController isSubscriptionActive={isSubscriptionActive} />;
}
