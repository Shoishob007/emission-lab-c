export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-96px)] w-full px-2">
      <div className="relative group w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
        {/* Glowing animated border */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-lime-500 blur-lg opacity-80 group-hover:opacity-90 animate-grow" />
        <div className="relative bg-white/90 dark:bg-[#23263a] border-2 border-primary rounded-2xl px-4 sm:px-10 py-8 text-center shadow-xl w-full">
          <span className="block text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-lime-500 animate-bounce-slow mb-3 break-words">
            Coming Soon
          </span>
          <span className="block text-base text-[#767676] font-medium mt-1 break-words">
            We will get back to you!
          </span>
        </div>
      </div>
    </div>
  );
}
