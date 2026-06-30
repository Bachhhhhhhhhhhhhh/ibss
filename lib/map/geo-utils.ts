const R_KM = 6371;

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Quadratic arc for East-West corridor visualization */
export function corridorArc(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  bulge = 0.15,
  steps = 48
): [number, number][] {
  const points: [number, number][] = [];
  const midLat = (from.lat + to.lat) / 2;
  const midLng = (from.lng + to.lng) / 2;
  const dist = haversineKm(from.lat, from.lng, to.lat, to.lng);
  const lift = bulge * Math.min(18, dist / 800);
  const ctrlLat = midLat + lift;
  const ctrlLng = midLng + (to.lng - from.lng) * 0.08;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat =
      (1 - t) * (1 - t) * from.lat + 2 * (1 - t) * t * ctrlLat + t * t * to.lat;
    const lng =
      (1 - t) * (1 - t) * from.lng + 2 * (1 - t) * t * ctrlLng + t * t * to.lng;
    points.push([lat, lng]);
  }
  return points;
}