import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLeadNotes, useCreateNote, type Lead } from "@/hooks/useLeads";
import { format } from "date-fns";
import { Send } from "lucide-react";

interface NotesPanelProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

export function NotesPanel({ lead, open, onClose }: NotesPanelProps) {
  const [content, setContent] = useState("");
  const { data: notes = [], isLoading } = useLeadNotes(lead?.id ?? null);
  const createNote = useCreateNote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !lead) return;
    createNote.mutate(
      { lead_id: lead.id, content: content.trim() },
      { onSuccess: () => setContent("") }
    );
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="bg-card border-border w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-foreground font-heading">
            Notes — {lead?.name}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a note or follow-up..."
            maxLength={1000}
            className="min-h-[60px] resize-none"
          />
          <Button type="submit" size="icon" disabled={createNote.isPending || !content.trim()} className="shrink-0 self-end">
            <Send className="h-4 w-4" />
          </Button>
        </form>

        <div className="flex-1 overflow-y-auto mt-4 space-y-3">
          {isLoading && <p className="text-muted-foreground text-sm">Loading notes...</p>}
          {!isLoading && notes.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-8">No notes yet for this lead.</p>
          )}
          {notes.map((note) => (
            <div key={note.id} className="rounded-lg bg-secondary/50 border border-border p-3">
              <p className="text-foreground text-sm whitespace-pre-wrap">{note.content}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {format(new Date(note.created_at), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
