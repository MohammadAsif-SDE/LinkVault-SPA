export interface FolderItem {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  color: string;
  icon?: string;
}

export const FOLDERS_DATA: FolderItem[] = [
  { id: 'f1', name: 'Softwares', count: 26, color: '#D1FAE5' },
  { id: 'f2', name: 'Research', count: 1, color: '#FCA5A5' },
  { id: 'f3', name: 'Jarvis', count: 0, color: '#FFFFFF' },
];

export const LINKS_DATA: LinkItem[] = [
  { id: '1', title: 'Clean Ui', subtitle: 'Handy Features', url: '#', color: '#F97316', icon: '✨' },
  { id: '2', title: 'Blue Magic', subtitle: '20 Links', url: '#', color: '#000000', icon: '💎' },
  { id: '3', title: 'Live Collaboration', subtitle: '', url: '#', color: '#FFFFFF', icon: '🤝' },
  { id: '4', title: 'New Folder', subtitle: '', url: '#', color: '#FBCFE8', icon: '📁' },
];
