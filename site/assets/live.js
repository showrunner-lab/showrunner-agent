// Live market data for the official coin, read from DexScreener's public API.
// Display only: the site never comments on price.
(async () => {
  const box = document.getElementById("live");
  if (!box) return;
  const ca = box.dataset.ca;
  const status = document.getElementById("live-status");
  const usd = (n) =>
    n == null ? "n/a" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${encodeURIComponent(ca)}`);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    const pairs = (data.pairs || []).sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
    if (!pairs.length) {
      status.textContent = "No market data available for this contract yet.";
      return;
    }
    const p = pairs[0];
    document.getElementById("mc").textContent = usd(p.marketCap ?? p.fdv);
    document.getElementById("liq").textContent = usd(p.liquidity?.usd);
    document.getElementById("vol").textContent = usd(p.volume?.h24);
    document.getElementById("live-data").hidden = false;
    status.innerHTML = `Main pair on DexScreener: <a href="${p.url}" rel="noopener">open</a>`;
  } catch (e) {
    status.textContent = "Live data unavailable right now.";
  }
})();
