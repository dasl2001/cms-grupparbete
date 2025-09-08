export default function TopStrip({ blok }) {
  return (
    <div className="bg-black text-white flex justify-center">
      <div className="w-[1400px] h-[60px] px-4 flex items-center text-[12px]">
        <div className="w-1/3 truncate">{blok.left_text}</div>
        <div className="w-1/3 text-center truncate">{blok.center_text}</div>
        <div className="w-1/3 text-right truncate">{blok.right_text}</div>
      </div>
    </div>
  );
}

