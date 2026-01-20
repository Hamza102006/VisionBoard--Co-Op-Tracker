import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { searchJobs } from "../services/jobs";

const DEFAULT_COMPANIES = [
  "shopify", "square", "reddit", "stripe", "databricks", "doordash"
];

const PAGE_SIZE = 12;

export default function JobsPanel() {
  const [q, setQ] = useState("intern strategy OR product");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);

  async function run() {
    setLoading(true);
    const data = await searchJobs({ query: q, companies: DEFAULT_COMPANIES });
    setRows(data);
    setPage(1);               // reset to first page after new search
    setLoading(false);
  }

  useEffect(() => { run(); }, []);

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = Math.min(startIdx + PAGE_SIZE, total);

  const pageRows = useMemo(
    () => rows.slice(startIdx, endIdx),
    [rows, startIdx, endIdx]
  );

  function go(to) {
    const next = Math.min(Math.max(to, 1), totalPages);
    setPage(next);
  }

  // show a compact window of page numbers (e.g., 1 … 4 5 6 … N)
  const pageWindow = useMemo(() => {
    const windowSize = 5;
    let start = Math.max(1, page - Math.floor(windowSize / 2));
    let end = Math.min(totalPages, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  return (
    <div className="card">
      <div style={{display:"flex", gap:10, alignItems:"center", marginBottom:12}}>
        <h2 style={{margin:0}}>Live Jobs</h2>
        <div style={{marginLeft:"auto", display:"flex", gap:8}}>
          <input
            className="input"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="e.g., intern, strategy, product"
            onKeyDown={(e)=>{ if (e.key === "Enter") run(); }}
          />
          <button className="btn secondary" onClick={run} disabled={loading}>
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
      </div>

      {/* Count + range */}
      <div className="helper" style={{marginBottom:10}}>
        {total ? `${startIdx + 1}–${endIdx} of ${total} results` : "No results yet"}
      </div>

      <div className="grid" style={{gridTemplateColumns:"repeat(3,1fr)", gap:14}}>
        {pageRows.map(j => (
          <motion.a
            href={j.url} target="_blank" rel="noreferrer" key={j.id}
            className="item" style={{textDecoration:"none"}}
            initial={{opacity:0, y:6}} animate={{opacity:1, y:0}}
            whileHover={{scale:1.01}}
          >
            <div className="title">{j.title}</div>
            <div className="sub">{j.company}</div>
            <div className="footer" style={{justifyContent:"space-between"}}>
              <span className="badge">{j.source}</span>
              <span className="badge">{j.location || "—"}</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pager">
          <button className="page-btn" disabled={page === 1} onClick={()=>go(1)}>First</button>
          <button className="page-btn" disabled={page === 1} onClick={()=>go(page - 1)}>Prev</button>

          {/* leading ellipsis */}
          {pageWindow[0] > 1 && (
            <>
              <button className="page-number" onClick={()=>go(1)}>1</button>
              <span className="page-ellipsis">…</span>
            </>
          )}

          {pageWindow.map(n => (
            <button
              key={n}
              className={`page-number ${n === page ? "active" : ""}`}
              onClick={()=>go(n)}
            >
              {n}
            </button>
          ))}

          {/* trailing ellipsis */}
          {pageWindow[pageWindow.length - 1] < totalPages && (
            <>
              <span className="page-ellipsis">…</span>
              <button className="page-number" onClick={()=>go(totalPages)}>{totalPages}</button>
            </>
          )}

          <button className="page-btn" disabled={page === totalPages} onClick={()=>go(page + 1)}>Next</button>
          <button className="page-btn" disabled={page === totalPages} onClick={()=>go(totalPages)}>Last</button>
        </div>
      )}
    </div>
  );
}
