export default function ServiceCard({ title, description, badge }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{title}</h3>
        {badge ? (
          <span className="text-xs rounded-full bg-slate-100 px-2 py-1 text-slate-700">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}