import React from 'react';
import { projects } from '../../../data/projects';
import { useTheme } from 'next-themes';
const screenshots = [
  '/screenshot/musix.png',
  '/screenshot/moviz.png',
  '/screenshot/gaming-trends.png',
  '/screenshot/kdrama-analytics.png',
  '/screenshot/lung-cancer-detection.png',
];

export default function ShowcaseMobile() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  // Map project.id to screenshot if available
  const screenshotMap: Record<string, string> = {
    musix: '/screenshot/musix.png',
    moviz: '/screenshot/moviz.png',
    'gaming-trends': '/screenshot/gaming-trends.png',
    'kdrama-analytics': '/screenshot/kdrama-analytics.png',
    'lung-cancer-detection': '/screenshot/lung-cancer-detection.png',
  };
  const filteredProjects = projects.filter((project) => screenshotMap[project.id]);
  return (
    <section className={`w-full h-full flex flex-col items-center bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300${isDark ? ' dark' : ''}`}>
      <div
        className="flex flex-row gap-6 w-full overflow-x-auto scrollbar-hide"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {filteredProjects.map((project) => {
          const screenshot = screenshotMap[project.id];
          return (
            <div
              key={project.id || project.title}
              className="min-w-full max-w-screen flex flex-col items-center justify-center scrollSnapAlign relative"
              style={{ scrollSnapAlign: 'center' }}
            >
              <div
                className={`w-full max-w-xs glass-container rounded-2xl p-6 flex flex-col items-center relative transition-all duration-500 shadow-lg${isDark ? ' dark:shadow-xl group dark' : ' dark:shadow-xl group'}`}
              >
                <h2 className={`text-2xl font-bold mb-1 text-center transition-colors duration-300 group-hover:text-blue-600${isDark ? ' dark:group-hover:text-blue-400 text-white' : ' text-gray-900'}`}>{project.title || project.id}</h2>
                {project.category && (
                  <div className={`text-xs my-2 font-semibold${isDark ? ' text-blue-300' : ' text-blue-700'}`}>{project.category}</div>
                )}
                <p className={`text-center text-sm leading-relaxed mb-4 line-clamp-3${isDark ? ' text-gray-300' : ' text-gray-700'}`}>{project.description || 'No description available.'}</p>
                <div className="flex flex-row gap-4 mb-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`glass-button font-semibold rounded-full px-6 py-2 text-base transition-all duration-200 border${isDark ? ' dark:border-white/60 dark:bg-transparent dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white' : ' border-black bg-black text-white hover:bg-gray-900 hover:text-white'} focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent`}
                    >
                      Live
                    </a>
                  )}
                  {project.githubRepo && (
                    
                    <a
                      href={`https://github.com/${project.githubRepo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`glass-button font-semibold rounded-full px-6 py-2 text-base transition-all duration-200 border${isDark ? ' dark:border-white/60 dark:bg-transparent dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white' : ' border-black bg-black text-white hover:bg-gray-900 hover:text-white'} focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent`}
                    >
                      GitHub
                    </a>
                  )}
                </div>
                <div className="w-full flex justify-center mb-2">
                  <img
                    src={screenshot}
                    alt={project.title || 'Project screenshot'}
                    className={`rounded-xl shadow-md w-64 h-40 object-cover object-center border${isDark ? ' dark:border-gray-700 dark:bg-[var(--bg-secondary-dark)]' : ' border-gray-200 bg-[var(--bg-secondary-light)]'}`}
                  />
                </div>
                {project.tags?.length ? (
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-xs px-3 py-1 rounded-full font-medium border transition-all duration-300${isDark ? ' dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50 dark:group-hover:bg-blue-800/50' : ' bg-blue-100/40 text-blue-700 border-blue-200/70 group-hover:bg-blue-100/60'}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {/* Hide scrollbar for mobile */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
