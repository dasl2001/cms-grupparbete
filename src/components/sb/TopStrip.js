export default function TopStrip({ blok }) {
  return (

/*
Yttre wrapper: svart bakgrund, vit text, innehållet centrerat
*/
    <div className="bg-black text-white flex justify-center">

{/* 
Inre container: fast bredd (1400px), höjd (60px), padding på sidorna 
*/}        
      <div className="w-[1400px] h-[60px] px-4 flex items-center text-[12px]">

 {/* 
 Vänstra kolumnen (1/3 av bredden) 
 */}        
        <div className="w-1/3 truncate">{blok.left_text}</div>

{/* 
Mittenkolumnen (1/3 av bredden, text centrerad) 
*/}       
        <div className="w-1/3 text-center truncate">{blok.center_text}</div>

{/* 
Högra kolumnen (1/3 av bredden, text högerställd) 
*/}
        <div className="w-1/3 text-right truncate">{blok.right_text}</div>
      </div>
    </div>
  );
}

