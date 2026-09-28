import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-[#f5f5f7] px-6 text-center select-none">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c0608] border border-[#ff1e27]/30 text-[11px] font-mono tracking-[0.25em] text-[#ff3344] mb-6">
        404 // TRANSMISSION VOID
      </div>
      <h1 className="font-extrabold text-5xl sm:text-7xl tracking-widest text-white uppercase font-['Syne',sans-serif]">
        BRIIZZ
      </h1>
      <p className="mt-4 text-sm font-mono text-neutral-400 tracking-wider">
        THE REQUESTED SECTOR DOES NOT EXIST IN THIS TIMELINE.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded-full bg-[#ff1e27] text-white font-bold text-xs tracking-widest uppercase hover:bg-[#ff3344] transition-all font-mono"
      >
        RETURN TO CORE
      </Link>
    </div>
  );
}
