import FilterContent from "./FilterContent";

export default function FilterSidebar() {
  return (
    <aside className="hidden lg:block w-64 shrink-0 h-screen border-r border-gray-300">
      <h2 className="text-lg font-semibold my-6">Filters</h2>
      <FilterContent variant="checkbox" />
    </aside>
  );
}