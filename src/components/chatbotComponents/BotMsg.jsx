import React, { useEffect, useRef, useState } from "react";
import Classes from "./BotMsg.module.css";
import botIcon from "../../assets/botIcon.png";

const BotMsg = (props) => {
  const msgRef = useRef(null); // Reference to the bot message div
  const [heightFactor, setHeightFactor] = useState(1); // State to track the height grow factor

  useEffect(() => {
    const messageLength = 18;
    const originalHeight = 79; // Fixed original height

    if (messageLength > 18) {
      const extraCharacters = messageLength - 18;
      const growFactor = 1 + 0.1 * Math.ceil(extraCharacters / 18); // Increase height by 10% for every 100 characters over the limit
      setHeightFactor(growFactor); // Update height factor
    } else {
      setHeightFactor(1); // Reset to original height if less than 100 characters
    }

    // Adjust the height dynamically using ref
    if (msgRef.current) {
      msgRef.current.style.margin = `${originalHeight * heightFactor}px 0 0 0`;
    }
  }, [props.message, heightFactor]); // Runs whenever the message or height factor changes

  return (
    <div className={Classes.botMsgCont}>
      <img src={botIcon} alt="" className={Classes.botIcon} />
      <div className={Classes.botMsg} ref={msgRef}>
        {props.message}
      </div>
    </div>
  );
};

export default BotMsg;

// import React, { useEffect, useRef, useState } from "react";
// import Classes from "./BotMsg.module.css";
// import botIcon from "../../assets/botIcon.png";

// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { markdownLookBack } from "@llm-ui/markdown";
// import { useLLMOutput, useStreamExample } from "@llm-ui/react";

// import { throttleBasic } from "@llm-ui/react";

// const MarkdownComponent = ({ blockMatch }) => {
//   const markdown = blockMatch.output;
//   return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>;
// };

// const BotMsg = (props) => {
//   const msgRef = useRef(null); // Reference to the bot message div
//   const [heightFactor, setHeightFactor] = useState(1); // State to track the height grow factor

//   useEffect(() => {
//     const messageLength = props.message.length;
//     const originalHeight = 79; // Fixed original height

//     if (messageLength > 30) {
//       const extraCharacters = messageLength - 30;
//       const growFactor = 1 + 0.2 * Math.ceil(extraCharacters / 30); // Increase height by 10% for every 100 characters over the limit
//       setHeightFactor(growFactor); // Update height factor
//     } else {
//       setHeightFactor(1); // Reset to original height if less than 100 characters
//     }

//     // Adjust the height dynamically using ref
//     if (msgRef.current) {
//       msgRef.current.style.height = `${originalHeight * heightFactor}px`;
//     }
//   }, [props.message, heightFactor]); // Runs whenever the message or height factor changes

//   const { isStreamFinished, output } = useStreamExample(props.message);

//   const throttle = throttleBasic({
//     readAheadChars: 10,
//     targetBufferChars: 7,
//     adjustPercentage: 1.0,
//     frameLookBackMs: 10000,
//     windowLookBackMs: 2000,
//   });

//   const { blockMatches } = useLLMOutput({
//     llmOutput: output,
//     fallbackBlock: {
//       component: MarkdownComponent, // from Step 1
//       lookBack: markdownLookBack(),
//     },
//     isStreamFinished,
//     throttle,
//   });

//   return (
//     <div className={Classes.botMsgCont}>
//       <img src={botIcon} alt="" className={Classes.botIcon} />
//       {/* <div className={Classes.botMsg} ref={msgRef}>
//         {props.message}
//       </div> */}
//       <div>
//         {blockMatches.map((blockMatch, index) => {
//           const Component = blockMatch.block.component;
//           return <Component key={index} blockMatch={blockMatch} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default BotMsg;
