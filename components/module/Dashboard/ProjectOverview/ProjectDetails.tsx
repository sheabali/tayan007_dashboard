"use client";

import ProjectHeader from "./ProjectHeader";
import Metrics from "./Metrics";
import Objectives from "./Objectives";
import Timeline from "./Timeline";
import Participants from "./Participants";
import Cancellation from "./Cancellation";
import Deliverables from "./Deliverables";

interface Objective {
  id: number;
  text: string;
  completed: boolean;
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "COMPLETED" | "IN PROGRESS" | "UPCOMING";
}

interface Deliverable {
  id: number;
  title: string;
  type: "JPG" | "MP4";
  sizeOrStatus: string;
  url: string;
}

interface ProjectData {
  id: number;
  name: string;
  client: string;
  stage: string;
  deadline: string;
  daysRemaining: number;
  budget: number;
  objectives: Objective[];
  milestones: Milestone[];
  deliverables: Deliverable[];
}

interface ProjectDetailsProps {
  project: ProjectData;
  onBackToList: () => void;
  onToggleObjective: (projectId: number, objectiveId: number) => void;
  onUpdateMilestoneStatus: (projectId: number, milestoneId: number, status: Milestone["status"]) => void;
  onInitiateCancellation: (projectId: number) => void;
  onAddDeliverable: (projectId: number, deliverable: Omit<Deliverable, "id">) => void;
}

export default function ProjectDetails({
  project,
  onBackToList,
  onToggleObjective,
  onUpdateMilestoneStatus,
  onInitiateCancellation,
  onAddDeliverable,
}: ProjectDetailsProps) {
  // Creator progress mapped to number of completed milestones:
  // 5 total milestones:
  // - 0 completed: 10%
  // - 1 completed: 25%
  // - 2 completed: 50%
  // - 3 completed: 75%
  // - 4 completed: 90%
  // - 5 completed: 100%
  const calculateProgress = () => {
    const completedCount = project.milestones.filter((ms) => ms.status === "COMPLETED").length;
    switch (completedCount) {
      case 0:
        return 10;
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 75;
      case 4:
        return 90;
      case 5:
      default:
        return 100;
    }
  };

  const progress = calculateProgress();

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      {/* 1. Header Section with Back Arrow callback */}
      <ProjectHeader
        status={project.stage}
        title={project.name}
        onBack={onBackToList}
      />

      {/* 2. Three Metric Cards */}
      <Metrics
        daysRemaining={project.daysRemaining}
        deadline={project.deadline}
        budget={project.budget}
        progress={progress}
      />

      {/* 3. Two-Column Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
        {/* Left Column (Objectives & Milestones Timeline) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Objectives
            description="A high-impact visual campaign for ABC Coffee House's new seasonal winter menu. Focus on artisan lattes, cozy interior atmosphere, and community engagement. Content to be used across Instagram, TikTok, and brand storytelling channels."
            objectives={project.objectives}
            onToggleObjective={(objId) => onToggleObjective(project.id, objId)}
          />
          <Timeline
            milestones={project.milestones}
            onUpdateStatus={(msId, status) => onUpdateMilestoneStatus(project.id, msId, status)}
          />
        </div>

        {/* Right Column (Participants & Cancellation Policy) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Participants />
          <Cancellation
            projectStatus={project.stage}
            onInitiateCancellation={() => onInitiateCancellation(project.id)}
          />
        </div>
      </div>

      {/* 4. Full-Width Deliverables & Assets Grid */}
      <div className="w-full">
        <Deliverables
          deliverables={project.deliverables}
          onAddDeliverable={(newAsset) => onAddDeliverable(project.id, newAsset)}
        />
      </div>
    </div>
  );
}
