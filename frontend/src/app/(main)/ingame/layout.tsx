import RequireAuth from "@/app/components/RequireAuth";

export default function InGameLayout({ children }: LayoutProps<"/ingame">) {
  return <RequireAuth>{children}</RequireAuth>;
}
