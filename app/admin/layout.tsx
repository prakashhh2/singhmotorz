import AdminNav from '@/components/AdminNav';

export const metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell"><aside className="admin-sidebar"><AdminNav /></aside><div className="admin-main">{children}</div></div>;
}
