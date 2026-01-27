import { GithubIcon } from "./base/GithubIcon";
import { MailIcon } from "./base/MailIcon";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black py-12 text-center md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-12">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="text-xl font-bold tracking-tight text-white">
            CHOOSLA
          </span>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Choo ChangWoo. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/choosla"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <div className="rounded-full bg-white/5 p-2 transition-colors group-hover:bg-white/10">
              <GithubIcon className="h-5 w-5" />
            </div>
            <span className="hidden text-sm font-medium sm:block">GitHub</span>
          </a>

          <a
            href="mailto:ccw.oopsla@gmail.com"
            className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <div className="rounded-full bg-white/5 p-2 transition-colors group-hover:bg-white/10">
              <MailIcon className="h-5 w-5" />
            </div>
            <span className="hidden text-sm font-medium sm:block">Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
