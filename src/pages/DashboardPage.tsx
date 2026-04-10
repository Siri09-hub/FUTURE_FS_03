import { useState, useMemo } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CrmSidebar } from "@/components/crm/CrmSidebar";
import { LeadTable } from "@/components/crm/LeadTable";
import { LeadForm } from "@/components/crm/LeadForm";
import { NotesPanel } from "@/components/crm/NotesPanel";
import { StatsCards } from "@/components/crm/StatsCards";
import { LeadCharts } from "@/components/crm/LeadCharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead, type Lead } from "@/hooks/useLeads";
import { Plus, Search, ArrowUpDown } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type LeadStatus = Database["public"]["Enums"]["lead_status"];
type SortOption = "name-asc" | "name-desc" | "date-newest" | "date-oldest";

export default function DashboardPage() {
  const { data: leads = [], isLoading } = useLeads();
  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();

  const [formOpen, setFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [notesLead, setNotesLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-newest");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredLeads = useMemo(() => {
    let result = leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.source.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "date-oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "date-newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return result;
  }, [leads, search, statusFilter, sortBy]);

  const handleSubmit = (data: { name: string; email: string; source: string; status: LeadStatus }) => {
    if (editingLead) {
      updateLead.mutate({ id: editingLead.id, ...data }, {
        onSuccess: () => { setFormOpen(false); setEditingLead(null); },
      });
    } else {
      createLead.mutate(data, {
        onSuccess: () => setFormOpen(false),
      });
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteLead.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <CrmSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center gap-4 border-b border-border px-4 lg:px-6">
            <SidebarTrigger />
            <h1 className="text-lg font-heading font-bold text-foreground">Dashboard</h1>
          </header>

          <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
            <StatsCards leads={leads} />
            <LeadCharts leads={leads} />

            {/* Lead management controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex gap-2 flex-1 w-full sm:w-auto flex-wrap">
                <div className="relative flex-1 min-w-[180px] max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[160px]">
                    <ArrowUpDown className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-newest">Newest First</SelectItem>
                    <SelectItem value="date-oldest">Oldest First</SelectItem>
                    <SelectItem value="name-asc">Name A–Z</SelectItem>
                    <SelectItem value="name-desc">Name Z–A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => { setEditingLead(null); setFormOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" /> Add Lead
              </Button>
            </div>

            {isLoading ? (
              <p className="text-muted-foreground text-center py-12">Loading leads...</p>
            ) : (
              <LeadTable
                leads={filteredLeads}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteId(id)}
                onViewNotes={(lead) => setNotesLead(lead)}
              />
            )}
          </main>
        </div>
      </div>

      <LeadForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingLead(null); }}
        onSubmit={handleSubmit}
        lead={editingLead}
        loading={createLead.isPending || updateLead.isPending}
      />

      <NotesPanel
        lead={notesLead}
        open={!!notesLead}
        onClose={() => setNotesLead(null)}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Lead</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this lead and all associated notes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
