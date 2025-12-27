import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success";
}

const variantStyles = {
  primary: "from-sky-500 to-blue-600 shadow-sky-300/50",
  secondary: "from-slate-500 to-slate-600 shadow-slate-300/50",
  success: "from-emerald-500 to-green-600 shadow-emerald-300/50",
};

const QuickActionButton = ({ icon: Icon, label, onClick, variant = "primary" }: QuickActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br text-white shadow-lg",
        "hover:scale-105 active:scale-95 transition-all duration-200",
        variantStyles[variant]
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default QuickActionButton;
