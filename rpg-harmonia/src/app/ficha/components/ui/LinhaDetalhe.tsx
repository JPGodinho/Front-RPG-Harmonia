export const LinhaDetalhe = ({ label, valor, destaque = false }: { label: string, valor: string | number | null, destaque?: boolean }) => {
    if (!valor) return null;
    return (
      <div className="flex gap-1">
        <strong className={`${destaque ? "text-red-500" : "text-white"}`}>{label}:</strong>
        <span className={`${destaque ? "text-red-400 font-bold" : "text-gray-400"}`}>{valor}</span>
      </div>
    );
};