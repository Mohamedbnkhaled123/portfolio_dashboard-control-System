export interface IProject {
  _id?: string;
  title: string;
  badge: string;
  description: string;
  tags: string;
  imageUrl?: string;
}

export interface IProjectsDoc {
  _id?: string;
  projectsList: IProject[];
}