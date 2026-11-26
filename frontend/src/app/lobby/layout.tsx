import RequireAuth from "@/app/components/RequireAuth";

export default function LobbyLayout({ children }: LayoutProps<"/lobby">) {
  return <RequireAuth>{children}</RequireAuth>;
}
