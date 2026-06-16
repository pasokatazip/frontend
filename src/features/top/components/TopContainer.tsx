import { TopView } from "./TopView";

export function TopContainer() {
  return (
    <TopView
      logo={{
        alt: "YoYo!",
        height: 240,
        src: "/images/top/logo.png",
        width: 630,
      }}
    />
  );
}
