import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Instant <span className="text-[hsl(280,100%,70%)]">Dashboards</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Upload your owb excel file with clear headers and readable data.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Customisation →</h3>
            <div className="text-lg">
              Pick between the most suitable widgets to display your data.
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link className="text-lg text-white hover:underline" href="/setup">
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
