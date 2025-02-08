export default function Header() {
  return (
    <div
      className="
      text-rgba[(0,71,255)] 
      sticky top-0 
      z-50 
      flex 
      h-[55px] 
      justify-between
      bg-none
      p-3
      "
    >
      <div>
        <p className="cursor-pointer text-2xl font-bold">YOBESTUDIO</p>
      </div>
      <div className="flex space-x-4 text-sm">
        <p className="mt-[0.3rem] cursor-pointer hover:text-[rgba(155,155,155,1)]">
          Photography
        </p>
        <p className="mt-[0.3rem] cursor-pointer hover:text-[rgba(155,155,155,1)]">
          FilmMaking
        </p>
      </div>
    </div>
  );
}
