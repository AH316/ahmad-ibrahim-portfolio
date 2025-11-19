/**
 * Open Graph Image Component
 *
 * Programmatic OG image (1200x630px) that dynamically pulls data from lib/content.ts
 * This component can be rendered in a headless browser to generate the OG image screenshot.
 *
 * Data Points Pulled:
 * - personalInfo.name
 * - personalInfo.tagline
 * - experiences[0].title (latest job title)
 * - experiences[0].company (latest company)
 * - Calculated: Years of experience (from earliest job to now)
 * - Calculated: Total number of projects
 * - Calculated: Total unique skills count
 */

import React from 'react';
import { personalInfo, experiences, projects, skillCategories, additionalSkills } from '../lib/content';

// Calculate years of experience from earliest job to now
const calculateYearsOfExperience = (): number => {
  // Parse all start dates from experience periods
  const startDates = experiences.map(exp => {
    // Extract start date from period (e.g., "January 2025 – September 2025" or "April 2023 – June 2024")
    const periodParts = exp.period.split('–');
    const startDateStr = periodParts[0].trim();
    return new Date(startDateStr);
  });

  // Find earliest start date
  const earliestDate = new Date(Math.min(...startDates.map(d => d.getTime())));
  const now = new Date();

  // Calculate difference in years
  const yearsDiff = now.getFullYear() - earliestDate.getFullYear();
  const monthsDiff = now.getMonth() - earliestDate.getMonth();

  // If we haven't passed the start month yet this year, subtract 1
  return monthsDiff < 0 ? yearsDiff - 1 : yearsDiff;
};

// Calculate total unique skills
const calculateTotalSkills = (): number => {
  // Collect all skills from categories
  const categorySkills = skillCategories.flatMap(category =>
    category.skills.map(skill => skill.name)
  );

  // Combine with additional skills
  const allSkills = [...categorySkills, ...additionalSkills];

  // Get unique skills
  const uniqueSkills = new Set(allSkills);

  return uniqueSkills.size;
};

// Data from content.ts
const ogData = {
  name: personalInfo.name,
  tagline: personalInfo.tagline.split('|')[0].trim(), // "Software Developer"
  latestJobTitle: experiences[0].title,
  latestCompany: experiences[0].company,
  yearsOfExperience: calculateYearsOfExperience(),
  projectsCount: projects.length,
  skillsCount: calculateTotalSkills(),
};

export const OGImage: React.FC = () => {
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        backgroundColor: '#1a1a1a',
        backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 80px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* White Tree Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '400px',
          opacity: 0.08,
          color: '#f9fafb',
          fontWeight: 'bold',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        ⚜
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Name */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#f9fafb',
            margin: '0 0 16px 0',
            fontFamily: 'Cinzel, serif',
            letterSpacing: '2px',
          }}
        >
          {ogData.name}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: '36px',
            color: '#eeeff1',
            margin: '0 0 32px 0',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '300',
          }}
        >
          {ogData.tagline}
        </p>

        {/* Current Role with Gold Accent */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '32px',
          }}
        >
          <div
            style={{
              width: '4px',
              height: '40px',
              backgroundColor: '#d6b13a',
              borderRadius: '2px',
            }}
          />
          <p
            style={{
              fontSize: '28px',
              color: '#d6b13a',
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
            }}
          >
            {ogData.latestJobTitle} @ {ogData.latestCompany}
          </p>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Gold Accent Line */}
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(214, 177, 58, 0.3)',
            marginBottom: '24px',
          }}
        />

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '60px' }}>
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#d6b13a',
                  margin: '0 0 8px 0',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {ogData.yearsOfExperience}+
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#eeeff1',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '300',
                }}
              >
                Years Experience
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#d6b13a',
                  margin: '0 0 8px 0',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {ogData.projectsCount}
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#eeeff1',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '300',
                }}
              >
                Projects
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#d6b13a',
                  margin: '0 0 8px 0',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {ogData.skillsCount}+
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#eeeff1',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '300',
                }}
              >
                Skills
              </p>
            </div>
          </div>

          {/* Website/Portfolio Label */}
          <div style={{ textAlign: 'right' }}>
            <p
              style={{
                fontSize: '20px',
                color: '#eeeff1',
                margin: 0,
                fontFamily: 'Inter, sans-serif',
                fontWeight: '300',
                opacity: 0.7,
              }}
            >
              ahmadibrahim.dev
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OGImage;
