import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { fetchGitHubRepos, fetchGitHubLanguages } from "@/lib/github";

// Revalidate GitHub data every hour in production (ISR).
// No rebuild needed — Next.js serves stale data then refreshes in the background.
export const revalidate = 3600;

export default async function Home() {
  const [githubLanguages, githubRepos] = await Promise.all([
    fetchGitHubLanguages(),
    fetchGitHubRepos(),
  ]);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects githubRepos={githubRepos} />
      <Skills githubLanguages={githubLanguages} />
      <Contact />
    </main>
  );
}
