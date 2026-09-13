export interface ProjectLinkDto {
  label: string;
  url: string;
}

export interface ProjectDto {
  name: string;
  description: string;
  tag: string;
  links: ProjectLinkDto[];
  repoUrl: string;
  isMobileApp?: boolean;
  appDownloadUrl?: string;
}

export interface InfraToolDto {
  name: string;
  description: string;
  url: string;
}
