const purchaseConfirmationPendingKey = "purchase-confirmation-pending";

export function clearPurchaseConfirmationPending() {
  sessionStorage.removeItem(purchaseConfirmationPendingKey);
}

export function hasPurchaseConfirmationPending() {
  return sessionStorage.getItem(purchaseConfirmationPendingKey) === "true";
}

export function markPurchaseConfirmationPending() {
  sessionStorage.setItem(purchaseConfirmationPendingKey, "true");
}
