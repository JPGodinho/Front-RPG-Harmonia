import { ReactNode } from "react";

interface InfoDisplayProps {
  label: string;
  children: ReactNode;
  variant?: "default" | "small";
  className?: string;
}

export function InfoDisplay({ 
  label, 
  children, 
  variant = "default", 
  className = "" 
}: InfoDisplayProps) {

  const styles = {
    default: {
      label: "text-[10px] md:text-xs text-gray-400 uppercase tracking-wider",
      value: "text-base md:text-lg font-bold text-white"
    },
    small: {
      label: "text-[10px] text-gray-500 uppercase tracking-wider",
      value: "text-sm font-semibold text-gray-200"
    }
  };

  const currentStyle = styles[variant];

  return (
    <div className={`flex flex-col ${className}`}>
      <span className={currentStyle.label}>{label}</span>
      <span className={currentStyle.value}>
        {children}
      </span>
    </div>
  );
}