"use client";

import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { NavIcon } from "@/components/NavIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  NAV_ITEMS_ADMIN, 
  NAV_ITEMS_LENDER, 
  NAV_ITEMS_APPRAISER, 
  NAV_ITEMS_COMPLIANCE, 
  DEMO_USERS, 
  type SessionUser,
  type NavItem
} from "@/data/mockData";
import { clearSessionCookies } from "@/lib/session";
import { useApp } from "@/context/AppProvider";

const navItemsByRole: Record<SessionUser["role"], NavItem[]> = {
  admin: NAV_ITEMS_ADMIN,
  lender: NAV_ITEMS_LENDER,
  appraiser: NAV_ITEMS_APPRAISER,
  compliance: NAV_ITEMS_COMPLIANCE,
};

const roleTitles: Record<SessionUser["role"], string> = {
  admin: "Executive Dashboard",
  lender: "Lender Operations Center",
  appraiser: "Appraiser Workspace",
  compliance: "Compliance & Audit Hub",
};

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { user, logActivity, logout, isLoading } = useApp();

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "var(--bg)" 
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            border: "3px solid var(--border)", 
            borderTopColor: "var(--accent)", 
            borderRadius: "50%", 
            animation: "spin 1s linear infinite" 
          }} />
          <div style={{ fontSize: 14, color: "var(--muted)" }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const navItems = navItemsByRole[user.role];
  const groups = [...new Set(navItems.map((n) => n.group))];

  const isActive = (slug: string) => {
    return pathname === `/${user.role}/${slug}` || 
           pathname === `/${user.role}` || 
           pathname === `/${slug}`;
  };

  const handleLogout = () => {
    logActivity({
      type: "logged_out",
      action: "Logged out of PAM Core",
      detail: `Session ended for ${user.role} role`,
      screen: pathname,
    });
    logout();
    router.push("/login");
  };

  return (
    <div className="app-layout">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} aria-label="Main navigation">
        <div className="sidebar-brand">
          <div className="sidebar-brand-full">
            <div className="sidebar-eyebrow">PAM Group</div>
            <div className="sidebar-title">PAM Core</div>
          </div>
          <div className="sidebar-brand-compact" title="PAM Core">
            <NavIcon name="brand" size={22} />
          </div>
        </div>

        <nav className="sidebar-nav">
          {groups.map((g) => (
            <div key={g}>
              {!collapsed && <div className="nav-section-label">{g}</div>}
              {navItems
                .filter((n) => n.group === g)
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/${user.role}/${item.slug}`}
                    title={collapsed ? item.label : undefined}
                    className={`nav-link ${isActive(item.slug) ? "active" : ""}`}
                  >
                    <span className="nav-icon">
                      <NavIcon name={item.icon} size={18} />
                    </span>
                    {!collapsed && <span className="nav-label">{item.label}</span>}
                  </Link>
                ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-expanded">
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">{user.avatar}</div>
              <div>
                <div className="sidebar-user-name">{user.name}</div>
                <div className="sidebar-user-email">{user.email}</div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span className="sidebar-toggle-label">Collapse</span>}
          </button>
        </div>
      </aside>

      <div className={`main-content ${collapsed ? "sidebar-collapsed" : ""}`}>
        <header className="top-bar">
          <div className="top-bar-left">
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)" }}>
              {roleTitles[user.role]}
            </div>
          </div>
          <div className="top-bar-right">
            <ThemeToggle showLabel />
            <span className="user-pill">PAM Platform Fee: Flat</span>
            <span className="user-pill">vs AMC Markup: Hidden %</span>
            <button 
              type="button" 
              className="top-bar-btn"
              onClick={() => {
                logout();
                router.push("/login");
              }}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              Switch Role
            </button>
            <button 
              type="button" 
              className="top-bar-btn top-bar-btn-ghost"
              onClick={handleLogout}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <div className="page-body">{children}</div>
      </div>
    </div>
  );
}
