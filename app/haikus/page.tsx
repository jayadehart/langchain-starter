import { Suspense } from "react";
import HaikuList from "./haiku-list";
import { HaikuSkeleton } from "./haiku-skeleton";

export const metadata = {
  title: "Haiku Gallery",
  description: "A collection of AI-generated haikus",
};

export default function HaikusPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Haiku Gallery</h1>
      <div className="max-w-3xl mx-auto">
        <Suspense fallback={<HaikuSkeleton />}>
          <HaikuList />
        </Suspense>
      </div>
    </main>
  );
}
