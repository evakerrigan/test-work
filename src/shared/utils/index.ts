export const formatIsoToDDMMYYYY = (iso: string): string => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
};

export const parseDDMMYYYYToIso = (date: string): string => {
  // 03.12.2024 or 03/12/2024
  const parts = date.trim().replace(/\//g, '.').split('.');
  if (parts.length !== 3) return new Date(date).toISOString();
  const [dd, mm, yyyy] = parts.map((p) => parseInt(p, 10));
  const d = new Date(Date.UTC(yyyy, (mm || 1) - 1, dd || 1, 0, 0, 0));
  return d.toISOString();
};

export const companyTypeCodeToLabel = (code: string): string =>
  code.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
