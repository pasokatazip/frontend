import type { CurrentPet } from "@/features/home/api/GetCurrentPet";

export const mockPets = [
  {
    color: "#FFD45C",
    current_group: null,
    departure: null,
    id: "mock-pet-1",
    name: "YO-YO 2",
    stageId: 0,
  },
  {
    color: "#93D8FF",
    current_group: null,
    departure: null,
    id: "mock-pet-2",
    name: "YO-YO 3",
    stageId: 1,
  },
  {
    color: "#C8A7FF",
    current_group: null,
    departure: null,
    id: "mock-pet-3",
    name: "YO-YO 4",
    stageId: 2,
  },
] satisfies CurrentPet[];
