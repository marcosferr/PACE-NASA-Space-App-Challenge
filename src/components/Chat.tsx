import { useEffect, useRef, useState } from "react";
import InputComponent from "./Input.tsx";
import useChat from "../hooks/useChat";
import { Loader } from "../components/Loader/Loader.tsx";
import UserIcon from "./icons/UserIcon.tsx";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "../CardCarousel.css";

const Chat = () => {
  const { messages, sendMessage, loading } = useChat();

  const [inputValue, setInputValue] = useState("");
  const [messageToSend, setMessageToSend] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lightGalleryRef = useRef<any>(null);

  const openGallery = (index: number) => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(index);
    }
  };

  const setFollowupQuestion = (question: string) => {
    setInputValue(question);
    setMessageToSend(true);
  };

  useEffect(() => {
    if (messageToSend && !loading) {
      handleSendMessage();
      setMessageToSend(false);
    }
  }, [messageToSend, loading, handleSendMessage]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="chat-container flex flex-col h-full">
        <div className="flex flex-col w-full h-full bg-white p-6 rounded-lg border border-[#e5e7eb] overflow-hidden shadow-md">
          <div className="justify-between">
            <div>
              <h2 className="font-semibold text-lg tracking-tight">
                Plankty 🎓🦠
              </h2>
            </div>
            <div></div>
          </div>
          <div className="flex-1 pr-4 max-h-[700px] overflow-auto overflow-x-hidden my-auto">
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
                        className="rounded-lg cursor-pointer hover:brightness-90 transform transition duration-300 ease-in-out"
                        width={300}
                        height={300}
                        onClick={() => openGallery(index)}
                      />
                    ))}{" "}
                  </div>
                )}
                {msg.references && (
                  <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                    {msg.references.map((item, index) => (
                      <a key={index} href={item?.url} target="_blank">
                        {item?.label}
                      </a>
                    ))}
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
            {messages.length > 0 &&
              messages[messages.length - 1].followup_questions && (
                <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                  {messages[messages.length - 1].followup_questions?.map(
                    (question, index) => (
                      <button
                        key={index}
                        className="text-blue-500 underline"
                        onClick={() => setFollowupQuestion(question)}
                      >
                        {question}
                      </button>
                    )
                  )}
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
        <div className="overflow-hidden">
          <LightGallery
            onInit={(detail) => (lightGalleryRef.current = detail.instance)}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            dynamic
            dynamicEl={messages
              .filter((msg) => msg.urls && msg.urls.length > 0) // Filter out messages without URLs
              .flatMap(
                (msg) =>
                  msg.urls?.map((url) => ({
                    src: url,
                    thumb: url,
                    subHtml: `<h4>${msg.type}</h4><p>${msg.message}</p>`,
                  })) ?? []
              )}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
