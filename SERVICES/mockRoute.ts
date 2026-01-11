import { GeneratedRoute } from "@/types/route";

export function generateMockRoute(): GeneratedRoute {
  return {
    id: Math.random().toString(),
    points: [
      { latitude: 53.5444, longitude: -113.4909 },
      { latitude: 53.5475, longitude: -113.5032 },
      { latitude: 53.5401, longitude: -113.5201 },
      { latitude: 53.5322, longitude: -113.5088 },
      { latitude: 53.5444, longitude: -113.4909 },
    ],
  };
}
