// Server component: renders a horizontal pipeline diagram as inline SVG.
export default function ArchDiagram({ nodes, title }: { nodes: string[]; title: string }) {
  const boxW = 150, boxH = 46, gap = 44, pad = 16;
  const w = pad * 2 + nodes.length * boxW + (nodes.length - 1) * gap;
  const h = boxH + pad * 2;
  const midY = h / 2;

  return (
    <svg className="arch-svg" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title}>
      <title>{title}</title>
      {nodes.map((label, i) => {
        const x = pad + i * (boxW + gap);
        return (
          <g key={label}>
            <rect x={x} y={pad} width={boxW} height={boxH} rx="9" fill="none" stroke="currentColor" strokeOpacity="0.25" />
            <text x={x + boxW / 2} y={midY + 4} textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.85">
              {label}
            </text>
            {i < nodes.length - 1 && (
              <g stroke="#c9a227" strokeWidth="1.5">
                <line x1={x + boxW + 6} y1={midY} x2={x + boxW + gap - 12} y2={midY} />
                <path d={`M ${x + boxW + gap - 12} ${midY - 4} l 7 4 l -7 4`} fill="none" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
