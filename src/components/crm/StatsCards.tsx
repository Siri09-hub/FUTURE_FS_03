import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, PhoneCall, CheckCircle } from "lucide-react";
import type { Lead } from "@/hooks/useLeads";

interface StatsCardsProps {
  leads: Lead[];
}

export function StatsCards({ leads }: StatsCardsProps) {
  const total = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const convertedCount = leads.filter((l) => l.status === "converted").length;

  const stats = [
    { label: "Total Leads", value: total, icon: Users, color: "text-primary" },
    { label: "New", value: newCount, icon: UserPlus, color: "text-primary" },
    { label: "Contacted", value: contactedCount, icon: PhoneCall, color: "text-accent" },
    { label: "Converted", value: convertedCount, icon: CheckCircle, color: "text-emerald-400" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label} className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-secondary ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
