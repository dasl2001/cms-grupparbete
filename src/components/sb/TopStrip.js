export default function TopStrip({ blok }) {
  return (
    <div className="bg-black text-white text-[12px]">
      <div className="mx-auto max-w-6xl h-8 px-4 flex items-center">
        <div className="w-1/3 truncate">{blok.left_text}</div>
        <div className="w-1/3 text-center truncate">{blok.center_text}</div>
        <div className="w-1/3 text-right truncate">{blok.right_text}</div>
      </div>
    </div>
  );
}

