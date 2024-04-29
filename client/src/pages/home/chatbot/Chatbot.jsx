import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import useChatMessages from "@hooks/useChatMessages";

const ChatbotComponent = () => {
  const { messages } = useChatMessages();

  return (
    <div>
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotComponent;
