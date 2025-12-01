import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advanced Spanish Classes with Belén Martínez',
  description: 'Master real Spanish with a specialized Mexican teacher for advanced students who want to perfect their fluency, precision, and natural expression.',
  openGraph: {
    title: 'Advanced Spanish Classes with Belén Martínez',
    description: 'Master real Spanish with a specialized Mexican teacher for advanced students who want to perfect their fluency, precision, and natural expression.',
  },
};

export default function AdvancedSpanishClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-gray-200">
      <div className="max-w-[880px] mx-auto px-4 py-8 pb-12">
        <header className="text-left mb-8">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-500 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            1:1 Spanish coaching for advanced learners
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2.5 tracking-wide">
            Advanced Spanish Classes with Belén Martínez
          </h1>
          
          <p className="text-base text-gray-400 max-w-[600px]">
            Master real Spanish with a specialized teacher for advanced students who
            want to perfect their fluency, precision, and natural expression.
          </p>

          <div className="mt-6 grid md:grid-cols-[2fr_1.6fr] gap-5 items-center p-5 rounded-2xl bg-gradient-to-br from-slate-800/95 to-slate-800/80 border border-slate-600/30">
            <div className="text-sm">
              <p>
                <strong className="font-semibold">Write to me:</strong> WhatsApp only — no SMS<br />
                <span className="text-gray-400">+52 220 280 9637</span>
              </p>
              <p className="mt-2">
                <strong className="font-semibold">Email me for more information:</strong><br />
                <span className="text-gray-400">hablandoconbelen@gmail.com</span>
              </p>
            </div>

            <div className="flex flex-col gap-2.5 text-sm bg-gradient-radial from-slate-700 to-slate-950 rounded-2xl p-4 border border-slate-700/80">
              <div className="text-gray-400 text-xs uppercase tracking-wider">
                Start your next level in Spanish
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/35 hover:shadow-orange-500/45 hover:-translate-y-0.5 transition-all"
                  href="https://wa.me/522202809637"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-whatsapp"
                >
                  Message me on WhatsApp
                </a>
                <a
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium border border-slate-500/50 text-gray-200 bg-slate-800/80 hover:bg-slate-700/90 hover:-translate-y-0.5 transition-all"
                  href="mailto:hablandoconbelen@gmail.com"
                  data-testid="link-email"
                >
                  Email me for details
                </a>
              </div>
              <p className="text-sm text-gray-400">
                I only work 1:1 with committed, advanced students who want{' '}
                <span className="text-orange-500 font-medium">real progress</span>.
              </p>
            </div>
          </div>
        </header>

        <main className="mt-8 flex flex-col gap-6">
          <section className="rounded-2xl bg-slate-800/90 border border-slate-700 p-5">
            <h2 className="text-lg font-semibold mb-2.5">Hi, I'm Belén.</h2>
            <p className="text-sm mb-2">
              I'm a Mexican Spanish teacher with more than five years of experience
              teaching advanced students from all over the world.
            </p>
            <p className="text-sm">I specialize in:</p>
            <ul className="ml-5 mt-1.5 mb-1 list-disc text-sm space-y-1">
              <li>Advanced conversation</li>
              <li>Direct and indirect objects</li>
              <li>Subjunctive</li>
              <li>Past subjunctive</li>
              <li>Verbal periphrasis</li>
              <li>Preparation for interviews, presentations, and real-life situations</li>
            </ul>
            <p className="text-sm">
              I only teach 1:1 classes to guarantee clear, personalized, and
              measurable progress in every session.
            </p>
          </section>

          <section className="rounded-2xl bg-slate-800/90 border border-slate-700 p-5">
            <h2 className="text-lg font-semibold mb-2.5">Watch a Sample Class</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ooOG3V05Vz4"
                title="Sample Spanish Class with Belén"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          <section className="rounded-2xl bg-slate-800/90 border border-slate-700 p-5">
            <h2 className="text-lg font-semibold mb-2.5">What are my classes like?</h2>
            <p className="text-sm mb-2">
              Fully personalized sessions focused on your real goals: conversation,
              advanced grammar, final corrections, natural language use, professional
              Spanish, and more.
            </p>
            <ul className="ml-5 mt-1.5 mb-1 list-disc text-sm space-y-1">
              <li>
                Detailed corrections, clear explanations, and exercises adapted to
                your learning style
              </li>
              <li>Exclusive materials (audio, exercises, interactive practice)</li>
              <li>
                Constant follow-up: personalized study plan and homework designed
                just for you
              </li>
              <li>
                A clear, structured, and proven method, built over years of helping
                advanced students "break the ceiling" of their Spanish
              </li>
            </ul>
            <p className="text-sm">
              These classes are designed for students who truly want to reach the
              next level and value professional, deep, and personalized support.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-5">
            <section className="rounded-2xl bg-slate-800/90 border border-slate-700 p-5">
              <h2 className="text-lg font-semibold mb-2.5">My classes are ideal for you if…</h2>
              <ul className="ml-5 list-disc text-sm space-y-1">
                <li>You already have an intermediate/advanced level</li>
                <li>
                  You want to work on your Spanish daily with the exercises I send you
                </li>
                <li>
                  You need professional Spanish (work, daily life, travel,
                  presentations)
                </li>
              </ul>
            </section>
            
            <section className="rounded-2xl bg-slate-800/90 border border-slate-700 p-5">
              <h2 className="text-lg font-semibold mb-2.5">These classes are NOT for you if…</h2>
              <ul className="ml-5 list-disc text-sm space-y-1">
                <li>You're starting from zero</li>
                <li>You only want casual conversation without guidance or corrections</li>
                <li>You don't plan to commit to homework or ongoing practice</li>
              </ul>
            </section>
          </div>

          <section className="rounded-2xl bg-slate-800/90 border border-slate-700 p-5">
            <h2 className="text-lg font-semibold mb-2.5">How do the sessions work?</h2>
            <ul className="ml-5 list-disc text-sm space-y-1">
              <li>Duration: 50 minutes</li>
              <li>Platform: Zoom or Google Meet</li>
              <li>Personalized plan from the first class</li>
              <li>Constant feedback and practice between sessions</li>
              <li>
                Materials included (PDFs, audios, transcripts, corrections, extra
                practices)
              </li>
            </ul>
          </section>

          <section className="rounded-2xl bg-slate-800/90 border border-slate-700 p-5 text-left">
            <h2 className="text-lg font-semibold mb-2.5">Do you want 1:1 classes with me?</h2>
            <p className="text-sm mb-2">
              Send me a message to receive full information about:
            </p>
            <ul className="ml-5 list-disc text-sm space-y-1 mb-4">
              <li>availability</li>
              <li>enrollment process</li>
              <li>payment methods</li>
              <li>booking options</li>
              <li>first steps</li>
            </ul>

            <p className="text-sm">
              <span className="mr-1">👉</span> WhatsApp:{' '}
              <a
                href="https://wa.me/522202809637"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                +52 220 280 9637
              </a>
              <br />
              <span className="mr-1">👉</span> Email:{' '}
              <a
                href="mailto:hablandoconbelen@gmail.com"
                className="text-orange-500 hover:underline"
              >
                hablandoconbelen@gmail.com
              </a>
            </p>
          </section>
        </main>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
            data-testid="link-back-home"
          >
            ← Back to Spanish Listening
          </Link>
        </div>
      </div>
    </div>
  );
}
