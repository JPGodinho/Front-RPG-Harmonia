export function formatarDataFirebase(timestamp: { seconds: number; nanos: number }) {
  if (!timestamp) return "Data desconhecida";

  const data = new Date(timestamp.seconds * 1000);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(data);
}