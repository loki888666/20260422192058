import type { VisaGuide } from "@/types/visa";
import { Clock, Banknote, CheckCircle2, Globe } from "lucide-react";

interface Props {
  guide: VisaGuide;
  onClick: () => void;
}

const difficultyColors: Record<string, string> = {
  简单: "bg-emerald-100 text-emerald-700",
  中等: "bg-amber-100 text-amber-700",
  较难: "bg-red-100 text-red-700",
};

export default function VisaCard({ guide, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-sky-200 to-blue-400">
        <img
          src={guide.coverImage}
          alt={guide.country}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Flag + Country */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl">{guide.flag}</span>
              <h3 className="text-white font-bold text-lg leading-tight">{guide.country}</h3>
            </div>
            {guide.visaFreeForChinese && (
              <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                免签
              </span>
            )}
            {!guide.visaFreeForChinese && guide.eVisaAvailable && (
              <span className="bg-[#F97316] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                电子签
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Difficulty + Region */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[guide.difficulty]}`}>
            难度：{guide.difficulty}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Globe className="w-3 h-3" />
            {guide.region}
          </span>
        </div>

        {/* Quick info */}
        {guide.policies[0] && (
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
              <span>停留：{guide.policies[0].duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Banknote className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
              <span>费用：{guide.policies[0].fee}</span>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {guide.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Updated */}
        <p className="text-xs text-gray-300 mt-3 text-right">
          更新：{guide.lastUpdated}
        </p>
      </div>
    </div>
  );
}
