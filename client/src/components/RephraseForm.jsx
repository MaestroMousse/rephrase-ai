import { useState } from "react";

function RephraseForm() {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("");
  const [context, setContext] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input || !style || !context) {
      setError("Please fill out all fields");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    try {
      const response = await fetch("/api/rephrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, style, context }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Rephrasing could not be completed");
      setResult(data.rephrasedInput);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Rephrase AI</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter your text</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Type your message or email here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Style</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Context</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="business email">Business email</option>
            <option value="casual message">Casual Message</option>
            <option value="formal letter">Formal Letter</option>
            <option value="social media post">Social Media</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Rephrase my sentence!"
          )}
        </button>
      </form>
      {error && (
        <div className="alert alert-error mt-4">
          <span>{error}</span>
        </div>
      )}
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Rephrased Text</h2>
          <div className="p-4 bg-base-100 rounded-lg shadow">
            <p>{result}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RephraseForm;
