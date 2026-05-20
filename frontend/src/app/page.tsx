import Hero from "@/components/sections/hero";
import Navbar from "@/components/sections/navbar";
import Problems from "@/components/sections/problems";
import Solutions from "@/components/sections/solutions";
import Stats from "@/components/sections/stats";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Stats />
      <Problems />
      <Solutions />
    </main>
  );
}