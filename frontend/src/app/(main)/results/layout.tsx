import RequireAuth from "@/app/components/RequireAuth";

export default function ResultsLayout({ children }: LayoutProps<"/results">) {
  return <RequireAuth>{children}</RequireAuth>;
}
