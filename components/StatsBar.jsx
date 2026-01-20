export default function StatsBar({ apps }) {
  const t = (k) => apps.filter(a => a.status === k).length;
  const total = apps.length;
  const blocks = [
    { k:"Applied", v:t("Applied") },
    { k:"Interviewing", v:t("Interviewing") },
    { k:"Offer", v:t("Offer") },
    { k:"Rejected", v:t("Rejected") }
  ];
  return (
    <div className="stats">
      {blocks.map(b => (
        <div key={b.k} className="stat">
          <div className="k">{b.v}</div>
          <div className="l">{b.k}</div>
        </div>
      ))}
      {total === 0 && <div className="helper">Add your first application to see stats.</div>}
    </div>
  );
}
