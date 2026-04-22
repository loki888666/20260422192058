import { useState, useMemo } from "react";
import { visaGuides, continents, visaTypes, difficulties } from "@/data/visaData";
import type { VisaGuide, Continent, VisaType, Difficulty } from "@/types/visa";
import { Search, Globe, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VisaCard from "./VisaCard";
import VisaDetail from "./VisaDetail";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedContinent, setSelectedContinent] = useState<Continent>("全部");
  const [selectedVisaType, setSelectedVisaType] = useState<VisaType>("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("全部");
  const [selectedGuide, setSelectedGuide] = useState<VisaGuide | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return visaGuides.filter((g) => {
      const matchSearch =
        !search ||
        g.country.includes(search) ||
        g.countryEn.toLowerCase().includes(search.toLowerCase()) ||
        g.tags.some((t) => t.includes(search));

      const matchContinent =
        selectedContinent === "全部" || g.continent === selectedContinent;

      const matchVisaType =
        selectedVisaType === "全部" ||
        (selectedVisaType === "免签" && g.visaFreeForChinese) ||
        (selectedVisaType === "电子签" && g.eVisaAvailable) ||
        (selectedVisaType === "贴纸签" && !g.visaFreeForChinese && !g.eVisaAvailable);

      const matchDifficulty =
        selectedDifficulty === "全部" || g.difficulty === selectedDifficulty;

      return matchSearch && matchContinent && matchVisaType && matchDifficulty;
    });
  }, [search, selectedContinent, selectedVisaType, selectedDifficulty]);

  const stats = useMemo(() => ({
    total: visaGuides.length,
    visaFree: visaGuides.filter((g) => g.visaFreeForChinese).length,
    eVisa: visaGuides.filter((g) => g.eVisaAvailable && !g.visaFreeForChinese).length,
  }), []);

  if (selectedGuide) {
    return <VisaDetail guide={selectedGuide} onBack={() => setSelectedGuide(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0C4A6E] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-[#F97316] blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-10 h-10 text-[#38BDF8]" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">全球签证攻略</h1>
          </div>
          <p className="text-[#BAE6FD] text-lg mb-8 max-w-2xl mx-auto">
            收录全球热门目的地最新签证政策与申请攻略，数据持续更新，助您轻松出行
          </p>
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.total}+</div>
              <div className="text-[#BAE6FD] text-sm">目的地</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{stats.visaFree}</div>
              <div className="text-[#BAE6FD] text-sm">免签国家</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F97316]">{stats.eVisa}</div>
              <div className="text-[#BAE6FD] text-sm">电子签可用</div>
            </div>
          </div>
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索国家名称或标签，如：泰国、免签、欧洲..."
              className="pl-12 h-13 text-base bg-white text-gray-900 border-0 shadow-xl rounded-2xl"
            />
            {search && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                onClick={() => setSearch("")}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Mobile toggle */}
          <div className="flex items-center justify-between md:hidden mb-2">
            <span className="text-sm text-gray-500">共 {filtered.length} 个目的地</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-xs gap-1"
            >
              <Filter className="w-3.5 h-3.5" />
              筛选
            </Button>
          </div>

          <div className={`${showFilters ? "block" : "hidden"} md:block space-y-3`}>
            {/* Continent */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 w-12 shrink-0">大洲</span>
              {continents.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedContinent(c as Continent)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedContinent === c
                      ? "bg-[#0EA5E9] text-white font-medium"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Visa type */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 w-12 shrink-0">类型</span>
              {visaTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedVisaType(t as VisaType)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedVisaType === t
                      ? "bg-[#F97316] text-white font-medium"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Difficulty */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 w-12 shrink-0">难度</span>
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d as Difficulty)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedDifficulty === d
                      ? "bg-[#0C4A6E] text-white font-medium"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop count */}
          <div className="hidden md:block text-xs text-gray-400 mt-2">
            共 {filtered.length} 个目的地
          </div>
        </div>
      </div>

      {/* Cards */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Globe className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">没有找到匹配的目的地</p>
            <button
              className="mt-3 text-[#0EA5E9] text-sm hover:underline"
              onClick={() => {
                setSearch("");
                setSelectedContinent("全部");
                setSelectedVisaType("全部");
                setSelectedDifficulty("全部");
              }}
            >
              清除所有筛选
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((guide) => (
              <VisaCard
                key={guide.id}
                guide={guide}
                onClick={() => setSelectedGuide(guide)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>📌 本站信息基于公开资料整理，签证政策随时可能变化，请以各国大使馆官方公告为准</p>
          <p className="mt-1">最后更新：2025年4月 · 仅供参考，不构成法律或签证建议</p>
        </div>
      </footer>
    </div>
  );
}
