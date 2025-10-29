import { IconType } from 'react-icons';

export interface DetailItem {
    value: string;
    href: string;
}

export interface Experience {
    position: string;
    company: string;
    href: string;
    logo: string;
    duration: string;
    tech: string[];
    responsibilities: string[];
}

export interface Education {
    degree: string;
    institution: string;
    href: string;
    logo: string;
    location: string;
    duration: string;
    highlights: string[];
}

export interface Skill {
    name: string;
    icon: IconType;
    bgColor: string;
}

export interface IconConfig {
    href: string;
    icon: IconType;
    bg: string;
    hover: string;
    label: string;
}