import { ReactNode } from "react";

interface HeaderRootProps {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function HeaderRoot({ left, right, children, className = "" }: HeaderRootProps) {
  return (
    <header className={`flex flex-col gap-4 mb-5 ${className}`}>
      <div className="flex items-center justify-between w-full">
        
        <div className="flex items-center gap-4">
          {left && (
            <div className="shrink-0">
              {left}
            </div>
          )}
          
          <div className="text-2xl font-bold">
            {children}
          </div>
        </div>

        <div className="ml-4 md:items-end">
          {right}
        </div>

      </div>
    </header>
  );
}