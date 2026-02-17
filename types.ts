export interface NavItem {
  label: string;
  href: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Stat {
  label: string;
  value: string;
  sub: string;
}