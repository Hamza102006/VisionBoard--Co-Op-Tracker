import { STATUSES } from "../constants";
import Column from "./Column.jsx";
import { DragDropContext } from "@hello-pangea/dnd";
import { updateApplication } from "../services/applications";

export default function KanbanBoard({ apps, onMove, onDelete }) {
  const byStatus = Object.fromEntries(STATUSES.map(s => [s, []]));
  apps.forEach(a => { if (byStatus[a.status]) byStatus[a.status].push(a); });

  async function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const from = source.droppableId;
    const to = destination.droppableId;
    if (from === to) return; // ignore re-order for now (Firestore list is time-ordered)

    // find dragged card
    const dragged = apps.find(a => a.id === draggableId);
    if (!dragged) return;

    // Move to target column (update status)
    await updateApplication(dragged.id, { status: to });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kb">
        {STATUSES.map(s => (
          <Column
            key={s}
            statusKey={s}
            title={s}
            items={byStatus[s]}
            onMove={onMove}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
