"use client"
import React from "react"
import { DevelopmentReport } from "../types/parent.types"
import { ClipboardList, Star, TrendingUp, TrendingDown, Target } from "lucide-react"

export function DevelopmentReportCard({ report }: { report: DevelopmentReport }) {
  const getScoreColor = (score: number) => {
    if (score >= 4.0) return "text-success";
    if (score >= 3.0) return "text-amber-500";
    return "text-destructive";
  }

  const getScoreBg = (score: number) => {
    if (score >= 4.0) return "bg-success/20";
    if (score >= 3.0) return "bg-amber-500/20";
    return "bg-destructive/20";
  }

  return (
    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
      <div className="p-6 border-b bg-muted/20">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
              <ClipboardList className="w-4 h-4" /> {new Date(report.date).toLocaleDateString()}
            </div>
            <h3 className="text-xl font-bold">{report.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">Evaluated by {report.coachName}</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-black tabular-nums p-3 rounded-xl ${getScoreBg(report.overallScore)} ${getScoreColor(report.overallScore)}`}>
              {report.overallScore.toFixed(1)}
            </div>
            <div className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">Overall</div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Metrics Overview</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Technical", score: report.technicalScore },
              { label: "Tactical", score: report.tacticalScore },
              { label: "Physical", score: report.physicalScore },
              { label: "Mental", score: report.psychologicalScore }
            ].map(metric => (
              <div key={metric.label} className="bg-muted/30 p-3 rounded-xl border">
                <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                <div className="flex items-center gap-1.5 font-bold">
                  <Star className={`w-4 h-4 fill-current ${getScoreColor(metric.score)}`} />
                  <span>{metric.score.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Coach Comments</h4>
          <p className="text-sm leading-relaxed text-foreground bg-muted/20 p-4 rounded-xl border-l-4 border-l-primary">
            "{report.comments}"
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" /> Strengths
            </h4>
            <ul className="space-y-2">
              {report.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm bg-success/5 p-2 rounded-lg border border-success/10">
                  <span className="text-success font-bold mt-0.5">•</span> {str}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-500" /> Focus Areas
            </h4>
            <ul className="space-y-2">
              {report.areasForDevelopment.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                  <span className="text-amber-500 font-bold mt-0.5">•</span> {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
