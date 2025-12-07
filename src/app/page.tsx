import { Chat } from "@/components/chat";
import { MioLogo } from "@/components/mio-logo";

export default function Home() {
  return (
    <div className="h-screen w-screen p-6 sm:p-8 md:p-12 bg-background">
      <div className="h-full w-full rounded-xl border-2 border-primary flex flex-col overflow-hidden bg-card">
        <header className="flex items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <MioLogo className="text-4xl" />
            <h3 className="text-sm font-semibold tracking-widest text-primary/70 -mt-1">
              Powered by Studygram
            </h3>
          </div>
        </header>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent shrink-0" />
        <main className="flex-1 min-h-0">
          <Chat />
        </main>
      </div>
    </div>
  );
}
