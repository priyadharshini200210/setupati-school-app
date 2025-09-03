import React from 'react';
import { render, cleanup, within } from '@testing-library/react';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';

// ensure React is available globally for modules that expect classic JSX runtime
(globalThis as { React?: typeof React }).React = React;

// test-scoped state / spies
let role = 'dashboard';
const initializeSampleDataSpy = vi.fn();

async function loadComponentAfterMock() {
  vi.resetModules();

  // mock school store (initializeSampleData used by the component)
  await vi.doMock('@/store/schoolStore', () => ({
    useSchoolStore: () => ({ activeView: 'dashboard' }),
    initializeSampleData: initializeSampleDataSpy
  }));

  // mock auth store (MainLayout switches on `role`)
  await vi.doMock('@/store/authStore', () => ({
    useAuthStore: () => ({ role })
  }));

  // prevent real firebase initialization and router/hooks issues
  await vi.doMock('@/lib/firebase', () => ({}));
  await vi.doMock('@/components/Layout/Header', () => ({
    Header: () => React.createElement('div', { 'data-testid': 'mock-header' })
  }));
  await vi.doMock('@/components/Layout/Sidebar', () => ({
    Sidebar: () => React.createElement('div', { 'data-testid': 'mock-sidebar' })
  }));

  const mod = await import('../../src/components/Layout/MainLayout');
  return mod.MainLayout as React.ComponentType;
}

describe('MainLayout', () => {
  beforeEach(() => {
    initializeSampleDataSpy.mockReset();
    role = 'dashboard';
  });

  afterEach(() => {
    cleanup();
  });

  it('calls initializeSampleData on mount', async () => {
    role = 'subjects';
    const MainLayout = await loadComponentAfterMock();
    render(<MainLayout />);
    expect(initializeSampleDataSpy).toHaveBeenCalled();
  });

  const cases: Array<[string, string]> = [
    ['subjects', 'Subjects Management'],
    ['attendance', 'Attendance Tracking'],
    ['timetable', 'Timetable Management'],
    ['circulars', 'Circulars & Announcements'],
    ['settings', 'Settings']
  ];

  for (const [r, expectedText] of cases) {
    it(`renders expected content for role="${r}"`, async () => {
      role = r;
      const MainLayout = await loadComponentAfterMock();
      const { container } = render(<MainLayout />);

      const main = container.querySelector('main');
      expect(main).not.toBeNull();
      const withinMain = within(main!);
      const regex = new RegExp(expectedText, 'i');

      // Prefer accessible heading; if not present, fallback to any matching text inside <main>
      const heading = withinMain.queryByRole('heading', { name: regex });
      if (heading) {
        expect(heading).toBeDefined();
      } else {
        const matches = withinMain.queryAllByText(regex);
        expect(matches.length).toBeGreaterThan(
          0,
          `Expected to find text "${expectedText}" inside <main> for role "${r}"`
        );
      }

      expect(initializeSampleDataSpy).toHaveBeenCalled();
    });
  }

  it('renders layout containers (sidebar/header/main) structure', async () => {
    role = 'subjects';
    const MainLayout = await loadComponentAfterMock();
    const { container } = render(<MainLayout />);
    const root = container.firstChild as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root!.className).toContain('flex');
    const main = container.querySelector('main');
    expect(main).not.toBeNull();
  });
});
