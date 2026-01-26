export function Header() {
  return (
    <header
      id="header"
      className="fixed top-0 left-0 w-full z-10 bg-neutral-800 border-b-2 border-green-500"
    >
      <div className="container fade-in-3 transition duration-[3500ms] relative z-50">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-white text-lg font-poppins">Book Finder</h1>
        </div>
      </div>
    </header>
  );
}
