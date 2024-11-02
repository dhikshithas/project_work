import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../Containers/Components/Login/Login.js";
import { Home } from "../Containers/Components/Home/Home.js";
import { Layout } from "../Containers/Components/Layout/Layout.js";
import { ActivityLogger } from "../Containers/Components/ActivityLogger/ActivityLogger.js";
import { Moderation } from "../Containers/Components/Moderation/Moderation.js";
import { FinalReport } from "../Containers/Components/FinalReport/FinalReport.js";
import { ViewDetails } from "../Containers/Components/ViewDetails/ViewDetails.js";
import { FormEntry } from "../Containers/Components/FormEntry/FormEntry.js";
import { ModerationMark } from "../Containers/Components/ModerationMark/ModerationMark.js";
import { Student } from "../Containers/Components/Student/Student.js";
import { Guide } from "../Containers/Components/Guide/Guide.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const AppRouter = () => {
  <QueryClientProvider client={queryClient}></QueryClientProvider>;
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/student" element={<Student />}></Route>
          <Route path="/guide" element={<Guide />}></Route>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/admin/activityLogger"
              element={<ActivityLogger />}
              key="activityLogger"
            />
            <Route
              path="/admin/moderation"
              element={<Moderation />}
              key="moderation"
            />
            <Route
              path="/admin/viewDetails"
              element={<ViewDetails key="viewDetails" />}
            />
            <Route
              path="/admin/finalReport"
              element={<FinalReport key="finalReport" />}
            />
            <Route
              path="/admin/formEntry"
              element={<FormEntry />}
              key="formEntry"
            />
            <Route
              path="/admin/moderationMark"
              element={<ModerationMark />}
              key="moderationMark"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
