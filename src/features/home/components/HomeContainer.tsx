import { HomeView } from "./HomeView";

export function HomeContainer() {
  return (
    <HomeView
      title="Home"
      effectImage={{
        src: "/images/home/effect.png",
        width: 1125,
        height: 1143,
      }}
    />
  );
}
