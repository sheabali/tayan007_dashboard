import JobDetails from "@/components/module/Dashboard/Jobs/JobDetails";

export const metadata = {
  title: "Job Details | Admin Dashboard",
  description: "View and manage detailed information for a specific job.",
};

const JobDetailsPage = ({ params }: { params: { id: string } }) => {
    return <JobDetails id={params.id} />;
};

export default JobDetailsPage;
