// src/components/ui/ProjectCard.tsx
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardImage,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProjectCoverPlaceholder } from "@/components/ui/ProjectCoverPlaceholder";
import { publicAssetExists } from "@/lib/asset-exists";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export async function ProjectCard({ project }: ProjectCardProps) {
  const t = await getTranslations("projects");
  const hasCover = publicAssetExists(project.assets.cover);

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <Card interactive className="flex h-full flex-col">
        {hasCover ? (
          <CardImage src={project.assets.cover} alt={project.title} />
        ) : (
          <div className="relative aspect-video w-full overflow-hidden bg-background">
            <ProjectCoverPlaceholder category={project.category} title={project.title} />
          </div>
        )}

        <CardHeader>
          <Badge className="w-fit">{t(`categories.${project.category}`)}</Badge>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.tagline}</CardDescription>
        </CardHeader>

        <CardContent className="mt-auto flex flex-wrap gap-x-3 gap-y-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs text-text-muted">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs text-text-muted">
              +{project.techStack.length - 4}
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
