self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  const fallbackPayload = {
    body: "YO-YOからお知らせがあります",
    title: "PET YO-YO",
    url: "/Home",
  };
  let payload = fallbackPayload;

  if (event.data) {
    try {
      payload = { ...fallbackPayload, ...event.data.json() };
    } catch {
      payload = { ...fallbackPayload, body: event.data.text() };
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      data: { url: payload.url },
      icon: "/images/home/pet1.png",
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const requestedUrl = new URL(
    event.notification.data?.url ?? "/Home",
    self.location.origin,
  );
  const destination =
    requestedUrl.origin === self.location.origin
      ? requestedUrl
      : new URL("/Home", self.location.origin);

  event.waitUntil(
    self.clients
      .matchAll({ includeUncontrolled: true, type: "window" })
      .then((clients) => {
        const client = clients.find(
          (windowClient) =>
            new URL(windowClient.url).pathname === destination.pathname,
        );

        return client
          ? client.focus()
          : self.clients.openWindow(destination.href);
      }),
  );
});
