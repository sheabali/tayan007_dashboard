"use client";

import { useState } from "react";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";

interface Creator {
    name: string;
    avatar: string;
    role: string;
}

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
    creator: Creator | null;
    client: string;
    stage: string;
    deadline: string;
    daysRemaining: number;
    budget: number;
    objectives: Objective[];
    milestones: Milestone[];
    deliverables: Deliverable[];
}

// Initial mockup project structures
const initialProjects: ProjectData[] = [
    {
        id: 1,
        name: "Coffee Campaign",
        creator: null,
        client: "Jordan Rivera",
        stage: "Editing",
        deadline: "2024-01-15",
        daysRemaining: 12,
        budget: 4500,
        objectives: [
            { id: 1, text: "Increase engagement by 25%", completed: true },
            { id: 2, text: "Showcase new 'Frosty Brew' line", completed: true },
            { id: 3, text: "Highlight 10th-anniversary vibe", completed: true },
            { id: 4, text: "Drive seasonal loyalty sign-ups", completed: true },
        ],
        milestones: [
            { id: 1, title: "Concept Approval", description: "Client approved storyboard.", date: "Nov 12", status: "COMPLETED" },
            { id: 2, title: "Shoot Date", description: "Full day production.", date: "Nov 18", status: "COMPLETED" },
            { id: 3, title: "First Draft", description: "Initial cuts delivered.", date: "Nov 25", status: "COMPLETED" },
            { id: 4, title: "Client Review", description: "Assets uploaded for feedback.", date: "Dec 02", status: "IN PROGRESS" },
            { id: 5, title: "Final Delivery", description: "Upload to cloud storage.", date: "Dec 08", status: "UPCOMING" },
        ],
        deliverables: [
            { id: 1, title: "15 Edited Photos", type: "JPG", sizeOrStatus: "24.5 MB • Ready", url: "/images/latte_art.png" },
            { id: 2, title: "3 Reels (Vertical)", type: "MP4", sizeOrStatus: "In Review", url: "" },
            { id: 3, title: "1 Brand Story Video", type: "MP4", sizeOrStatus: "Pending Upload", url: "" },
        ],
    },
    {
        id: 2,
        name: "Coffee Campaign",
        creator: { name: "Jordan Rivera", avatar: "/images/marcus_profile.png", role: "Lifestyle Photographer" },
        client: "Jordan Rivera",
        stage: "Shoot",
        deadline: "2024-02-10",
        daysRemaining: 25,
        budget: 5000,
        objectives: [
            { id: 1, text: "Production setup", completed: true },
            { id: 2, text: "Capture cafe aesthetics", completed: false },
        ],
        milestones: [
            { id: 1, title: "Concept Approval", description: "Concept storyboard approved.", date: "Jan 10", status: "COMPLETED" },
            { id: 2, title: "Shoot Date", description: "Production Day.", date: "Jan 25", status: "IN PROGRESS" },
            { id: 3, title: "Final Delivery", description: "Assets delivered.", date: "Feb 05", status: "UPCOMING" },
        ],
        deliverables: [],
    },
    {
        id: 3,
        name: "Coffee Campaign",
        creator: null,
        client: "Jordan Rivera",
        stage: "Client Review",
        deadline: "2024-03-05",
        daysRemaining: 5,
        budget: 3500,
        objectives: [
            { id: 1, text: "Review first draft", completed: true },
        ],
        milestones: [
            { id: 1, title: "Concept Approval", description: " storyboard approved.", date: "Feb 05", status: "COMPLETED" },
            { id: 2, title: "Shoot Date", description: "Shoot completed.", date: "Feb 15", status: "COMPLETED" },
            { id: 3, title: "Client Review", description: "Awaiting feedback.", date: "Feb 28", status: "IN PROGRESS" },
        ],
        deliverables: [],
    },
    {
        id: 4,
        name: "Coffee Campaign",
        creator: null,
        client: "Jordan Rivera",
        stage: "Editing",
        deadline: "2024-01-20",
        daysRemaining: 2,
        budget: 4200,
        objectives: [],
        milestones: [],
        deliverables: [],
    },
    {
        id: 5,
        name: "Coffee Campaign",
        creator: { name: "Jordan Rivera", avatar: "/images/marcus_profile.png", role: "Lifestyle Photographer" },
        client: "Jordan Rivera",
        stage: "Shoot",
        deadline: "2024-04-01",
        daysRemaining: 45,
        budget: 6000,
        objectives: [],
        milestones: [],
        deliverables: [],
    },
    {
        id: 6,
        name: "Coffee Campaign",
        creator: { name: "Jordan Rivera", avatar: "/images/marcus_profile.png", role: "Lifestyle Photographer" },
        client: "Jordan Rivera",
        stage: "Client Review",
        deadline: "2023-12-10",
        daysRemaining: 0,
        budget: 4500,
        objectives: [],
        milestones: [],
        deliverables: [],
    },
    {
        id: 7,
        name: "Coffee Campaign",
        creator: { name: "Jordan Rivera", avatar: "/images/marcus_profile.png", role: "Lifestyle Photographer" },
        client: "Jordan Rivera",
        stage: "Shoot",
        deadline: "2024-05-15",
        daysRemaining: 80,
        budget: 5500,
        objectives: [],
        milestones: [],
        deliverables: [],
    },
    {
        id: 8,
        name: "Coffee Campaign",
        creator: { name: "Jordan Rivera", avatar: "/images/marcus_profile.png", role: "Lifestyle Photographer" },
        client: "Jordan Rivera",
        stage: "Editing",
        deadline: "2024-02-28",
        daysRemaining: 15,
        budget: 4800,
        objectives: [],
        milestones: [],
        deliverables: [],
    },
];

const ProjectOverview = () => {
    const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

    // --- Handlers ---

    // Select project to view details
    const handleViewProject = (project: ProjectData) => {
        setSelectedProjectId(project.id);
    };

    // Return to list view
    const handleBackToList = () => {
        setSelectedProjectId(null);
    };

    // Delete project from master list
    const handleDeleteProject = (projectId: number) => {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        if (selectedProjectId === projectId) {
            setSelectedProjectId(null);
        }
    };

    // Assign a creator to a project
    const handleAssignCreator = (projectId: number, creator: Creator) => {
        setProjects((prev) =>
            prev.map((p) => (p.id === projectId ? { ...p, creator } : p))
        );
    };

    // Toggles objective state inside a project
    const handleToggleObjective = (projectId: number, objectiveId: number) => {
        setProjects((prev) =>
            prev.map((p) => {
                if (p.id === projectId) {
                    return {
                        ...p,
                        objectives: p.objectives.map((obj) =>
                            obj.id === objectiveId ? { ...obj, completed: !obj.completed } : obj
                        ),
                    };
                }
                return p;
            })
        );
    };

    // Updates milestone status inside a project, and updates project stage accordingly
    const handleUpdateMilestoneStatus = (
        projectId: number,
        milestoneId: number,
        status: Milestone["status"]
    ) => {
        setProjects((prev) =>
            prev.map((p) => {
                if (p.id === projectId) {
                    const updatedMilestones = p.milestones.map((ms) =>
                        ms.id === milestoneId ? { ...ms, status } : ms
                    );

                    // Dynamically compute the project stage based on the milestones
                    let stage = p.stage;
                    const completedCount = updatedMilestones.filter((m) => m.status === "COMPLETED").length;

                    if (completedCount === updatedMilestones.length && updatedMilestones.length > 0) {
                        stage = "Completed";
                    } else {
                        // Find active milestone
                        const activeMilestone = updatedMilestones.find((m) => m.status === "IN PROGRESS");
                        if (activeMilestone) {
                            if (activeMilestone.title.toLowerCase().includes("review")) {
                                stage = "Client Review";
                            } else if (activeMilestone.title.toLowerCase().includes("shoot")) {
                                stage = "Shoot";
                            } else {
                                stage = "Editing";
                            }
                        }
                    }

                    return {
                        ...p,
                        stage,
                        milestones: updatedMilestones,
                    };
                }
                return p;
            })
        );
    };

    // Cancels project (sets stage to Cancelled)
    const handleInitiateCancellation = (projectId: number) => {
        setProjects((prev) =>
            prev.map((p) => (p.id === projectId ? { ...p, stage: "Cancelled" } : p))
        );
    };

    // Adds a new deliverable/asset to a project
    const handleAddDeliverable = (projectId: number, newAsset: Omit<Deliverable, "id">) => {
        setProjects((prev) =>
            prev.map((p) => {
                if (p.id === projectId) {
                    const nextId =
                        p.deliverables.length > 0 ? Math.max(...p.deliverables.map((d) => d.id)) + 1 : 1;
                    return {
                        ...p,
                        deliverables: [...p.deliverables, { ...newAsset, id: nextId }],
                    };
                }
                return p;
            })
        );
    };

    // Render view
    const selectedProject = projects.find((p) => p.id === selectedProjectId);

    if (selectedProjectId && selectedProject) {
        return (
            <ProjectDetails
                project={selectedProject}
                onBackToList={handleBackToList}
                onToggleObjective={handleToggleObjective}
                onUpdateMilestoneStatus={handleUpdateMilestoneStatus}
                onInitiateCancellation={handleInitiateCancellation}
                onAddDeliverable={handleAddDeliverable}
            />
        );
    }

    return (
        <ProjectList
            projects={projects}
            onViewProject={handleViewProject}
            onDeleteProject={handleDeleteProject}
            onAssignCreator={handleAssignCreator}
        />
    );
};

export default ProjectOverview;
