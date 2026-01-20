export default function Header() {
  return (
    <div className="header">
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <span className="brand">Guelph Co-op Hub</span>
        <span className="badge-brand">React • Firestore • DnD</span>
      </div>
    </div>
  );
}
