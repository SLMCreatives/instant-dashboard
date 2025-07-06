import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#dfdfdf]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flexflex-col items-center gap-4 py-10">
          <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Upload</span> Now
          </h1>
          <div className="text-lg text-gray-700">
            Upload your own excel file with clear headers and readable data.
          </div>
          <div className="text-lg">
            <form action="submit" className="flex flex-col items-center">
              <Label
                htmlFor="dropzone-file"
                className="mt-10 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    .xls, .xlsx, .csv (max. 10MB)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </Label>
              <Button
                variant={"link"}
                size={"lg"}
                className="fixed bottom-10 mt-4 w-full max-w-md opacity-30 hover:opacity-100"
                asChild
              >
                <Link href="/dashboard">Test</Link>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
