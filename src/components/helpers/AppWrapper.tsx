import { useNavigation, Outlet } from "react-router-dom";
import Loading from "./Loading";

export default function AppWrapper() {
    const { state } = useNavigation();

    if (state === "loading") return <Loading />;
    return <Outlet />;
}
