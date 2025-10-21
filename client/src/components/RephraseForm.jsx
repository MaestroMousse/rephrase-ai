import { useState } from "react";

function RephraseForm() {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("");
  const [context, setContext] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Rephrase AI</h1>
      <form className="space-y-4">
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
            value={style}
            onChange={(e) => setStyle(e.target.value)}
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
      </form>
    </div>
  );
}

export default RephraseForm;
