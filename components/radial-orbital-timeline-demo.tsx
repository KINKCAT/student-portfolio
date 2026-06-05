"use client";

import { BookOpen, Code, Trophy, Globe, Star, Rocket, Users, Heart } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Academics",
    date: "2022–2025",
    content:
      "Completed rigorous Science stream (Physics, Chemistry, Mathematics) from MPBSE. Qualified JEE Main — developed advanced problem-solving through independent self-study beyond the curriculum.",
    category: "Education",
    icon: BookOpen,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Leadership",
    date: "Class 10–12",
    content:
      "Head Boy, House Captain (×2), Sports Club Head, Class Monitor across multiple years. Led cross-functional teams in academics, cultural events, and sports — representing 500+ students.",
    category: "Leadership",
    icon: Star,
    relatedIds: [1, 3, 5],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Community",
    date: "Ongoing",
    content:
      "Teacher Assistant for four consecutive years. Mentored younger students, supported community medical camps, contributed during COVID-19 relief efforts, and led charity fundraising for cancer patients.",
    category: "Service",
    icon: Heart,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Programming",
    date: "Ongoing",
    content:
      "Building real projects in JavaScript and C++. Developed a calculator app, algorithm problem-solving repository, and this portfolio with Next.js. Passionate about open-source and AI.",
    category: "Tech Skills",
    icon: Code,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 65,
  },
  {
    id: 5,
    title: "Languages",
    date: "Ongoing",
    content:
      "Actively learning German, targeting B1 certification. Part of a deliberate strategy to open doors to world-class engineering universities across Europe, including Germany.",
    category: "Language",
    icon: Globe,
    relatedIds: [4, 6],
    status: "in-progress" as const,
    energy: 40,
  },
  {
    id: 6,
    title: "Global Vision",
    date: "Future",
    content:
      "Aiming to study Computer Science or Engineering at leading international universities.",
    category: "Goals",
    icon: Rocket,
    relatedIds: [5, 1],
    status: "pending" as const,
    energy: 25,
  },
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default RadialOrbitalTimelineDemo;
