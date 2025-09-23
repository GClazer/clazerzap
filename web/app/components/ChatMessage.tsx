import { Check, CheckCheck } from "lucide-react";
import type { Message } from "@/routes/home";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const getStatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Check className="h-3 w-3" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.isSent
            ? "bg-message-sent text-message-sent-foreground rounded-br-sm"
            : "bg-message-received text-message-received-foreground rounded-bl-sm"
        } shadow-sm`}
        style={{ boxShadow: "var(--shadow-message)" }}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`flex items-center gap-1 mt-1 ${
          message.isSent ? "justify-end" : "justify-start"
        }`}>
          <span className={`text-xs ${
            message.isSent ? "text-message-sent-foreground/70" : "text-muted-foreground"
          }`}>
            {message.timestamp}
          </span>
          {message.isSent && (
            <div className="text-message-sent-foreground/70">
              {getStatusIcon()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
