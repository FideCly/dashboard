import * as React from "react";
import useWebSocket from "react-use-websocket";
const WSS_FEED_URL: string = "ws://localhost:8999";

export default function ValidationPopup() {
  const [message, setMessage] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isWarning, setIsWarning] = React.useState(false);
  const [isInfo, setIsInfo] = React.useState(false);
  const [isDanger, setIsDanger] = React.useState(false);
  const [isPrimary, setIsPrimary] = React.useState(false);
  const [isSecondary, setIsSecondary] = React.useState(false);
  const [isLight, setIsLight] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const [isLink, setIsLink] = React.useState(false);
  const [isSmall, setIsSmall] = React.useState(false);
  const [isMedium, setIsMedium] = React.useState(false);
  const [isLarge, setIsLarge] = React.useState(false);

  const { sendMessage, lastMessage } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => {
      console.log("WebSocket connection opened");
    },
  });
  React.useEffect(() => {
    if (lastMessage) {
      setMessage(lastMessage);
      setIsOpen(true);
    }
  }, [lastMessage]);
  React.useEffect(() => {
    if (message) {
      const messageObject = JSON.parse(message);
      setIsOpen(true);
      setIsValid(messageObject.valid);
      setIsLoading(messageObject.loading);
      setIsError(messageObject.error);
      setIsSuccess(messageObject.success);
      setIsWarning(messageObject.warning);
      setIsInfo(messageObject.info);
      setIsDanger(messageObject.danger);
      setIsPrimary(messageObject.primary);
      setIsSecondary(messageObject.secondary);
      setIsLight(messageObject.light);
      setIsDark(messageObject.dark);
      setIsLink(messageObject.link);
      setIsSmall(messageObject.small);
      setIsMedium(messageObject.medium);
      setIsLarge(messageObject.large);
    }
  }, [message]);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSend = () => {
    sendMessage(message);
  };
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Validation</strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
}
