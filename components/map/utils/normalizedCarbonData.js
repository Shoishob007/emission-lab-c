export default function normalizeCarbonData(raw) {
    if (!raw || typeof raw !== "object") return {};
  
    const out = {};
  
    Object.entries(raw).forEach(([code, entry]) => {
      const rows = (entry?.data || [])
        .map((d) => {
          // Normalize year -> number (remove stray whitespace/commas)
          const yearRaw = d?.year;
          const year =
            typeof yearRaw === "number"
              ? yearRaw
              : typeof yearRaw === "string"
              ? Number(yearRaw.replace(/[,\s]/g, ""))
              : null;
  
          // Normalize emission -> number or null (strip commas)
          const emissionRaw = d?.emission;
          const emission =
            emissionRaw == null || emissionRaw === ""
              ? null
              : Number(String(emissionRaw).replace(/,/g, ""));
  
          return {
            ...d,
            year,
            emission: Number.isFinite(emission) ? emission : null,
          };
        })
        // drop rows without valid year
        .filter((r) => r.year != null && !Number.isNaN(r.year))
        // sort by year ascending
        .sort((a, b) => a.year - b.year);
  
      const latestRow = rows.length ? rows[rows.length - 1] : null;
      out[code] = {
        ...entry,
        data: rows,
        latestEmission: latestRow?.emission ?? null,
        latestYear: latestRow?.year ?? entry?.latestYear ?? null,
      };
    });
  
    return out;
  }