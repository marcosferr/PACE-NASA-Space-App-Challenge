import SendIcon from "./SendIcon";
const InputComponent: React.FC = () => {
  return (
    <div className="relative border border-zinc-500 rounded-md">
      <label htmlFor="Prompt" className="sr-only">Write down your prompt</label>

      <input
        type="text"
        id="Prompt"
        placeholder="Write down your prompt"
        className="w-full rounded-md border-gray-200 pe-10 p-2"
      />

      <span
        className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500"
      >
        <SendIcon />
      </span>
    </div>
  );
};

export default InputComponent;