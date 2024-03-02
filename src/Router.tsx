import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "pages/Home";
import JobList from "./pages/JobList";
import JobDetails, { loader as getJobDetailsProps } from "./pages/JobDetails";
import MainLayout from "./components/layouts/MainLayout";
import RegisterLayout from "./components/layouts/RegisterLayout";
import NotFound from "./pages/NotFound";
import RegisterUser from "./pages/RegisterUser";
import RegisterCompany from "./pages/RegisterCompany";
import DashboardLayout from "./components/layouts/DashboardLayout";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import { getAllJobs } from "./services/api/jobs";
import AppWrapper from "./components/helpers/AppWrapper";
import UserSettings from "./pages/UserSettings";
import ProtectedRoute from "./components/helpers/ProtectedRoute";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyProfile from "./pages/CompanyProfile";
import CompanySettings from "./pages/CompanySettings";
import CompanyApplications from "./pages/CompanyApplications";
import CompanyCreateJob from "./pages/CompanyCreateJob";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppWrapper />}>
            <Route path="" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="register" element={<RegisterLayout />}>
                    <Route path="user" element={<RegisterUser />} />
                    <Route path="company" element={<RegisterCompany />} />
                </Route>
                <Route path="job-list" element={<JobList />} loader={getAllJobs} />
                <Route
                    path="job-details/:id"
                    element={<JobDetails />}
                    loader={getJobDetailsProps}
                />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="dashboard" element={<DashboardLayout />}>
                <Route path="user" element={<ProtectedRoute allowedRoles={["user"]} />}>
                    <Route path="" element={<UserDashboard />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="settings" element={<UserSettings />} />
                </Route>
                <Route
                    path="company"
                    element={<ProtectedRoute allowedRoles={["company"]} />}
                >
                    <Route path="" element={<CompanyDashboard />} />
                    <Route path="profile" element={<CompanyProfile />} />
                    <Route path="settings" element={<CompanySettings />} />
                    <Route path="applications" element={<CompanyApplications />} />
                    <Route path="create-job" element={<CompanyCreateJob />} />
                </Route>
            </Route>
        </Route>
    )
);
