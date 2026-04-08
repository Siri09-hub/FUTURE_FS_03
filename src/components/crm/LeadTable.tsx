import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, StickyNote } from "lucide-react";
import type { Lead } from "@/hooks/useLeads";
import { format } from "date-fns";

const statusConfig = {
  new: { label: "New", className: "bg-primary/20 text-primary border-primary/30" },
  contacted: { label: "Contacted", className: "bg-accent/20 text-accent border-accent/30" },
  converted: { label: "Converted", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
};

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onViewNotes: (lead: Lead) => void;
}

export function LeadTable({ leads, onEdit, onDelete, onViewNotes }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-lg">No leads yet</p>
        <p className="text-sm">Add your first lead to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="text-foreground font-semibold">Name</TableHead>
            <TableHead className="text-foreground font-semibold">Email</TableHead>
            <TableHead className="text-foreground font-semibold">Source</TableHead>
            <TableHead className="text-foreground font-semibold">Status</TableHead>
            <TableHead className="text-foreground font-semibold">Created</TableHead>
            <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const sc = statusConfig[lead.status];
            return (
              <TableRow key={lead.id} className="hover:bg-secondary/30">
                <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                <TableCell className="text-muted-foreground">{lead.source || "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={sc.className}>
                    {sc.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {format(new Date(lead.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onViewNotes(lead)} title="Notes">
                      <StickyNote className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(lead)} title="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(lead.id)} className="hover:text-destructive" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
