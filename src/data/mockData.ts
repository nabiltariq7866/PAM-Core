import type { IconName } from "@/components/NavIcon";

export interface AppraisalOrder {
  id: string;
  borrower: string;
  address: string;
  county: string;
  state: string;
  status:
    | "New"
    | "Pending Assignment"
    | "Accepted"
    | "Inspection Scheduled"
    | "Report In Progress"
    | "QC Review"
    | "Revision Requested"
    | "Final Delivered"
    | "Completed";
  loanAmount: number;
  appraiserName?: string;
  turnTimeRisk: "Low" | "Medium" | "High";
  estimatedSavings: number;
  missingData?: string[];
  valuationRisk: "Normal" | "Elevated" | "High";
  investorReady: boolean;
  rovRequested: boolean;
}

export const mockOrders: AppraisalOrder[] = [
  {
    id: "PAM-2026-001",
    borrower: "John Doe",
    address: "742 Evergreen Terrace, Springfield",
    county: "Clark County",
    state: "IL",
    status: "New",
    loanAmount: 420000,
    turnTimeRisk: "High",
    estimatedSavings: 350,
    missingData: ["Missing Access Instructions", "Incomplete Sales Contract Pages"],
    valuationRisk: "Normal",
    investorReady: false,
    rovRequested: false,
  },
  {
    id: "PAM-2026-002",
    borrower: "Sarah Jenkins",
    address: "1012 Ocean Drive, Miami",
    county: "Miami-Dade",
    state: "FL",
    status: "QC Review",
    loanAmount: 850000,
    appraiserName: "Robert Long, Certified Res",
    turnTimeRisk: "Low",
    estimatedSavings: 520,
    valuationRisk: "High",
    investorReady: false,
    rovRequested: false,
  },
  {
    id: "PAM-2026-003",
    borrower: "Michael Chang",
    address: "441 Rural Route 9, Lancaster",
    county: "Lancaster County",
    state: "PA",
    status: "Revision Requested",
    loanAmount: 290000,
    appraiserName: "David Vance, Residential",
    turnTimeRisk: "High",
    estimatedSavings: 280,
    valuationRisk: "Normal",
    investorReady: false,
    rovRequested: true,
  },
  {
    id: "PAM-2026-004",
    borrower: "Emily Rodriguez",
    address: "567 Pine Street, Austin",
    county: "Travis County",
    state: "TX",
    status: "Inspection Scheduled",
    loanAmount: 510000,
    appraiserName: "Lisa Martinez, SRA",
    turnTimeRisk: "Low",
    estimatedSavings: 410,
    valuationRisk: "Normal",
    investorReady: true,
    rovRequested: false,
  },
  {
    id: "PAM-2026-005",
    borrower: "James Wilson",
    address: "890 Oak Avenue, Denver",
    county: "Denver County",
    state: "CO",
    status: "Pending Assignment",
    loanAmount: 675000,
    turnTimeRisk: "Medium",
    estimatedSavings: 390,
    valuationRisk: "Elevated",
    investorReady: false,
    rovRequested: false,
  },
];

export const mockKpis = {
  activeOrders: 150,
  atRiskOrders: 12,
  revisionHeavyFiles: 5,
  limitedCoverageCounties: 3,
  totalBorrowerSavings: 142500,
  avgTurnTimeDays: 6.2,
  airComplianceScore: 100,
};

export interface NavItem {
  id: string;
  label: string;
  icon: IconName;
  group: string;
  slug: string;
}

export type SessionUser = {
  id: string;
  name: string;
  role: "admin" | "lender" | "appraiser" | "compliance";
  avatar: string;
  email: string;
  redirectTo: string;
};

export const DEMO_USERS: SessionUser[] = [
  {
    id: "admin",
    name: "PAM Executive",
    role: "admin",
    avatar: "PE",
    email: "executive@pamvalue.com",
    redirectTo: "/admin/overview",
  },
  {
    id: "lender",
    name: "Lender Appraisal Desk",
    role: "lender",
    avatar: "LD",
    email: "appraisal@lenderbank.com",
    redirectTo: "/lender/dashboard",
  },
  {
    id: "appraiser",
    name: "Certified Appraiser",
    role: "appraiser",
    avatar: "CA",
    email: "appraiser@pamvalue.com",
    redirectTo: "/appraiser/workspace",
  },
  {
    id: "compliance",
    name: "Compliance Officer",
    role: "compliance",
    avatar: "CO",
    email: "compliance@pamvalue.com",
    redirectTo: "/compliance/audit",
  },
];

export const NAV_ITEMS_ADMIN: NavItem[] = [
  { id: "overview", label: "Executive Overview", icon: "dashboard", group: "Command Center", slug: "overview" },
  { id: "lenders", label: "Lender Clients", icon: "users", group: "Platform", slug: "lenders" },
  { id: "revenue", label: "Revenue Analytics", icon: "dashboard", group: "Platform", slug: "revenue" },
  { id: "panel", label: "Appraiser Network", icon: "users", group: "Operations", slug: "panel" },
  { id: "compliance", label: "Compliance Engine", icon: "compliance", group: "Governance", slug: "compliance" },
  { id: "activity", label: "Activity Log", icon: "dashboard", group: "Operations", slug: "activity" },
];

export const NAV_ITEMS_LENDER: NavItem[] = [
  { id: "dashboard", label: "Lender Dashboard", icon: "dashboard", group: "Operations", slug: "dashboard" },
  { id: "orders", label: "Orders & Intake", icon: "orders", group: "Operations", slug: "orders" },
  { id: "savings", label: "Borrower Savings", icon: "savings", group: "Operations", slug: "savings" },
  { id: "panel", label: "Panel Management", icon: "users", group: "Operations", slug: "panel" },
  { id: "compliance", label: "Compliance & Audit", icon: "compliance", group: "Governance", slug: "compliance" },
];

export const NAV_ITEMS_APPRAISER: NavItem[] = [
  { id: "workspace", label: "Appraiser Workspace", icon: "workspace", group: "My Orders", slug: "workspace" },
];

export const NAV_ITEMS_COMPLIANCE: NavItem[] = [
  { id: "audit", label: "Audit Trail Hub", icon: "compliance", group: "Governance", slug: "audit" },
  { id: "air", label: "AIR Compliance", icon: "compliance", group: "Governance", slug: "air" },
];

// Mock chart data
export const orderPipelineData = [
  { name: "New", orders: 22, fill: "#f59e0b" },
  { name: "Pending", orders: 18, fill: "#6366f1" },
  { name: "Accepted", orders: 25, fill: "#10b981" },
  { name: "Inspection", orders: 15, fill: "#06b6d4" },
  { name: "In Progress", orders: 20, fill: "#8b5cf6" },
  { name: "QC Review", orders: 16, fill: "#f97316" },
  { name: "Revision", orders: 10, fill: "#ef4444" },
  { name: "Delivered", orders: 34, fill: "#10b981" },
];

export const turnTimeTrendData = [
  { month: "Jan", avgDays: 8.2 },
  { month: "Feb", avgDays: 7.8 },
  { month: "Mar", avgDays: 7.5 },
  { month: "Apr", avgDays: 7.2 },
  { month: "May", avgDays: 6.8 },
  { month: "Jun", avgDays: 6.2 },
];

export const savingsComparisonData = [
  { name: "Jan", pam: 45000, traditional: 62000 },
  { name: "Feb", pam: 52000, traditional: 73000 },
  { name: "Mar", pam: 48000, traditional: 65000 },
  { name: "Apr", pam: 61000, traditional: 85000 },
  { name: "May", pam: 55000, traditional: 76000 },
  { name: "Jun", pam: 58000, traditional: 80000 },
];

export const appraiserPerformanceData = [
  { name: "Robert Long", turnTime: 5.8, acceptance: 92, revision: 4 },
  { name: "Lisa Martinez", turnTime: 6.1, acceptance: 95, revision: 3 },
  { name: "David Vance", turnTime: 7.2, acceptance: 88, revision: 8 },
  { name: "Sarah Kim", turnTime: 5.9, acceptance: 94, revision: 5 },
  { name: "Mike Johnson", turnTime: 6.5, acceptance: 90, revision: 6 },
];

export const lenderVolumeData = [
  { name: "First National", orders: 120, savings: 18500 },
  { name: "Community Bank", orders: 95, savings: 14200 },
  { name: "West Coast Lending", orders: 160, savings: 24500 },
  { name: "Midwest Mortgage", orders: 85, savings: 12800 },
  { name: "Sunrise Finance", orders: 110, savings: 16700 },
];

export interface AuditLogEntry {
  id: string;
  orderId: string;
  action: string;
  user: string;
  timestamp: string;
  status: "Success" | "Warning" | "Error";
  details: string;
}

export const auditLogEntries: AuditLogEntry[] = [
  { id: "AUD-001", orderId: "PAM-2026-001", action: "Appraiser Assigned", user: "Lender Appraisal Desk", timestamp: "2026-06-23 09:15:22", status: "Success", details: "Robert Long assigned via AIR rotation" },
  { id: "AUD-002", orderId: "PAM-2026-002", action: "Inspection Scheduled", user: "Robert Long", timestamp: "2026-06-23 08:42:11", status: "Success", details: "Scheduled for June 24 at 10:00 AM" },
  { id: "AUD-003", orderId: "PAM-2026-003", action: "Revision Requested", user: "QC Reviewer", timestamp: "2026-06-22 16:30:05", status: "Warning", details: "Missing comparable #3 photo" },
  { id: "AUD-004", orderId: "PAM-2026-004", action: "Report Delivered", user: "Lisa Martinez", timestamp: "2026-06-22 14:20:18", status: "Success", details: "Final report uploaded, QC passed" },
  { id: "AUD-005", orderId: "PAM-2026-005", action: "Order Created", user: "Loan Officer - John Smith", timestamp: "2026-06-22 10:05:43", status: "Success", details: "New order from LOS import" },
];

export interface AirComplianceEvent {
  id: string;
  type: "Rotation" | "Firewall" | "Override" | "Expired";
  description: string;
  date: string;
  status: "Compliant" | "Warning" | "Exception";
}

export const airComplianceEvents: AirComplianceEvent[] = [
  { id: "AIR-001", type: "Rotation", description: "AIR rotation: Robert Long selected for PAM-2026-001", date: "2026-06-23", status: "Compliant" },
  { id: "AIR-002", type: "Firewall", description: "Loan Officer blocked from appraiser selection", date: "2026-06-22", status: "Compliant" },
  { id: "AIR-003", type: "Override", description: "Manual override used (compliance reason documented)", date: "2026-06-21", status: "Warning" },
  { id: "AIR-004", type: "Expired", description: "Appraiser credential expired - removed from rotation", date: "2026-06-20", status: "Compliant" },
];

export interface RevenueEntry {
  month: string;
  revenue: number;
  orders: number;
  lenders: number;
}

export const revenueData: RevenueEntry[] = [
  { month: "Jan", revenue: 65000, orders: 115, lenders: 8 },
  { month: "Feb", revenue: 72000, orders: 127, lenders: 9 },
  { month: "Mar", revenue: 68000, orders: 120, lenders: 9 },
  { month: "Apr", revenue: 78000, orders: 138, lenders: 10 },
  { month: "May", revenue: 82000, orders: 145, lenders: 11 },
  { month: "Jun", revenue: 85400, orders: 150, lenders: 12 },
];

export interface AppraiserNetworkEntry {
  id: string;
  name: string;
  license: string;
  counties: string[];
  performance: number;
  status: "Active" | "Onboarding" | "Inactive" | "Suspended";
  orders: number;
  avgTurnTime: number;
}

export const appraiserNetwork: AppraiserNetworkEntry[] = [
  { id: "APP-001", name: "Robert Long", license: "Certified Residential Appraiser", counties: ["Cook", "DuPage"], performance: 92, status: "Active", orders: 156, avgTurnTime: 5.8 },
  { id: "APP-002", name: "Lisa Martinez", license: "SRA - Senior Residential Appraiser", counties: ["Los Angeles", "Orange"], performance: 95, status: "Active", orders: 210, avgTurnTime: 6.1 },
  { id: "APP-003", name: "David Vance", license: "Residential Appraiser", counties: ["Cook"], performance: 88, status: "Active", orders: 105, avgTurnTime: 7.2 },
  { id: "APP-004", name: "Sarah Kim", license: "Certified Residential Appraiser", counties: ["San Diego", "Riverside"], performance: 94, status: "Active", orders: 132, avgTurnTime: 5.9 },
  { id: "APP-005", name: "Mike Johnson", license: "Residential Appraiser", counties: ["Cook", "Lake"], performance: 90, status: "Onboarding", orders: 45, avgTurnTime: 6.5 },
];

export interface ActivityLogEntry {
  id: string;
  type: "Order" | "User" | "System" | "Compliance";
  action: string;
  user: string;
  timestamp: string;
}

export const activityLogEntries: ActivityLogEntry[] = [
  { id: "ACT-001", type: "Order", action: "New order PAM-2026-005 created", user: "John Smith (LO)", timestamp: "2026-06-23 10:30:00" },
  { id: "ACT-002", type: "User", action: "Lender user logged in", user: "Lender Appraisal Desk", timestamp: "2026-06-23 09:00:00" },
  { id: "ACT-003", type: "System", action: "Daily QC batch completed", user: "System", timestamp: "2026-06-23 00:15:00" },
  { id: "ACT-004", type: "Compliance", action: "AIR rotation executed", user: "System", timestamp: "2026-06-23 09:15:22" },
  { id: "ACT-005", type: "Order", action: "Report delivered for PAM-2026-004", user: "Lisa Martinez", timestamp: "2026-06-22 14:20:18" },
];

export interface ComplianceException {
  id: string;
  orderId: string;
  type: "Missing Data" | "QC Issue" | "Expired Credential" | "Turn Time Risk";
  severity: "High" | "Medium" | "Low";
  description: string;
  status: "Open" | "In Review" | "Resolved";
  date: string;
}

export const complianceExceptions: ComplianceException[] = [
  { id: "EXC-001", orderId: "PAM-2026-001", type: "Missing Data", severity: "Medium", description: "Missing access instructions", status: "Open", date: "2026-06-23" },
  { id: "EXC-002", orderId: "PAM-2026-002", type: "QC Issue", severity: "High", description: "Valuation risk flagged", status: "In Review", date: "2026-06-22" },
  { id: "EXC-003", orderId: "PAM-2026-003", type: "Turn Time Risk", severity: "Medium", description: "Appraiser workload high", status: "Resolved", date: "2026-06-20" },
];

export interface LenderPanelAppraiser {
  id: string;
  name: string;
  license: string;
  counties: string[];
  performance: number;
  status: "Active" | "Inactive";
  lastOrder: string;
  orders: number;
}

export const lenderPanelAppraisers: LenderPanelAppraiser[] = [
  { id: "LP-001", name: "Robert Long", license: "Certified Residential Appraiser", counties: ["Cook", "DuPage"], performance: 92, status: "Active", lastOrder: "2026-06-23", orders: 45 },
  { id: "LP-002", name: "Lisa Martinez", license: "SRA - Senior Residential Appraiser", counties: ["Los Angeles", "Orange"], performance: 95, status: "Active", lastOrder: "2026-06-22", orders: 62 },
  { id: "LP-003", name: "David Vance", license: "Residential Appraiser", counties: ["Cook"], performance: 88, status: "Active", lastOrder: "2026-06-21", orders: 32 },
];

