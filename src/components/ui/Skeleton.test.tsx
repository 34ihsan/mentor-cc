import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skeleton, { DashboardSkeleton } from './Skeleton';
import React from 'react';

describe('Skeleton Component', () => {
  it('renders correctly with default classes', () => {
    const { container } = render(<Skeleton />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('animate-pulse');
    expect(div).toHaveClass('bg-slate-200');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('custom-class');
  });
});

describe('DashboardSkeleton Component', () => {
  it('renders multiple skeleton blocks', () => {
    const { container } = render(<DashboardSkeleton />);
    // Initial div, then search for skeleton blocks
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(5);
  });
});
