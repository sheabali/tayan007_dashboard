import JobDetails from "@/components/module/Dashboard/Jobs/JobDetails";

export const metadata = {
  title: "Job Details | Admin Dashboard",
  description: "View and manage detailed information for a specific job.",
};

const JobDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <JobDetails id={id} />;
};

export default JobDetailsPage;
