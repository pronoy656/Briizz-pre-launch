export type ExperienceStage =
  | 'PRELOADER'
  | 'SPLASH'
  | 'ACTIVATING'
  | 'CINEMATIC_TRANSITION'
  | 'MAIN_NARRATION'
  | 'ECOSYSTEM'
  | 'COMING_SOON'
  | 'CORE_INTERACTION'
  | 'FINAL_MESSAGE';

export interface EcosystemNode {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  angle: number;
  radius: number;
  status: string;
  tags: string[];
}
