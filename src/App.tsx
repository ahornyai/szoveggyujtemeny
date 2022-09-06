import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Modal, Select } from "react-daisyui";
import { BookFactory } from "./nkp/book";

function App() {
  const [book, setBook] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!visible);

  useEffect(() => {
    if (book.trim() == "") {
      return;
    }
    
    const bookInstance = BookFactory.getBook(book);

    console.log(bookInstance);
  }, [book]);

  return (
    <div className="text-gray-300 pt-10 lg:w-1/3 lg:h-screen">
      <h1 className="text-3xl font-bold text-center">Szöveggyűjtemény</h1>

      <div className="bg-slate-800 mt-10 p-5 rounded-xl h-3/4">
        <div className="grid grid-cols-2 gap-3">
          <h2 className="text-2xl font-bold mt-1">Teszt készítése</h2>

          <Select onChange={setBook} defaultValue={""}>
            <option value={""} disabled key={nanoid()}>Válaszd ki az évfolyamot</option>
            <option value={"grade_9"} key={nanoid()}>9. osztály</option>
          </Select>

          {
            book.trim() !== "" && (
              <Button onClick={toggleVisible}>Versek szűrése</Button>
            )
          }


        </div>

        {
          book.trim() !== "" && (
            <div className="mt-5">
              amogus
            </div>
          )
        }
      </div>

      <Modal open={visible} className="bg-slate-800">
        <Modal.Header className="font-bold">
          Versek szűrése
        </Modal.Header>

        <Modal.Body>
          <Form className="grid grid-cols-2 gap-2">
            {
              book && BookFactory.getBook(book).getSections.map((section, index) => (
                <Form.Label className="bg-slate-900 rounded-xl gap-2 p-2" title={section.getAuthor() + " - " + section.getTitle()}>
                  <Checkbox color="accent" key={nanoid()} />
                </Form.Label>
              ))
            }
          </Form>
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={toggleVisible}>Yay!</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default App;
