export const SeccaoTexto = ({ titulo, texto }: { titulo: string, texto: string }) => (
    <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="text-white font-bold text-base mb-1">{titulo}</h3>
      <div className="h-px w-full bg-harmonia-purple/50 mb-3 shadow-[0_0_5px_rgba(227,0,255,0.3)]" />
      <p className="text-gray-300 text-sm leading-relaxed text-justify whitespace-pre-line">
        {texto || "Não informado."}
      </p>
    </div>
  );