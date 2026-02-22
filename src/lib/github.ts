const GITHUB_USERNAME = "SalShah20";

// Languages to exclude — build tools, config formats, markup that aren't real skills
const LANGUAGE_EXCLUDE = new Set([
  "Makefile",
  "Dockerfile",
  "Shell",
  "Batchfile",
  "PowerShell",
  "CMake",
  "YAML",
  "JSON",
  "TOML",
  "INI",
  "Nix",
  "Vim Script",
  "Vim script",
]);

// Map GitHub language names to display names used in Skills
const LANGUAGE_DISPLAY: Record<string, string> = {
  "C++": "C++",
  "C": "C",
  "C#": "C#",
  "Python": "Python",
  "JavaScript": "JavaScript",
  "TypeScript": "TypeScript",
  "Java": "Java",
  "HTML": "HTML/CSS",
  "CSS": "HTML/CSS",
  "SCSS": "HTML/CSS",
  "MATLAB": "MATLAB",
  "Rust": "Rust",
  "Go": "Go",
  "Ruby": "Ruby",
  "Swift": "Swift",
  "Kotlin": "Kotlin",
  "Assembly": "Assembly",
  "Lua": "Lua",
};

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  visibility: string;
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers: getHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      console.warn(`GitHub API error: ${res.status}`);
      return [];
    }
    const repos: GitHubRepo[] = await res.json();
    return repos.filter((r) => !r.fork && r.visibility === "public");
  } catch (err) {
    console.warn("Failed to fetch GitHub repos:", err);
    return [];
  }
}

/**
 * Aggregates languages across all public non-fork repos.
 * Returns display names sorted by usage (bytes), deduped.
 * Falls back to primary-language-per-repo if no GITHUB_TOKEN is set
 * (to stay under the 60 req/hour unauthenticated limit).
 */
export async function fetchGitHubLanguages(): Promise<string[]> {
  const repos = await fetchGitHubRepos();
  const languageBytes: Record<string, number> = {};

  if (process.env.GITHUB_TOKEN) {
    // Authenticated: fetch detailed breakdown for each repo
    await Promise.all(
      repos.slice(0, 30).map(async (repo) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
            { headers: getHeaders(), next: { revalidate: 3600 } }
          );
          if (!res.ok) return;
          const langs: Record<string, number> = await res.json();
          for (const [lang, bytes] of Object.entries(langs)) {
            if (!LANGUAGE_EXCLUDE.has(lang)) {
              languageBytes[lang] = (languageBytes[lang] ?? 0) + bytes;
            }
          }
        } catch {}
      })
    );
  } else {
    // Unauthenticated: use primary language field only (1 API call total)
    for (const repo of repos) {
      if (repo.language && !LANGUAGE_EXCLUDE.has(repo.language)) {
        languageBytes[repo.language] = (languageBytes[repo.language] ?? 0) + 1;
      }
    }
  }

  const sorted = Object.entries(languageBytes)
    .sort(([, a], [, b]) => b - a)
    .map(([lang]) => LANGUAGE_DISPLAY[lang] ?? lang);

  // Dedupe (e.g. HTML and CSS both map to "HTML/CSS")
  return [...new Set(sorted)];
}
