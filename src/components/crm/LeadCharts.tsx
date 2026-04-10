import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import type { Lead } from "@/hooks/useLeads";
import { format, subDays, eachDayOfInterval, startOfDay } from "date-fns";
import { TrendingUp } from "lucide-react";

interface LeadChartsProps {
  leads: Lead[];
}

const STATUS_COLORS = {
  new: "hsl(210, 100%, 56%)",
  contacted: "hsl(32, 95%, 55%)",
  converted: "hsl(150, 60%, 45%)",
};

const barConfig: ChartConfig = {
  new: { label: "New", color: STATUS_COLORS.new },
  contacted: { label: "Contacted", color: STATUS_COLORS.contacted },
  converted: { label: "Converted", color: STATUS_COLORS.converted },
};

const lineConfig: ChartConfig = {
  leads: { label: "Leads", color: "hsl(210, 100%, 56%)" },
};

export function LeadCharts({ leads }: LeadChartsProps) {
  const statusData = useMemo(() => {
    const counts = { new: 0, contacted: 0, converted: 0 };
    leads.forEach((l) => counts[l.status]++);
    return [
      { status: "New", count: counts.new, fill: STATUS_COLORS.new },
      { status: "Contacted", count: counts.contacted, fill: STATUS_COLORS.contacted },
      { status: "Converted", count: counts.converted, fill: STATUS_COLORS.converted },
    ];
  }, [leads]);

  const pieData = useMemo(() => {
    const total = leads.length || 1;
    const counts = { new: 0, contacted: 0, converted: 0 };
    leads.forEach((l) => counts[l.status]++);
    return [
      { name: "New", value: counts.new, pct: Math.round((counts.new / total) * 100), fill: STATUS_COLORS.new },
      { name: "Contacted", value: counts.contacted, pct: Math.round((counts.contacted / total) * 100), fill: STATUS_COLORS.contacted },
      { name: "Converted", value: counts.converted, pct: Math.round((counts.converted / total) * 100), fill: STATUS_COLORS.converted },
    ];
  }, [leads]);

  const trendData = useMemo(() => {
    const end = new Date();
    const start = subDays(end, 29);
    const days = eachDayOfInterval({ start, end });
    const dayMap = new Map<string, number>();
    days.forEach((d) => dayMap.set(format(d, "yyyy-MM-dd"), 0));
    leads.forEach((l) => {
      const key = format(startOfDay(new Date(l.created_at)), "yyyy-MM-dd");
      if (dayMap.has(key)) dayMap.set(key, (dayMap.get(key) || 0) + 1);
    });
    let cumulative = 0;
    return days.map((d) => {
      const key = format(d, "yyyy-MM-dd");
      cumulative += dayMap.get(key) || 0;
      return { date: format(d, "MMM d"), count: dayMap.get(key) || 0, total: cumulative };
    });
  }, [leads]);

  const conversionRate = useMemo(() => {
    if (leads.length === 0) return 0;
    return Math.round((leads.filter((l) => l.status === "converted").length / leads.length) * 100);
  }, [leads]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Bar Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Leads by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barConfig} className="h-[220px] w-full">
            <BarChart data={statusData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 20%, 20%)" />
              <XAxis dataKey="status" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={48}>
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer config={barConfig} className="h-[220px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                strokeWidth={2}
                stroke="hsl(220, 28%, 12%)"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="flex flex-col gap-2 ml-2 shrink-0">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
                <span>{d.name}</span>
                <span className="font-semibold text-foreground">{d.pct}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Leads Over Time (30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineConfig} className="h-[220px] w-full">
            <LineChart data={trendData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 20%, 20%)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={6}
              />
              <YAxis allowDecimals={false} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(210, 100%, 56%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(210, 100%, 56%)" }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Conversion Rate */}
      <Card className="bg-card border-border flex flex-col items-center justify-center">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-sm font-medium text-foreground">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(220, 20%, 20%)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="hsl(150, 60%, 45%)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${conversionRate * 2.64} ${264 - conversionRate * 2.64}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{conversionRate}%</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>{leads.filter((l) => l.status === "converted").length} of {leads.length} converted</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
