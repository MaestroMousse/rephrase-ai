import RephraseForm from "./components/RephraseForm";

export default function App() {
  return (
    <div className="min-h-screen bg-grey-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
        <RephraseForm />
      </div>
    </div>
  );
}
