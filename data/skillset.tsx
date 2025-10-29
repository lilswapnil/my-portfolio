import { FaReact, FaNode, FaPython, FaDatabase, FaGitAlt, FaDocker, FaJava, FaAws, FaLinux } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiPostgresql, SiMongodb, SiTailwindcss, SiNextdotjs, SiGraphql, SiRedis, SiKubernetes, SiRabbitmq, SiElasticsearch, SiApache, SiNginx, SiGithub, SiGitlab, SiJira, SiNotion, SiPostman, SiSlack, SiHtml5, SiCss3, SiBootstrap, SiMysql, SiFirebase, SiFlask, SiDjango, SiExpress, SiSpringboot } from 'react-icons/si';

const skillSet = {
    'Frontend': [
        { name: 'React', icon: FaReact, bgColor: 'bg-[#61dafb]' },
        { name: 'Next.js', icon: SiNextdotjs, bgColor: 'bg-[#000000]' },
        { name: 'TypeScript', icon: SiTypescript, bgColor: 'bg-[#3178c6]' },
        { name: 'JavaScript', icon: SiJavascript, bgColor: 'bg-[#f7df1e]' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, bgColor: 'bg-[#06b6d4]' },
        { name: 'Bootstrap', icon: SiBootstrap, bgColor: 'bg-[#7952b3]' },
        { name: 'HTML5', icon: SiHtml5, bgColor: 'bg-[#e34c26]' },
        { name: 'CSS3', icon: SiCss3, bgColor: 'bg-[#1572b6]' },
    ],
    'Backend': [
        { name: 'Node.js', icon: FaNode, bgColor: 'bg-[#339933]' },
        { name: 'Python', icon: FaPython, bgColor: 'bg-[#3776ab]' },
        { name: 'Java', icon: FaJava, bgColor: 'bg-[#007396]' },
        { name: 'Express.js', icon: SiExpress, bgColor: 'bg-[#000000]' },
        { name: 'Flask', icon: SiFlask, bgColor: 'bg-[#000000]' },
        { name: 'Django', icon: SiDjango, bgColor: 'bg-[#092e20]' },
        { name: 'Spring Boot', icon: SiSpringboot, bgColor: 'bg-[#6db33f]' },
    ],
    'Database': [
        { name: 'PostgreSQL', icon: SiPostgresql, bgColor: 'bg-[#336791]' },
        { name: 'MongoDB', icon: SiMongodb, bgColor: 'bg-[#13aa52]' },
        { name: 'MySQL', icon: SiMysql, bgColor: 'bg-[#00758f]' },
        { name: 'Firebase', icon: SiFirebase, bgColor: 'bg-[#ffa000]' },
        { name: 'Redis', icon: SiRedis, bgColor: 'bg-[#dc382d]' },
        { name: 'Elasticsearch', icon: SiElasticsearch, bgColor: 'bg-[#005571]' },
    ],
    'DevOps & Cloud': [
        { name: 'AWS', icon: FaAws, bgColor: 'bg-[#ff9900]' },
        { name: 'Docker', icon: FaDocker, bgColor: 'bg-[#2496ed]' },
        { name: 'Kubernetes', icon: SiKubernetes, bgColor: 'bg-[#326ce5]' },
        { name: 'Linux', icon: FaLinux, bgColor: 'bg-[#fcc624]' },
        { name: 'Nginx', icon: SiNginx, bgColor: 'bg-[#009639]' },
        { name: 'Apache', icon: SiApache, bgColor: 'bg-[#d70015]' },
    ],
    'APIs & Message Queue': [
        { name: 'GraphQL', icon: SiGraphql, bgColor: 'bg-[#e10098]' },
        { name: 'RabbitMQ', icon: SiRabbitmq, bgColor: 'bg-[#ff6600]' },
        { name: 'REST API', icon: SiPostman, bgColor: 'bg-[#ff6c02]' },
    ],
    'Version Control': [
        { name: 'Git', icon: FaGitAlt, bgColor: 'bg-[#f1502f]' },
        { name: 'GitHub', icon: SiGithub, bgColor: 'bg-[#181717]' },
        { name: 'GitLab', icon: SiGitlab, bgColor: 'bg-[#fc6d26]' },
    ],
    'Tools & Productivity': [
        { name: 'Postman', icon: SiPostman, bgColor: 'bg-[#ff6c02]' },
        { name: 'Jira', icon: SiJira, bgColor: 'bg-[#0052cc]' },
        { name: 'Notion', icon: SiNotion, bgColor: 'bg-[#000000]' },
        { name: 'Slack', icon: SiSlack, bgColor: 'bg-[#4a154b]' },
    ]
};

export default skillSet;