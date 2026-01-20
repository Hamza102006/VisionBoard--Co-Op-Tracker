import { useState } from "react";
import { STATUSES } from "../constants";
import { createApplication } from "../services/applications";

export default function ApplicationForm() {
  const [form, setForm] = useState({
    company: "", role: "", status: "Applied",
    source: "", deadline: "", next_step: "", notes: ""
  });
  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm(f => ({...f, [e.target.name]: e.target.value}));

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    await createApplication({
      ...form,
      deadline: form.deadline ? new Date(form.deadline) : null
    });
    setForm({ company:"", role:"", status:"Applied", source:"", deadline:"", next_step:"", notes:"" });
    setSaving(false);
  }

  return (
    <div className="card">
      <form onSubmit={onSubmit} className="form-grid">
        <div>
          <div className="label">Company</div>
          <input name="company" className="input" value={form.company} onChange={onChange} required/>
        </div>
        <div>
          <div className="label">Role</div>
          <input name="role" className="input" value={form.role} onChange={onChange} required/>
        </div>
        <div>
          <div className="label">Status</div>
          <select name="status" className="input" value={form.status} onChange={onChange}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div className="label">Deadline</div>
          <input name="deadline" type="date" className="input" value={form.deadline} onChange={onChange}/>
        </div>
        <div>
          <div className="label">Source</div>
          <input name="source" className="input" value={form.source} onChange={onChange} placeholder="LinkedIn, Handshake, referral…"/>
        </div>
        <div>
          <div className="label">Next Step</div>
          <input name="next_step" className="input" value={form.next_step} onChange={onChange} placeholder="Follow-up email, OA, etc."/>
        </div>
        <div className="form-grid-1" style={{gridColumn:"1 / -1"}}>
          <div className="label">Notes</div>
          <textarea name="notes" rows={3} className="input" value={form.notes} onChange={onChange} />
        </div>
        <div style={{gridColumn:"1 / -1", display:"flex", gap:8}}>
          <button className="btn" disabled={saving}>{saving ? "Saving…" : "Add Application"}</button>
          <span className="helper">New cards appear at the top</span>
        </div>
      </form>
    </div>
  );
}
