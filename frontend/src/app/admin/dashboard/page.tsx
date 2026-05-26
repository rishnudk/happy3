"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Users,
  Activity,
  Award,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  Calendar,
  Layers,
  Heart
} from "lucide-react";
import { API_BASE } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import NeuCard from "@/components/ui/NeuCard";
import { motion } from "framer-motion";

type SubmittedAnswer = {
  questionId: number;
  optionId: number;
  mark: number;
};

type Submission = {
  id: number;
  name: string;
  emailId: string;
  phoneNumber: string;
  totalScore: number;
  answers: SubmittedAnswer[];
  createdAt: string;
};

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/assessment/submissions`, {
        credentials: "include"
      });
      const json = await res.json();
      if (json.success) {
        setSubmissions(json.data ?? []);
      }
    } catch {
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Calculations for Metrics
  const stats = useMemo(() => {
    if (submissions.length === 0) {
      return {
        total: 0,
        average: 0,
        highest: 0,
        flourishingRate: 0,
        brackets: { reflective: 0, balanced: 0, flourishing: 0 },
        dailyActivity: [] as { label: string; count: number }[]
      };
    }

    const total = submissions.length;
    const scores = submissions.map((s) => s.totalScore);
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = Math.round((sum / total) * 10) / 10;
    const highest = Math.max(...scores);

    // Bracket distributions
    let flourishing = 0;
    let balanced = 0;
    let reflective = 0;

    submissions.forEach((s) => {
      if (s.totalScore >= 31) flourishing++;
      else if (s.totalScore >= 21) balanced++;
      else reflective++;
    });

    const flourishingRate = Math.round(((flourishing + balanced) / total) * 100);

    // Grouping submissions by date for the timeline (last 7 days of activity)
    const dailyMap: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dailyMap[key] = 0;
    }

    submissions.forEach((s) => {
      const date = new Date(s.createdAt);
      const key = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (key in dailyMap) {
        dailyMap[key]++;
      }
    });

    const dailyActivity = Object.entries(dailyMap).map(([label, count]) => ({
      label,
      count
    }));

    return {
      total,
      average,
      highest,
      flourishingRate,
      brackets: { reflective, balanced, flourishing },
      dailyActivity
    };
  }, [submissions]);

  // Helper to format date
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Timeline SVG calculations
  const svgHeight = 120;
  const maxCount = Math.max(...stats.dailyActivity.map((d) => d.count), 4);
  const chartPoints = stats.dailyActivity
    .map((d, index) => {
      const x = (index / 6) * 100; // scaling to percent (0-100)
      const y = svgHeight - (d.count / maxCount) * (svgHeight - 20) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Operations Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of HCA's emotional self-discovery analytics.
          </p>
        </div>
        <Link href="/admin/dashboard/assessments">
          <Button className="h-10 gap-2 rounded-xl px-5 shadow-md shadow-primary/20">
            View All Submissions
            <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Total Users */}
        <NeuCard variant="glass" className="p-5 overflow-hidden" hoverLift={true}>
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-display font-extrabold uppercase tracking-wider text-muted-foreground">
                Total Assessments
              </span>
              <h3 className="font-display font-black text-3xl text-nature-black/90">
                {loading ? "..." : stats.total}
              </h3>
            </div>
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users className="size-5" />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground/80 mt-3 font-display">
            Completed transformation reflections
          </p>
        </NeuCard>

        {/* Metric 2: Avg Score */}
        <NeuCard variant="glass" className="p-5 overflow-hidden" hoverLift={true}>
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-display font-extrabold uppercase tracking-wider text-muted-foreground">
                Average Score
              </span>
              <h3 className="font-display font-black text-3xl text-nature-black/90">
                {loading ? "..." : `${stats.average} / 40`}
              </h3>
            </div>
            <div className="size-10 rounded-xl bg-[#FFCE1B]/15 flex items-center justify-center text-[#D4990A]">
              <Activity className="size-5" />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground/80 mt-3 font-display">
            Mean emotional self-awareness score
          </p>
        </NeuCard>

        {/* Metric 3: Peak Score */}
        <NeuCard variant="glass" className="p-5 overflow-hidden" hoverLift={true}>
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-display font-extrabold uppercase tracking-wider text-muted-foreground">
                Peak Score
              </span>
              <h3 className="font-display font-black text-3xl text-nature-black/90">
                {loading ? "..." : `${stats.highest} / 40`}
              </h3>
            </div>
            <div className="size-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#800080]">
              <Award className="size-5 animate-pulse" />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground/80 mt-3 font-display">
            Highest individual score recorded
          </p>
        </NeuCard>

        {/* Metric 4: Growth Rate */}
        <NeuCard variant="glass" className="p-5 overflow-hidden" hoverLift={true}>
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-display font-extrabold uppercase tracking-wider text-muted-foreground">
                Flourishing Rate
              </span>
              <h3 className="font-display font-black text-3xl text-nature-black/90">
                {loading ? "..." : `${stats.flourishingRate}%`}
              </h3>
            </div>
            <div className="size-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="size-5" />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground/80 mt-3 font-display font-medium">
            Share of users in Balanced/Flourishing brackets
          </p>
        </NeuCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2-Span): Timeline Activity & Distribution */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline Chart */}
          <Card className="border-white/60 bg-white/90 shadow-[var(--shadow-card)]">
            <CardHeader className="border-b border-border/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <Calendar className="size-4 text-primary" />
                Assessment Activity
              </CardTitle>
              <CardDescription>
                Daily count of happiness survey completions (last 7 days)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="h-[180px] flex items-center justify-center text-muted-foreground font-medium text-sm">
                  Loading activity charts...
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Custom SVG Line Chart */}
                  <div className="relative h-[130px] w-full">
                    <svg className="w-full h-full" viewBox={`0 0 100 ${svgHeight}`} preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" y1={svgHeight/2} x2="100" y2={svgHeight/2} stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="3" />
                      <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="3" />
                      
                      {/* Gradient Fill */}
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#800080" stopOpacity="0.16" />
                          <stop offset="100%" stopColor="#800080" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`M 0,${svgHeight} L ${chartPoints} L 100,${svgHeight} Z`}
                        fill="url(#chartGrad)"
                      />

                      {/* Line Path */}
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        d={`M ${chartPoints}`}
                        fill="none"
                        stroke="#800080"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Dots on nodes */}
                      {stats.dailyActivity.map((d, idx) => {
                        const x = (idx / 6) * 100;
                        const y = svgHeight - (d.count / maxCount) * (svgHeight - 20) - 10;
                        return (
                          <circle
                            key={idx}
                            cx={x}
                            cy={y}
                            r="4.5"
                            className="fill-white stroke-[#800080] stroke-[2.5px] cursor-pointer transition-transform hover:scale-125"
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* X-Axis Labels */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground/80 px-2 font-display">
                    {stats.dailyActivity.map((d, index) => (
                      <div key={index} className="text-center font-semibold">
                        <div>{d.label}</div>
                        <div className="text-[10px] text-primary/80 mt-0.5">{d.count} count</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bracket Distributions */}
          <Card className="border-white/60 bg-white/90 shadow-[var(--shadow-card)]">
            <CardHeader className="border-b border-border/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <Layers className="size-4 text-primary" />
                Score Distribution Brackets
              </CardTitle>
              <CardDescription>
                Breakdown of user mindfulness categories (wisdom metrics)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="py-8 text-center text-muted-foreground font-medium text-sm">
                  Loading distribution...
                </div>
              ) : (
                <div className="space-y-6 max-w-xl mx-auto">
                  {/* Custom stacked distribution bar */}
                  <div className="h-6 w-full rounded-full flex overflow-hidden border border-white bg-slate-100 shadow-inner">
                    {stats.brackets.flourishing > 0 && (
                      <div
                        className="bg-emerald-500 transition-all duration-500 flex items-center justify-center text-[10px] font-black text-white"
                        style={{ width: `${(stats.brackets.flourishing / stats.total) * 100}%` }}
                      >
                        {Math.round((stats.brackets.flourishing / stats.total) * 100)}%
                      </div>
                    )}
                    {stats.brackets.balanced > 0 && (
                      <div
                        className="bg-purple-500 transition-all duration-500 flex items-center justify-center text-[10px] font-black text-white"
                        style={{ width: `${(stats.brackets.balanced / stats.total) * 100}%` }}
                      >
                        {Math.round((stats.brackets.balanced / stats.total) * 100)}%
                      </div>
                    )}
                    {stats.brackets.reflective > 0 && (
                      <div
                        className="bg-amber-500 transition-all duration-500 flex items-center justify-center text-[10px] font-black text-white"
                        style={{ width: `${(stats.brackets.reflective / stats.total) * 100}%` }}
                      >
                        {Math.round((stats.brackets.reflective / stats.total) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Custom legend with detailed stats */}
                  <div className="grid gap-4 sm:grid-cols-3 font-display">
                    {/* Flourishing */}
                    <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/20 flex flex-col gap-1 text-center sm:text-left">
                      <span className="inline-flex items-center gap-1.5 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide self-center sm:self-start">
                        <Sparkles className="size-3 text-emerald-600 animate-pulse" />
                        Flourishing (31-40)
                      </span>
                      <h4 className="text-xl font-black text-nature-black/90 mt-1">
                        {stats.brackets.flourishing} <span className="text-xs font-semibold text-muted-foreground">users</span>
                      </h4>
                      <p className="text-[10px] text-muted-foreground/80">Active daily well-being</p>
                    </div>

                    {/* Balanced */}
                    <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/20 flex flex-col gap-1 text-center sm:text-left">
                      <span className="inline-flex items-center gap-1.5 text-purple-800 text-[10px] font-extrabold uppercase tracking-wide self-center sm:self-start">
                        <Activity className="size-3 text-purple-600 animate-pulse" />
                        Balanced (21-30)
                      </span>
                      <h4 className="text-xl font-black text-nature-black/90 mt-1">
                        {stats.brackets.balanced} <span className="text-xs font-semibold text-muted-foreground">users</span>
                      </h4>
                      <p className="text-[10px] text-muted-foreground/80">Stable emotional foundation</p>
                    </div>

                    {/* Reflective */}
                    <div className="p-4 rounded-2xl border border-amber-100 bg-amber-50/20 flex flex-col gap-1 text-center sm:text-left">
                      <span className="inline-flex items-center gap-1.5 text-amber-800 text-[10px] font-extrabold uppercase tracking-wide self-center sm:self-start">
                        <Heart className="size-3 text-amber-600 animate-pulse" />
                        Reflective (10-20)
                      </span>
                      <h4 className="text-xl font-black text-nature-black/90 mt-1">
                        {stats.brackets.reflective} <span className="text-xs font-semibold text-muted-foreground">users</span>
                      </h4>
                      <p className="text-[10px] text-muted-foreground/80">Soft reflective growth phase</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Activity Feed */}
        <Card className="border-white/60 bg-white/90 shadow-[var(--shadow-card)] lg:col-span-1">
          <CardHeader className="border-b border-border/30 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Activity className="size-4 text-primary animate-pulse" />
              Recent Reflections
            </CardTitle>
            <CardDescription>
              Latest wellness checks submitted by users
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-12 text-center text-muted-foreground font-medium text-sm">
                Loading reflections feed...
              </div>
            ) : submissions.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground font-medium text-sm">
                No recent activity recorded.
              </div>
            ) : (
              <div className="divide-y divide-border/20 max-h-[515px] overflow-y-auto">
                {submissions.slice(0, 5).map((sub) => {
                  const isHigh = sub.totalScore >= 31;
                  const isLow = sub.totalScore < 21;
                  return (
                    <div key={sub.id} className="p-4.5 flex flex-col gap-1.5 hover:bg-muted/10 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full" style={{
                            background: isHigh ? "#10B981" : isLow ? "#F59E0B" : "#8B5CF6"
                          }} />
                          <span className="font-sans font-bold text-nature-black/90 text-sm">
                            {sub.name}
                          </span>
                        </div>
                        <span className="text-xs font-display font-black text-primary">
                          {sub.totalScore} pts
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground/80">
                        <span className="truncate max-w-[130px]">{sub.emailId}</span>
                        <span>{formatDate(sub.createdAt)}</span>
                      </div>

                      <div className="flex justify-end pt-1">
                        <Link href="/admin/dashboard/assessments">
                          <button className="text-[10px] font-display font-bold text-primary/80 hover:text-primary flex items-center gap-0.5 cursor-pointer">
                            Inspect Response
                            <ChevronRight className="size-3" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}