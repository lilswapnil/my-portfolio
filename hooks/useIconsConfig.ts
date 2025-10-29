import { useMemo } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import type { IconConfig } from '../types';

export function useIconsConfig(): IconConfig[] {
    return useMemo(() => [
        { href: "https://www.github.com/lilswapnil", icon: FaGithub, bg: "bg-gray-900", hover: "hover:bg-gray-700", label: "GitHub" },
        { href: "https://www.linkedin.com/in/lilswapnil", icon: FaLinkedin, bg: "bg-blue-500", hover: "hover:bg-blue-700", label: "LinkedIn" },
        { href: "https://www.twitter.com/lilswapnil", icon: FaTwitter, bg: "bg-sky-500", hover: "hover:bg-sky-400", label: "Twitter" },
        { href: "mailto:belikeswapnil@icloud.com", icon: FaEnvelope, bg: "bg-red-600", hover: "hover:bg-red-500", label: "Email" },
        { href: "https://www.facebook.com/lilswapnil", icon: FaFacebook, bg: "bg-blue-600", hover: "hover:bg-blue-500", label: "Facebook" },
        { href: "https://www.instagram.com/lilswapnil", icon: FaInstagram, bg: "bg-gradient-to-r from-purple-500 to-pink-500", hover: "hover:opacity-80", label: "Instagram" },
    ], []);
}