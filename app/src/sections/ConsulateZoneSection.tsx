import { useState } from "react";
import type { ConsulateZone } from "@/types/visa";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink,
  Phone,
  AlertCircle,
  Clock,
} from "lucide-react";

interface Props {
  zones: ConsulateZone[];
}

export default function ConsulateZoneSection({ zones }: Props) {
  const [activeZone, setActiveZone] = useState(0);
  const [expandedNotes, setExpandedNotes] = useState(false);

  if (!zones || zones.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-emerald-700">无需前往领事馆</p>
          <p className="text-sm text-emerald-600 mt-1">该国签证为免签或全程在线申请，中国境内无领区限制。</p>
        </div>
      </div>
    );
  }

  const zone = zones[activeZone];

  return (
    <div className="space-y-4">
      {/* Zone Tabs */}
      <div className="flex flex-wrap gap-2">
        {zones.map((z, i) => (
          <button
            key={z.name}
            onClick={() => {
              setActiveZone(i);
              setExpandedNotes(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeZone === i
                ? "bg-[#0EA5E9] text-white shadow-md shadow-sky-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {z.name}
          </button>
        ))}
      </div>

      {/* Zone Detail Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 px-5 py-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-[#0C4A6E] text-lg flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0EA5E9]" />
                {zone.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                管辖省市：{zone.provinces.join("、")}
              </p>
            </div>
            {zone.processingTime && (
              <div className="shrink-0 bg-white rounded-xl px-3 py-2 text-center shadow-sm">
                <Clock className="w-4 h-4 text-[#0EA5E9] mx-auto mb-0.5" />
                <div className="text-xs text-gray-500">当地审期</div>
                <div className="text-xs font-semibold text-gray-800">{zone.processingTime}</div>
              </div>
            )}
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Address & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex gap-2 items-start text-sm">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-gray-400 mb-0.5">地址</div>
                <div className="text-gray-700">{zone.address}</div>
              </div>
            </div>
            <div className="flex gap-2 items-start text-sm">
              <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-gray-400 mb-0.5">联系方式</div>
                <div className="text-gray-700">{zone.contact}</div>
              </div>
            </div>
          </div>

          {/* Appointment Link */}
          <a
            href={zone.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-sky-50 hover:bg-sky-100 transition-colors rounded-xl px-4 py-3 text-sm"
          >
            <span className="font-medium text-[#0EA5E9]">前往预约递签</span>
            <ExternalLink className="w-4 h-4 text-[#0EA5E9]" />
          </a>

          {/* Extra Requirements */}
          {zone.extraRequirements.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                该领区额外要求（在通用材料之上）
              </h4>
              <div className="space-y-2">
                {zone.extraRequirements.map((req, i) => (
                  <div key={i} className="flex gap-2 items-start text-sm bg-amber-50 rounded-xl p-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${req.required ? "bg-amber-500" : "bg-gray-300"}`}>
                      {req.required
                        ? <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                        : <span className="text-white text-xs">?</span>
                      }
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">{req.item}</span>
                      {!req.required && <span className="ml-1.5 text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">可选</span>}
                      <p className="text-gray-500 text-xs mt-0.5">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {zone.notes.length > 0 && (
            <div>
              <button
                onClick={() => setExpandedNotes(!expandedNotes)}
                className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 py-2 hover:text-[#0EA5E9] transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#0EA5E9]" />
                  该领区特别说明（{zone.notes.length}条）
                </span>
                {expandedNotes
                  ? <ChevronUp className="w-4 h-4" />
                  : <ChevronDown className="w-4 h-4" />
                }
              </button>
              {expandedNotes && (
                <div className="space-y-2 mt-2">
                  {zone.notes.map((note, i) => (
                    <div key={i} className="flex gap-2 text-sm bg-blue-50 rounded-xl px-4 py-2.5">
                      <span className="text-[#0EA5E9] font-bold shrink-0">{i + 1}.</span>
                      <p className="text-gray-700">{note}</p>
                    </div>
                  ))}
                </div>
              )}
              {!expandedNotes && (
                <div className="text-xs text-gray-400 mt-1 pl-6">
                  点击展开查看{zone.notes.length}条注意事项
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
