'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRightIcon,
    BookOpenIcon,
    CodeBracketIcon,
    DocumentTextIcon,
    NewspaperIcon,
} from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;
    const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);
    const [expandedBibtexId, setExpandedBibtexId] = useState<string | null>(null);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="inline-flex items-center gap-1.5 rounded px-1.5 py-1 text-sm font-medium text-accent transition-all duration-200 hover:bg-accent/10 hover:text-accent-dark hover:shadow-sm"
                >
                    <span>{messages.home.viewAll}</span>
                    <ArrowRightIcon className="h-4 w-4" />
                </Link>
            </div>
            <div className="space-y-4">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                        <h3 className="font-semibold text-primary mb-2 leading-tight">
                            <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-1">
                            {pub.authors.map((author, idx) => (
                                <span key={idx}>
                                    <span className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}>
                                        {author.name}
                                    </span>
                                    {author.isCorresponding && (
                                        <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                    )}
                                    {idx < pub.authors.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-2">
                            {pub.journal || pub.conference}
                        </p>
                        {pub.description && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-500 line-clamp-2">
                                {pub.description}
                            </p>
                        )}
                        {expandedAbstractId === pub.id && pub.abstract && (
                            <div className="mt-3 rounded-lg border border-neutral-200 bg-white/70 p-3 text-sm leading-relaxed text-neutral-600 dark:border-[rgba(148,163,184,0.24)] dark:bg-neutral-900/50 dark:text-neutral-500">
                                {pub.abstract}
                            </div>
                        )}
                        {expandedBibtexId === pub.id && pub.bibtex && (
                            <div className="mt-3 rounded-lg border border-neutral-200 bg-white/70 p-3 dark:border-[rgba(148,163,184,0.24)] dark:bg-neutral-900/50">
                                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-neutral-600 dark:text-neutral-500">
                                    {pub.bibtex}
                                </pre>
                            </div>
                        )}
                        <div className="mt-3 flex items-end justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                                {(pub.pdfUrl || pub.url || pub.doi) && (
                                    <a
                                        href={pub.pdfUrl || pub.url || `https://doi.org/${pub.doi}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200 transition-colors hover:bg-accent hover:text-white dark:bg-neutral-900 dark:text-neutral-300 dark:ring-[rgba(148,163,184,0.24)]"
                                    >
                                        <NewspaperIcon className="h-3.5 w-3.5" />
                                        <span>Paper</span>
                                    </a>
                                )}
                                {pub.abstract && (
                                    <button
                                        type="button"
                                        onClick={() => setExpandedAbstractId(expandedAbstractId === pub.id ? null : pub.id)}
                                        className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200 transition-colors hover:bg-accent hover:text-white dark:bg-neutral-900 dark:text-neutral-300 dark:ring-[rgba(148,163,184,0.24)]"
                                    >
                                        <DocumentTextIcon className="h-3.5 w-3.5" />
                                        <span>Abstract</span>
                                    </button>
                                )}
                                {pub.bibtex && (
                                    <button
                                        type="button"
                                        onClick={() => setExpandedBibtexId(expandedBibtexId === pub.id ? null : pub.id)}
                                        className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200 transition-colors hover:bg-accent hover:text-white dark:bg-neutral-900 dark:text-neutral-300 dark:ring-[rgba(148,163,184,0.24)]"
                                    >
                                        <BookOpenIcon className="h-3.5 w-3.5" />
                                        <span>BibTeX</span>
                                    </button>
                                )}
                                {pub.code && (
                                    <a
                                        href={pub.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200 transition-colors hover:bg-accent hover:text-white dark:bg-neutral-900 dark:text-neutral-300 dark:ring-[rgba(148,163,184,0.24)]"
                                    >
                                        <CodeBracketIcon className="h-3.5 w-3.5" />
                                        <span>Code</span>
                                    </a>
                                )}
                            </div>
                            {pub.rank && (
                                <span className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-2 py-1 text-xs font-semibold text-accent shadow-sm">
                                    {pub.rank}
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
