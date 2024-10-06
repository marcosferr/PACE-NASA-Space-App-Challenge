import { useEffect, useRef, useState } from "react";
import InputComponent from "./Input.tsx";
import useChat from "../hooks/useChat";
import { Loader } from "../components/Loader/Loader.tsx";
import UserIcon from "./icons/UserIcon.tsx";
import ImageModal from "./ImageModal.tsx";
const Chat = () => {
  const { messages, sendMessage, loading } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col w-full h-full bg-white p-6 rounded-lg border border-[#e5e7eb] overflow-hidden shadow-md">
          <div className="justify-between">
            <div>
              <h2 className="font-semibold text-lg tracking-tight">
                Plankty 🎓🦠
              </h2>
            </div>
            <div></div>
          </div>
          <div className="flex-1 pr-4 max-h-[670px] overflow-auto">
            {messages.map((msg, index) => (
              <>
                <div
                  ref={messages.length - 1 === index ? lastMessageRef : null}
                  key={index}
                  className="flex gap-3 my-4 text-gray-600 text-sm flex-1"
                >
                  <span className="relative flex shrink-0 overflow-hidden rounded-full size-12">
                    <div className="rounded-full bg-gray-100 border p-1">
                      <div>
                        {msg.type === "computer" ? (
                          <img
                            src="/plankton_teacher.png"
                            width={50}
                            height={50}
                          ></img>
                        ) : (
                          <UserIcon />
                        )}
                      </div>
                    </div>
                  </span>
                  <p className="leading-relaxed break-words">
                    <span className="block font-bold text-gray-700">
                      {msg.type === "computer" ? "Plankty" : "You"}
                    </span>
                    {msg.message}
                  </p>
                </div>
                {msg.urls && (
                  <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                    {msg.urls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        className="rounded-lg cursor-pointer"
                        width={300}
                        height={300}
                        onClick={() => openModal(url)}
                      />
                    ))}{" "}
                  </div>
                )}
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
        {selectedImage && (
          <ImageModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            imageUrl={selectedImage}
          />
        )}
      </div>
    </>
  );
};

export default Chat;
