import type { VisaGuide } from "@/types/visa";
import ConsulateZoneSection from "./ConsulateZoneSection";
import {
  ArrowLeft,
  Clock,
  Banknote,
  Calendar,
  Repeat2,
  Globe,
  CheckCircle2,
  XCircle,
  Lightbulb,
  FileText,
  ExternalLink,
  ListChecks,
  AlertCircle,
  MapPin,
} from "lucide-react";

interface Props {
  guide: VisaGuide;
  onBack: () => void;
}

const difficultyColors: Record<string, string> = {
  简单: "text-emerald-600 bg-emerald-50",
  中等: "text-amber-600 bg-amber-50",
  较难: "text-red-600 bg-red-50",
};

export default function VisaDetail({ guide, onBack }: Props) {
  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={guide.coverImage}
          alt={guide.country}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full transition-all text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </button>

        {/* Title */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex items-end gap-4">
            <span className="text-6xl">{guide.flag}</span>
            <div>
              <h1 className="text-white text-3xl md:text-4xl font-bold">{guide.country}</h1>
              <p className="text-white/80 text-sm">{guide.countryEn}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 items-center">
          {guide.visaFreeForChinese ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-sm px-3 py-1.5 rounded-full font-medium">
              <CheckCircle2 className="w-4 h-4" />
              中国护照免签
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-sm px-3 py-1.5 rounded-full font-medium">
              <XCircle className="w-4 h-4" />
              需要签证
            </span>
          )}
          {guide.eVisaAvailable && (
            <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-sm px-3 py-1.5 rounded-full font-medium">
              <Globe className="w-4 h-4" />
              支持电子签证
            </span>
          )}
          <span className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium ${difficultyColors[guide.difficulty]}`}>
            申请难度：{guide.difficulty}
          </span>
          <span className="bg-sky-50 text-sky-600 text-sm px-3 py-1.5 rounded-full">
            {guide.continent} · {guide.region}
          </span>
        </div>

        {/* Policy Cards */}
        <section>
          <h2 className="text-xl font-bold text-[#0C4A6E] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0EA5E9]" />
            签证政策详情
          </h2>
          <div className="grid gap-4">
            {guide.policies.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 text-lg">{p.type}</h3>
                  <span className="text-xs text-gray-400">最新政策</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-sky-50 rounded-xl">
                    <Clock className="w-5 h-5 text-[#0EA5E9] mx-auto mb-1" />
                    <div className="text-xs text-gray-500 mb-0.5">停留时长</div>
                    <div className="font-semibold text-gray-800 text-sm">{p.duration}</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-[#F97316] mx-auto mb-1" />
                    <div className="text-xs text-gray-500 mb-0.5">签证有效期</div>
                    <div className="font-semibold text-gray-800 text-sm">{p.validity}</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-xl">
                    <Repeat2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-500 mb-0.5">入境次数</div>
                    <div className="font-semibold text-gray-800 text-sm">{p.entries}</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-xl">
                    <Banknote className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-500 mb-0.5">签证费用</div>
                    <div className="font-semibold text-gray-800 text-sm">{p.fee}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>标准办理时长：<strong>{p.processingTime}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consulate Zones — NEW */}
        <section>
          <h2 className="text-xl font-bold text-[#0C4A6E] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#F97316]" />
            国内领区 &amp; 申请地点
          </h2>
          <ConsulateZoneSection zones={guide.consulateZones} />
        </section>

        {/* Requirements */}
        <section>
          <h2 className="text-xl font-bold text-[#0C4A6E] mb-4 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-[#0EA5E9]" />
            通用申请材料清单
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="space-y-3">
              {guide.requirements.map((req, i) => (
                <div key={i} className="flex gap-3 items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                    req.required ? "bg-[#0EA5E9]" : "bg-gray-200"
                  }`}>
                    {req.required ? (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    ) : (
                      <span className="text-gray-500 text-xs">?</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 text-sm">{req.item}</span>
                      {!req.required && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">可选</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section>
          <h2 className="text-xl font-bold text-[#0C4A6E] mb-4 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-[#F97316]" />
            申请流程
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <ol className="space-y-4">
              {guide.applicationProcess.map((step, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-700 text-sm">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-bold text-[#0C4A6E] mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            最新攻略 &amp; 注意事项
          </h2>
          <div className="space-y-3">
            {guide.tips.map((tip, i) => (
              <div key={i} className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Official Link */}
        <section>
          <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">官方签证申请渠道</h3>
                <p className="text-sky-200 text-sm mt-1">建议通过官方网站申请，避免中介诈骗</p>
              </div>
              <a
                href={guide.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-[#0EA5E9] px-4 py-2 rounded-xl font-medium text-sm hover:bg-sky-50 transition-colors"
              >
                访问官网
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="flex gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400">
            本页信息最后更新于 {guide.lastUpdated}，签证政策随时可能发生变化。出行前请务必以{guide.country}大使馆/领事馆官方公告为准，本站不承担因信息滞后造成的任何损失。
          </p>
        </div>
      </div>
    </div>
  );
}
