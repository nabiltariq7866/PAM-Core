import {
  LayoutDashboard,
  FileText,
  Users,
  ShieldCheck,
  Workflow,
  Sparkles,
  Building2,
  DollarSign,
} from "lucide-react";

export type IconName =
  | "dashboard"
  | "orders"
  | "users"
  | "panel"
  | "compliance"
  | "workspace"
  | "copilot"
  | "brand"
  | "savings";

export function NavIcon({ name, size = 18 }: { name: IconName; size?: number }) {
  const iconProps = { size, strokeWidth: 2 };

  switch (name) {
    case "dashboard":
      return <LayoutDashboard {...iconProps} />;
    case "orders":
      return <FileText {...iconProps} />;
    case "users":
    case "panel":
      return <Users {...iconProps} />;
    case "compliance":
      return <ShieldCheck {...iconProps} />;
    case "workspace":
      return <Workflow {...iconProps} />;
    case "copilot":
      return <Sparkles {...iconProps} />;
    case "brand":
      return <Building2 {...iconProps} />;
    case "savings":
      return <DollarSign {...iconProps} />;
    default:
      return <LayoutDashboard {...iconProps} />;
  }
}
