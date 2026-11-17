export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-[14px] overflow-hidden p-3 animate-pulse">
      <div className="aspect-[4/3] w-full rounded-[10px] bg-[#e9e7df]" />
      <div className="mt-3 space-y-2.5 px-1 pb-1">
        <div className="h-3 w-24 rounded bg-[#e9e7df]" />
        <div className="h-4 w-4/5 rounded bg-[#e9e7df]" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-20 rounded bg-[#e9e7df]" />
          <div className="h-9 w-24 rounded-full bg-[#e9e7df]" />
        </div>
      </div>
    </div>
  );
}
