'use client';

import { motion } from 'framer-motion';

export interface ExperienceSupervisor {
    name: string;
    url?: string;
}

export interface ExperienceItem {
    period: string;
    institution: string;
    position: string;
    directions: string[];
    supervisors: ExperienceSupervisor[];
}

interface ExperienceSectionProps {
    title?: string;
    items: ExperienceItem[];
}

export default function ExperienceSection({ title = 'Experiences', items }: ExperienceSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <motion.article
                        key={`${item.period}-${item.institution}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 * index }}
                        className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md dark:border-[rgba(148,163,184,0.24)] dark:bg-neutral-900"
                    >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-primary">{item.institution}</h3>
                                <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-500">{item.position}</p>
                            </div>
                            <span className="w-fit rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                {item.period}
                            </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {item.directions.map((direction) => (
                                <span
                                    key={direction}
                                    className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-600 dark:border-[rgba(148,163,184,0.24)] dark:bg-neutral-800/60 dark:text-neutral-400"
                                >
                                    {direction}
                                </span>
                            ))}
                        </div>

                        {item.supervisors.length > 0 && (
                            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
                                <span className="font-medium text-neutral-700 dark:text-neutral-400">Supervised by </span>
                                {item.supervisors.map((supervisor, supervisorIndex) => (
                                    <span key={supervisor.name}>
                                        {supervisor.url ? (
                                            <a
                                                href={supervisor.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-accent transition-colors hover:text-accent-dark"
                                            >
                                                {supervisor.name}
                                            </a>
                                        ) : (
                                            <span className="font-medium text-accent">{supervisor.name}</span>
                                        )}
                                        {supervisorIndex < item.supervisors.length - 2
                                            ? ', '
                                            : supervisorIndex === item.supervisors.length - 2
                                                ? ', and '
                                                : '.'}
                                    </span>
                                ))}
                            </p>
                        )}
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}
