import { PaginationButton } from "./pagination-button";

async function getHaikus(page = 1, limit = 5) {
  // Use absolute URL in production, relative URL in development
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "";

  const res = await fetch(
    `${baseUrl}/api/chat/save?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch haikus");
  }

  return res.json();
}

export default async function HaikuList({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = searchParams?.page
    ? Number.parseInt(searchParams.page)
    : 1;
  const data = await getHaikus(currentPage);

  if (!data.haikus || data.haikus.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No haikus found. Create some first!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6">
        {data.haikus.map((haiku: any) => (
          <div
            key={haiku.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
          >
            <div className="font-serif text-lg leading-relaxed whitespace-pre-line">
              {haiku.content}
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {new Date(haiku.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>

      {data.pagination && data.pagination.pages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <PaginationButton
              page={currentPage - 1}
              disabled={currentPage <= 1}
            >
              Previous
            </PaginationButton>

            <span className="flex items-center px-4">
              Page {currentPage} of {data.pagination.pages}
            </span>

            <PaginationButton
              page={currentPage + 1}
              disabled={currentPage >= data.pagination.pages}
            >
              Next
            </PaginationButton>
          </div>
        </div>
      )}
    </div>
  );
}
