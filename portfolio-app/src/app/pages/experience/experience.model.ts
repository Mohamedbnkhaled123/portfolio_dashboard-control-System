export interface IExperience {
   _id?: string;
   jobHistory: string;
   jobTitle: string;
   jobDesc: string;
}

export interface IExperiencesDoc {
  _id?: string;
  experienceList: IExperience[];
}
