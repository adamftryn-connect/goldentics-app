const CHART = {
  width: 860,
  height: 240,
  padLeft: 44,
  padRight: 12,
  padTop: 20,
  padBottom: 24,
};

function formatYAxisLabel(value) {
  return (value / 1_000_000).toFixed(2);
}

function formatXLabel(dateStr) {
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export function buildGoldLineChart(history) {
  if (!Array.isArray(history) || history.length === 0) {
    return null;
  }

  const closes = history.map((row) => row.closePrice ?? row.price);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const range = max - min || 1;
  const plotW = CHART.width - CHART.padLeft - CHART.padRight;
  const plotH = CHART.height - CHART.padTop - CHART.padBottom;
  const n = history.length;

  const points = history.map((row, i) => {
    const price = row.closePrice ?? row.price;
    const x =
      CHART.padLeft + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
    const y =
      CHART.padTop + plotH - ((price - min) / range) * plotH;
    return { x, y, row, price };
  });

  const lineD = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const bottom = CHART.padTop + plotH;
  const areaD = `${lineD} L${points[n - 1].x.toFixed(1)},${bottom} L${points[0].x.toFixed(1)},${bottom} Z`;

  const yTicks = [0, 0.33, 0.66, 1].map((t) => {
    const value = min + range * (1 - t);
    const y = CHART.padTop + plotH * t;
    return { value, label: formatYAxisLabel(value), y };
  });

  const xLabelIndexes =
    n <= 1
      ? [0]
      : n <= 4
        ? history.map((_, i) => i)
        : [0, Math.floor((n - 1) / 2), n - 1];

  const xLabels = xLabelIndexes.map((i) => ({
    x: points[i].x,
    label: formatXLabel(history[i].date),
  }));

  return {
    ...CHART,
    points,
    lineD,
    areaD,
    yTicks,
    xLabels,
    lastPoint: points[n - 1],
    min,
    max,
  };
}

export function computePeriodSummary(history) {
  if (!Array.isArray(history) || history.length === 0) return null;

  const first = history[0];
  const last = history[history.length - 1];
  const open = first.openPrice ?? first.price;
  const close = last.closePrice ?? last.price;
  const high = Math.max(...history.map((r) => r.highPrice ?? r.price));
  const low = Math.min(...history.map((r) => r.lowPrice ?? r.price));
  const change = close - open;
  const changePct = open ? (change / open) * 100 : 0;

  return { open, close, high, low, change, changePct };
}

export function formatGoldDateId(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(`${String(dateStr).slice(0, 10)}T12:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
