export function BlogSkeleton() {
  return (
    <section className="relative py-20 bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 sm:gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-32 h-4 bg-gray-200 rounded-md animate-pulse" />
            </div>
            <div className="w-3/4 h-8 bg-gray-200 rounded-md animate-pulse" />
            <div className="w-1/2 h-8 bg-gray-200 rounded-md animate-pulse" />
          </div>

          <div className="flex-1 flex justify-end">
            <div className="w-40 h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* MOBILE SKELETON */}
        <div className="md:hidden flex flex-col gap-8 mt-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow flex flex-col h-full"
            >
              <div className="w-full h-[280px] bg-gray-200 animate-pulse" />

              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse" />
                  <div className="w-16 h-4 bg-gray-200 rounded-md animate-pulse" />
                </div>

                <div className="w-full h-6 bg-gray-200 rounded-md animate-pulse" />
                <div className="w-3/4 h-6 bg-gray-200 rounded-md animate-pulse" />

                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse" />
                <div className="w-5/6 h-4 bg-gray-200 rounded-md animate-pulse" />
                <div className="w-1/2 h-4 bg-gray-200 rounded-md animate-pulse" />

                <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse mt-4" />
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP SKELETON */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          {/* LEFT big card */}
          <div className="md:col-span-6">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow flex flex-col h-full">
              <div className="w-full h-[280px] bg-gray-200 animate-pulse" />

              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-4 bg-gray-200 animate-pulse rounded-md" />
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded-md" />
                </div>

                <div className="w-full h-6 bg-gray-200 animate-pulse rounded-md" />
                <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded-md" />

                <div className="w-full h-4 bg-gray-200 animate-pulse" />
                <div className="w-5/6 h-4 bg-gray-200 animate-pulse" />
                <div className="w-1/2 h-4 bg-gray-200 animate-pulse" />

                <div className="w-28 h-4 bg-gray-200 rounded-md animate-pulse mt-4" />
              </div>
            </div>
          </div>

          {/* RIGHT small cards */}
          <div className="md:col-span-6 flex flex-col gap-10">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow flex flex-row h-[240px]"
              >
                <div className="w-2/5 bg-gray-200 animate-pulse" />

                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse" />
                    <div className="w-14 h-4 bg-gray-200 rounded-md animate-pulse" />
                  </div>

                  <div className="w-3/4 h-5 bg-gray-200 rounded-md animate-pulse" />
                  <div className="w-2/3 h-5 bg-gray-200 rounded-md animate-pulse" />

                  <div className="w-full h-4 bg-gray-200 animate-pulse" />
                  <div className="w-5/6 h-4 bg-gray-200 animate-pulse" />
                  <div className="w-1/2 h-4 bg-gray-200 animate-pulse" />

                  <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse mt-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
