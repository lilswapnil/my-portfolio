'use client';
import './about.css';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { useEffect, useState, useRef, useMemo, ReactNode, memo } from 'react';
import skillSet from '../../data/skillset';
import details from '../../data/details';
import workexperience from '../../data/workexperience';
import education from '../../data/education';
import { useIconsConfig } from '../../hooks/useIconsConfig';
import type { DetailItem, Experience, Education as EducationType, Skill } from '../../types';

export default function About() {
    const [yearsCount, setYearsCount] = useState<number>(0);
    const [isResumeVisible, setIsResumeVisible] = useState<boolean>(false);
    const resumeRef = useRef<HTMLDivElement>(null);
    const icons = useIconsConfig();

    // Optimize counter animation
    useEffect(() => {
        if (yearsCount >= 3) return;
        
        const timer = setTimeout(() => {
            setYearsCount(prev => prev + 1);
        }, 300);

        return () => clearTimeout(timer);
    }, [yearsCount]);

    // Memoize intersection observer setup
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setIsResumeVisible(true),
            { threshold: 0.1 }
        );

        if (resumeRef.current) {
            observer.observe(resumeRef.current);
        }
        
        return () => {
            if (resumeRef.current) {
                observer.unobserve(resumeRef.current);
            }
        };
    }, []);

    // Memoize details rendering
    const detailsContent = useMemo(() => 
        details.map((detail: DetailItem, index: number) => (
            <span key={detail.href} className='flex items-center gap-2'>
                <a 
                    href={detail.href}
                    target={detail.href.startsWith('http') ? "_blank" : undefined}
                    rel={detail.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className='text-gray-900 hover:text-blue-800 hover:underline transition duration-200'
                >
                    {detail.value}
                </a>
                {index < details.length - 1 && <span className='text-gray-400'>|</span>}
            </span>
        )),
    []);

    // Memoize experience items
    const experienceContent = useMemo(() =>
        workexperience.map((exp: Experience, index: number) => (
            <ExperienceCard 
                key={exp.href} 
                exp={exp} 
                index={index} 
                isVisible={isResumeVisible} 
            />
        )),
    [isResumeVisible]);

    // Memoize education items
    const educationContent = useMemo(() =>
        education.map((edu: EducationType, index: number) => (
            <EducationCard 
                key={edu.href} 
                edu={edu} 
                index={index} 
                isVisible={isResumeVisible} 
            />
        )),
    [isResumeVisible]);

    return (
        <>
            <div className="about-container mt-20 sm:mt-8 h-[calc(100vh-80px)] flex items-center justify-center text-white text-4xl relative overflow-x-hidden">
                <OrbitSection icons={icons} yearsCount={yearsCount} />
                <ArrowDown />
            </div>
            <span id="resume"></span>
            <div ref={resumeRef} className='resume-container mx-auto m-4 sm:m-8 md:m-32 bg-white py-8 sm:py-10 md:py-12 border border-gray-300 shadow-lg transition-all duration-1000 transform overflow-x-hidden'
                style={getCardStyle(isResumeVisible, 0, 0)}>
                <HeaderSection isVisible={isResumeVisible} details={detailsContent} />
                
                <div className="experience-section max-w-6xl mx-auto px-4 mt-8">
                    <SectionTitle title="Professional Experience" isVisible={isResumeVisible} delay="0ms" />
                    <div className='experience-timeline flex flex-col gap-8'>
                        {experienceContent}
                    </div>

                    <SectionTitle title="Education" isVisible={isResumeVisible} delay="200ms" />
                    <div className='education-timeline flex flex-col gap-8'>
                        {educationContent}
                    </div>

                    <SkillsetSection isVisible={isResumeVisible} />
                </div>
            </div>
        </>
    );
}

// Component Types
interface OrbitSectionProps {
    icons: ReturnType<typeof useIconsConfig>;
    yearsCount: number;
}

interface OrbitIconProps {
    item: ReturnType<typeof useIconsConfig>[0];
    index: number;
    totalIcons: number;
}

interface HeaderSectionProps {
    isVisible: boolean;
    details: ReactNode;
}

interface SectionTitleProps {
    title: string;
    isVisible: boolean;
    delay: string;
}

interface ExperienceCardProps {
    exp: Experience;
    index: number;
    isVisible: boolean;
}

interface EducationCardProps {
    edu: EducationType;
    index: number;
    isVisible: boolean;
}

interface SkillsetSectionProps {
    isVisible: boolean;
}

interface SkillCardProps {
    skill: Skill;
}

// Extracted Components
function OrbitSection({ icons, yearsCount }: OrbitSectionProps) {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-8 w-full h-auto sm:flex-row mb-28 sm:mb-20 sm:gap-6 sm:h-screen">
                <div className="flex flex-col items-center relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex-shrink-0">
                    <div className="orbit-container absolute inset-0 flex items-center justify-center">
                        <div className="absolute z-10">
                            <Image src="/image.jpeg" alt="Profile" width={120} height={120} className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52" />
                        </div>
                        <div className="orbit absolute w-full h-full">
                            {icons.map((item, index) => <OrbitIcon key={item.href} item={item} index={index} totalIcons={icons.length} />)}
                        </div>
                    </div>
                </div>
                
                <div className="text-center text-white-800 w-full max-w-xs mt-8 px-4 sm:text-left sm:w-auto sm:max-w-sm sm:mt-0 sm:px-0 md:max-w-2xl">
                    <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">About Me</h1>
                    <p className="text-lg max-w-xs text-white-600 sm:max-w-sm sm:text-l md:max-w-xl md:text-2xl">
                        Hello! I'm a passionate developer with an enthusiasm for integrating GenAI in functional web applications.
                        <br/> 
                        <span className="font-bold text-2xl text-white-950 sm:text-3xl md:text-4xl">{yearsCount}+</span> years of experience in various technologies, I enjoy solving complex problems.
                    </p>
                    <p className='mt-4 text-xs text-right text-white-100 sm:text-sm md:text-sm'>- Swapnil Satish Bhalerao</p>
                </div>
            </div>
        </>
    );
}

function OrbitIcon({ item, index, totalIcons }: OrbitIconProps) {
    const IconComponent = item.icon;
    return (
        <div 
            key={item.href} 
            className="orbit-item absolute" 
            style={{ '--rotation': `${(index * 360) / totalIcons}deg` } as React.CSSProperties}
        >
            <a 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                title={item.label}
                className={`p-3 ${item.bg} text-white rounded-full ${item.hover} transition duration-200 flex items-center justify-center block`}
            >
                <IconComponent size={24} />
            </a>
        </div>
    );
}

function ArrowDown() {
    return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center">
            <a href="#resume" className="text-white-600 hover:text-gray-900 transition duration-200 flex flex-col items-center gap-2 ">
                <span className='text-sm font-semibold text-white-700'>Resume</span>
                <FaChevronDown size={40} />
            </a>
        </div>
    );
}

function HeaderSection({ isVisible, details }: HeaderSectionProps) {
    return (
        <div className={`flex flex-col items-center border-b-1 border-gray-700 pb-6 px-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-950'>Swapnil Satish Bhalerao</h1>
            <div className='text-gray-700 mt-2 flex flex-wrap justify-center gap-2 px-2 sm:px-4 max-w-xs sm:max-w-2xl md:max-w-6xl text-xs sm:text-sm md:text-base'>
                {details}
            </div>
        </div>
    );
}

function SectionTitle({ title, isVisible, delay }: SectionTitleProps) {
    return (
        <h2 
            className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 mt-4 px-4 text-gray-900 transition-all duration-1000 transform'
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transitionDelay: isVisible ? delay : '0ms'
            }}
        >
            {title}
        </h2>
    );
}

const ExperienceCard = memo(function ExperienceCard({ exp, index, isVisible }: ExperienceCardProps) {
    const [showLogoTooltip, setShowLogoTooltip] = useState<boolean>(false);

    return (
        <div 
            className='experience-item border-l-4 border-gray-600 pl-4 sm:pl-6 pb-6 relative transition-all duration-1000 transform mx-4 sm:mx-0'
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? `translateY(0) rotateX(0deg)` : `translateY(100px) rotateX(45deg)`,
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                transformOrigin: 'center top'
            }}
        >
            
            <div 
                className='absolute top-0 right-0 flex items-center gap-2 group'
                onMouseEnter={() => setShowLogoTooltip(true)}
                onMouseLeave={() => setShowLogoTooltip(false)}
            >
                {exp.logo && (
                    <>
                        <Image 
                            src={exp.logo} 
                            alt={exp.company} 
                            width={40}
                            height={40}
                            className='rounded cursor-pointer hover:scale-110 transition-transform duration-200 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px]'
                        />
                        {showLogoTooltip && (
                            <div className='flex right-full mr-2 gray-800 px-3 py-1 rounded whitespace-nowrap text-xs sm:text-sm font-semibold animate-fadeIn'>
                                {exp.company}
                            </div>
                        )}
                    </>
                )}
            </div>
            <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>{exp.position}</h3>
            
            <span className='text-gray-600 italic text-xs sm:text-sm'>{exp.duration}</span>
            <div className='mt-4 flex flex-wrap gap-2'>
                <p className='text-gray-400 text-sm'>Tech Stack:</p>
                {exp.tech.map((tech) => (
                    <span key={tech} className='bg-gray-100 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold'>
                        {tech}
                    </span>
                ))}
            </div>
            <ul className='list-disc list-inside mt-4 text-gray-700 space-y-2 text-sm sm:text-base'>
                {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                ))}
            </ul>
        </div>
    );
});

const EducationCard = memo(function EducationCard({ edu, index, isVisible }: EducationCardProps) {
    const [showLogoTooltip, setShowLogoTooltip] = useState<boolean>(false);

    return (
        <div 
            className='education-item border-l-4 border-gray-600 pl-4 sm:pl-6 pb-6 relative transition-all duration-1000 transform mx-4 sm:mx-0'
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? `translateY(0) rotateX(0deg)` : `translateY(100px) rotateX(45deg)`,
                transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms',
                transformOrigin: 'center top'
            }}
        >
            <div 
                className='absolute top-0 right-0 flex items-center gap-2 group'
                onMouseEnter={() => setShowLogoTooltip(true)}
                onMouseLeave={() => setShowLogoTooltip(false)}
            >
                {edu.logo && (
                    <>
                        <Image 
                            src={edu.logo} 
                            alt={edu.institution} 
                            width={40}
                            height={40}
                            className='rounded cursor-pointer hover:scale-110 transition-transform duration-200 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px]'
                        />
                        {showLogoTooltip && (
                            <div className='flex right-full mr-2 gray-800 px-3 py-1 rounded whitespace-nowrap text-xs sm:text-sm font-semibold animate-slideIn'>
                                {edu.institution}
                            </div>
                        )}
                    </>
                )}
            </div>
            <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>{edu.degree}</h3>
            
            <p className='text-gray-600 text-xs sm:text-sm'>{edu.location}</p>
            <span className='text-gray-600 italic text-xs sm:text-sm'>{edu.duration}</span>
            <ul className='list-disc list-inside mt-4 text-gray-700 space-y-2 text-sm sm:text-base'>
                {edu.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                ))}
            </ul>
        </div>
    );
});

function SkillsetSection({ isVisible }: SkillsetSectionProps) {
    return (
        <>
            <SectionTitle title="Skillset" isVisible={isVisible} delay="400ms" />
            <div className='max-w-6xl mx-auto px-4 mb-2'>
                {Object.entries(skillSet).map(([category, skills], catIndex) => (
                    <div 
                        key={category} 
                        className='mb-8 transition-all duration-1000 transform'
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                            transitionDelay: isVisible ? `${500 + catIndex * 100}ms` : '0ms'
                        }}
                    >
                        <h3 className='text-2xl font-bold text-gray-800 mb-4'>{category}</h3>
                        <div className='skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
                            {skills.map((skill) => (
                                <SkillCard key={skill.name} skill={skill} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function SkillCard({ skill }: SkillCardProps) {
    const Icon = skill.icon;
    return (
        <div className='skill-item h-32 cursor-pointer' style={{ perspective: '1000px' }}>
            <div 
                className='relative w-full h-full transition-transform duration-500 transform-gpu hover:[transform:rotateY(180deg)]' 
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div 
                    className={`absolute w-full h-full ${skill.bgColor} p-3 rounded-lg text-center flex items-center justify-center shadow hover:shadow-md transition duration-200 text-white`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <Icon size={48} />
                </div>
                <div 
                    className={`absolute w-full h-full ${skill.bgColor} p-3 rounded-lg text-center flex items-center justify-center shadow text-white font-semibold`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {skill.name}
                </div>
            </div>
        </div>
    );
}

// Create style objects outside component
const getCardStyle = (isVisible: boolean, index: number, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.95)',
    transitionDelay: `${delay}ms`
});