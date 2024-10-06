import { useEffect, useRef, useState } from "react";
import InputComponent from "./Input.tsx";
import useChat from "../hooks/useChat";
import { Loader } from "../components/Loader/Loader.tsx";
const Chat = () => {
  const { messages, sendMessage, loading } = useChat();
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      sendMessage(inputValue);
      setInputValue("");
    }
  };
  function focusRef() {
    if (bottomRef.current) {
      bottomRef.current.focus();
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      focusRef();
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col w-full h-full bg-white p-6 rounded-lg border border-[#e5e7eb] overflow-hidden shadow-md">
          <div className="justify-between">
            <div>
              <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
            </div>
            <div></div>
          </div>
          <div className="flex-1 overflow-y-auto pr-4">
            {messages.map((msg, index) => (
              <>
                <div
                  key={index}
                  className="flex gap-3 my-4 text-gray-600 text-sm flex-1"
                >
                  <span className="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16">
                    <div className="rounded-full bg-gray-100 border p-1">
                      <div>
                        {msg.type === "computer" ? (
                          <img
                            src="/plankton_teacher.png"
                            width={50}
                            height={50}
                          ></img>
                        ) : (
                          <svg width={50} height={50} viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  </span>
                  <p className="leading-relaxed">
                    <span className="block font-bold text-gray-700">
                      {msg.type === "computer" ? "Plankty" : "You"}
                    </span>
                    {msg.message}
                  </p>
                </div>
                {msg?.url ? <img src={msg.url}></img> : null}
              </>
            ))}
            {loading && (
              <div style={{ height: "2rem" }}>
                {" "}
                <Loader />{" "}
              </div>
            )}
            <div id="bottomRef" ref={bottomRef} tabIndex={-1}></div>
          </div>
          <div className="w-full flex items-center border-t py-2">
            <InputComponent
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
