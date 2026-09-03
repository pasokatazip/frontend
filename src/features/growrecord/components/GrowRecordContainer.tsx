import { getSubscriptionStatusAction } from "@/actions/getSubscriptionStatusAction";
import { GrowRecordController } from "./GrowRecordController";

export async function GrowRecordContainer() {
  const subscriptionResult = await getSubscriptionStatusAction();

  const isSubscriptionActive =
    subscriptionResult.success && subscriptionResult.status.active;

  return <GrowRecordController isSubscriptionActive={isSubscriptionActive} />;
}
