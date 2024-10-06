import React from "react";
import SendIcon from "./icons/SendIcon";

interface InputComponentProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
}) => {
  return (
    <div className="relative border border-zinc-500 rounded-md w-full">
      <label htmlFor="Prompt" className="sr-only">
        Ask your question to Plankty
      </label>

      <input
        type="text"
        id="Prompt"
        placeholder="Ask your question to Plankty"
        className="w-full rounded-md border-gray-200 pe-10 p-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />

      <span
        className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500"
        onClick={handleSendMessage}
      >
        <SendIcon />
      </span>
    </div>
  );
};

export default InputComponent;
