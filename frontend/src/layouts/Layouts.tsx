import BaseLayout from "./BaseLayout";
import AuthLayout from "./AuthLayout";
import FullLayout from "./FullLayout";
import DashboardLayout from "./DashboardLayout";

export const Layouts = {
    Auth: AuthLayout,
    Base: BaseLayout,
    Full: FullLayout,
    Dashboard: DashboardLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Auth" | "Base"
