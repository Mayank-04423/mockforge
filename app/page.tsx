export default function Home() {
  return (
    // Main background set to your deepest olive color #3D4127
    <main className="min-h-screen bg-[#3D4127] text-slate-50 p-8 flex flex-col items-center justify-center">
      <div className="text-center max-w-xl">
        
        {/* Badge styled using your mid-tone olive #636B2F with a clean white text opacity border */}
        <span className="text-xs font-bold tracking-widest text-[#D4DE95] uppercase bg-[#636B2F]/40 border border-[#636B2F] px-3 py-1 rounded-full">
          Stage: MVP Construction
        </span>
        
        {/* Heading using a smooth gradient flowing from your sage #BAC095 to bright olive-yellow #D4DE95 */}
        <h1 className="text-5xl font-black tracking-tight mt-4 mb-3 bg-gradient-to-r from-[#BAC095] to-[#D4DE95] bg-clip-text text-transparent">
          🛠️ MockForge
        </h1>
        
        {/* Soft description text using the lighter sage color #BAC095 at a lower opacity for readability */}
        <p className="text-[#BAC095] text-lg font-medium opacity-90">
          A local, schema-driven mock API engine. Build dynamic structures, compile placeholder routes, and unblock frontend architectures.
        </p>
        
      </div>
    </main>
  );
}