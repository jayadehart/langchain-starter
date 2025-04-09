import { HaikuSkeleton } from "./haiku-skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Haiku Gallery</h1>
      <div className="max-w-3xl mx-auto">
        <HaikuSkeleton />
      </div>
    </main>
  );
}
