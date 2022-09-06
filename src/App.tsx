import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Select } from "react-daisyui";

function App() {
  const [book, setBook] = useState("");

  useEffect(() => {
    if (book.trim() === "") {
      return;
    }
    
    console.log(book);
  }, [book]);

  return (
    <div className="text-gray-300 pt-10 lg:w-1/3">
      <h1 className="text-3xl font-bold text-center">Szöveggyűjtemény</h1>

      <div className="bg-slate-800 mt-10 p-5 rounded-xl">
        <h2 className="text-2xl font-bold">Teszt készítése</h2>

        <div className="mt-5">
          <Select onChange={setBook} defaultValue={""}>
            <option value={""} disabled key={nanoid()}>Válaszd ki az évfolyamot</option>
            <option value={"irodalom_9_szoveggyujtemeny_nat2020"} key={nanoid()}>9. osztály</option>
          </Select>

          
        </div>
      </div>
    </div>
  );
}

export default App;
