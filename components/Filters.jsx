import { STATUSES } from "../constants";

export default function Filters({ q, setQ, status, setStatus }) {
  return (
    <div className="card" style={{marginBottom:12}}>
      <div className="grid cols-3">
        <div>
          <div className="label">Search</div>
          <input className="input" placeholder="Company or role…" value={q} onChange={(e)=>setQ(e.target.value)} />
        </div>
        <div>
          <div className="label">Status</div>
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className="input">
            <option value="All">All</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div className="label">Tip</div>
          <div className="helper">Click ⟶/⟵ on a card to move stages</div>
        </div>
      </div>
    </div>
  );
}
