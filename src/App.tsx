import { nanoid } from "nanoid";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select } from "react-daisyui";
import { SettingsContext } from "./contexts/SettingsContext";
import { BookFactory, Section } from "./nkp/book";

function App() {
  const settings = useContext(SettingsContext);
  const [book, setBook] = useState(settings.getSelectedBook());
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!visible);
  const changeBook = (fileName: string) => {
    settings.setSelectedBook(fileName);
    setBook(BookFactory.getBook(fileName));
  };
  const filterSection = (index: number, filter: boolean) => {
    settings.setSelectedSection(book, index, filter);
  }


  useEffect(() => {
    if (book === undefined) {
      return;
    }
    
    console.log(book);
  }, [book]);

  return (
    <div className="text-gray-300 pt-10 lg:w-1/3 lg:h-screen">
      <h1 className="text-3xl font-bold text-center">Szöveggyűjtemény</h1>

      <div className="bg-slate-800 mt-10 p-5 rounded-xl h-3/4">
        <div className="grid grid-cols-2 gap-3">
          <Select onChange={changeBook} defaultValue={book?.getFileName() || ""}>
            <option value={""} disabled key={nanoid()}>Válaszd ki az évfolyamot</option>
            <option value={"grade_9"} key={nanoid()}>9. osztály</option>
          </Select>

          {
            book && (<>
              <Input type="number" min={1} max={20} placeholder="Idézetek száma" />
              <Button color="info" onClick={toggleVisible}>Versek szűrése</Button>
              <Button color="info">Teszt készítése</Button>
            </>)
          }


        </div>

        {
          book && (
            <div className="mt-5">
              amogus
            </div>
          )
        }
      </div>

      <Modal open={visible} onClickBackdrop={() => setVisible(false)} className="bg-slate-800">
        <Modal.Header className="font-bold">
          Versek szűrése
        </Modal.Header>

        <Modal.Body>
          <Form className="grid grid-cols-2 gap-2">
            {
              book && book.getSections().map((section, index) => (
                <Form.Label className="bg-slate-900 rounded-xl gap-2 p-2" title={section.getAuthor() + " - " + section.getTitle()}>
                  <Checkbox color="accent" defaultChecked={settings.isSelectedSection(book, index)}  key={nanoid()} onClick={(e: any) => filterSection(index, e.target.checked)} />
                </Form.Label>
              ))
            }
          </Form>
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={toggleVisible} color="accent">Szűrés</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default App;
