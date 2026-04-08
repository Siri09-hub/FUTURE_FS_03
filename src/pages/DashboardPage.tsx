import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CrmSidebar } from "@/components/crm/CrmSidebar";
import { LeadTable } from "@/components/crm/LeadTable";
import { LeadForm } from "@/components/crm/LeadForm";
import { NotesPanel } from "@/components/crm/NotesPanel";
import { StatsCards } from "@/components/crm/StatsCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead, type Lead } from "@/hooks/useLeads";
import { Plus, Search } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type LeadStatus = Database["public"]["Enums"]["lead_status"];

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

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.source.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this lead? This cannot be undone.")) {
      deleteLead.mutate(id);
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

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex gap-2 flex-1 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
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
                onDelete={handleDelete}
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
    </SidebarProvider>
  );
}
