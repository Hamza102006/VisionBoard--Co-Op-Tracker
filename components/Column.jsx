import { Droppable, Draggable } from "@hello-pangea/dnd";
import ApplicationCard from "./ApplicationCard.jsx";

export default function Column({ statusKey, title, items, onMove, onDelete, isDraggingOver }) {
  return (
    <div className="col">
      <div className="sticky-actions">
        <h3>{title} • {items.length}</h3>
      </div>

      <Droppable droppableId={statusKey}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`dropzone ${snapshot.isDraggingOver ? "dragging" : ""}`}
          >
            {items.map((app, index) => (
              <Draggable draggableId={app.id} index={index} key={app.id}>
                {(prov) => (
                  <ApplicationCard
                    app={app}
                    onMove={onMove}
                    onDelete={onDelete}
                    innerRef={prov.innerRef}
                    draggableProps={prov.draggableProps}
                    dragHandleProps={prov.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
