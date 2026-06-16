import { Header } from "@/components/layout/header";
import { MainContent } from "@/components/layout/main-content";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <MainContent />
    </div>
  );
}
