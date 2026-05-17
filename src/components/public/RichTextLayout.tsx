'use client';

import React from 'react';

interface RichTextLayoutProps {
  content: string | undefined | null;
  variant?: 'light' | 'dark';
  className?: string;
}

export default function RichTextLayout({ content, variant = 'light', className = '' }: RichTextLayoutProps) {
  if (!content) return null;

  const isDark = variant === 'dark';

  // Clean all non-breaking spaces (both HTML entity &nbsp; and unicode \u00A0)
  // to allow proper fluid line wrapping at space boundaries instead of splitting words in half
  const formattedContent = content
    .replace(/&nbsp;/g, ' ')
    .replace(/\u00A0/g, ' ');

  return (
    <div 
      className={`prose prose-lg max-w-none transition-colors duration-500
                 break-words w-full max-w-full overflow-hidden
                 [word-break:keep-all] [overflow-wrap:break-word] [hyphens:none] [-webkit-hyphens:none] [-ms-hyphens:none]
                 ${isDark ? 'prose-invert' : 'prose-zinc'}
                 prose-headings:font-serif prose-headings:italic prose-headings:text-gold
                 prose-headings:break-words
                 ${isDark ? 'prose-p:text-white/80' : className.includes('prose-p') ? '' : 'prose-p:text-zinc-600'}
                 prose-p:leading-relaxed
                 ${isDark ? 'prose-li:text-white/70' : className.includes('prose-li') ? '' : 'prose-li:text-zinc-500'}
                 ${isDark ? 'prose-strong:text-white' : className.includes('prose-strong') ? '' : 'prose-strong:text-zinc-900'}
                 prose-strong:font-semibold
                 prose-a:text-gold hover:prose-a:text-gold/80
                 prose-a:break-words
                 ${className}`}
      style={{
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
        hyphens: 'none',
        WebkitHyphens: 'none',
        msHyphens: 'none',
      }}
      dangerouslySetInnerHTML={{ __html: formattedContent }} 
    />
  );
}
