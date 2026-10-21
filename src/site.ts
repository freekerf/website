// Project links used across the site. Nothing derived (versions, installers) is
// written here: it comes from the releases (src/data/releases.ts).

export const ORG = 'freekerf';
export const APP_REPO = `${ORG}/freekerf`;
export const GITHUB = `https://github.com/${ORG}`;

export const LINKS = {
  app: `${GITHUB}/freekerf`,
  releases: `${GITHUB}/freekerf/releases`,
  issues: `${GITHUB}/freekerf/issues/new`,
  plan: `${GITHUB}/freekerf/blob/main/PLAN.md`,
  guide: `${GITHUB}/freekerf/blob/main/AGENTS.md`,
  license: `${GITHUB}/freekerf/blob/main/LICENSE`,
  conformance: `${GITHUB}/conformance`,
  design: `${GITHUB}/design`,
  library: `${GITHUB}/library`,
  website: `${GITHUB}/website`,
  lasergrbl: 'https://github.com/arkypita/LaserGRBL',
} as const;
