import { format } from "date-fns";
import { STATUSES } from "../constants";
import { motion } from "framer-motion";

export default function ApplicationCard({ app, onMove, onDelete, dragHandleProps, draggableProps, innerRef }) {
  const idx = STATUSES.indexOf(app.status);
  const canLeft = idx > 0;
  const canRight = idx < STATUSES.length - 1;

  const deadlineText = app.deadline?.toDate ? format(app.deadline.toDate(), "yyyy-MM-dd")
                     : app.deadline instanceof Date ? format(app.deadline, "yyyy-MM-dd")
                     : "";

  return (
    <motion.div
      className="item"
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      initial={{opacity:0, y:8, scale:.98}}
      animate={{opacity:1, y:0, scale:1}}
      transition={{type:"spring", stiffness:320, damping:26, mass:.6}}
      whileHover={{scale:1.01}}
    >
      <div className="title">{app.company}</div>
      <div className="sub">{app.role}</div>
      <div className="footer" style={{justifyContent:"space-between"}}>
        <span className="badge">{app.source || "—"}</span>
        <span className="badge">{deadlineText || "No deadline"}</span>
      </div>
      <div className="footer">
        <button className="btn secondary" disabled={!canLeft} onClick={()=>onMove(app, -1)}>⟵</button>
        <button className="btn secondary" disabled={!canRight} onClick={()=>onMove(app, +1)}>⟶</button>
        <button className="btn danger" onClick={()=>onDelete(app.id)}>Delete</button>
      </div>
      {app.next_step ? <div className="helper" style={{marginTop:6}}>Next: {app.next_step}</div> : null}
    </motion.div>
  );
}
