import Navbar from "../components/Navbar";
import AddNote from "../components/AddNote";
import NotesList from "../components/NotesList";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">Hayata bir not bırak!</h1>
        <AddNote />
        <NotesList />
      </div>
    </>
  );
}
