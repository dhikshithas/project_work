import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./login.js";
import { Home } from "./Home.js";
import { Layout } from "./Layout.js";
import { ActivityLogger } from "./ActivityLogger.js";
import { Moderation } from "./Moderation.js";
import { FinalReport } from "./FinalReport.js";
import { ViewDetails } from "./ViewDetails.js";
import { FormEntry } from "./FormEntry.js";
import { ModerationMark } from "./ModerationMark.js";
import { Student } from "./Student.js";
import { Guide } from "./Guide.js";
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
            <Route path="/admin/activityLogger" element={<ActivityLogger />} />
            <Route path="/admin/moderation" element={<Moderation />} />
            <Route path="/admin/viewDetails" element={<ViewDetails />} />
            <Route path="/admin/finalReport" element={<FinalReport />} />
            <Route path="/admin/formEntry" element={<FormEntry />} />
            <Route path="/admin/moderationMark" element={<ModerationMark />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
