import React from "react";
import markdownit from "markdown-it";
import DOMPurify from "dompurify";
import Classes from "./BotMsg.module.css";
import botIcon from "../../assets/botIcon.png";

const md = markdownit();

const Markdown = ({ text }) => {
  const htmlcontent = md.render(text);
  const sanitized = DOMPurify.sanitize(htmlcontent);
  return (
    <div className={Classes.botMsgCont}>
      <img src={botIcon} alt="Bot Icon" className={Classes.botIcon} />
      <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>
    </div>
  );
  //   return <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>;
};

export default Markdown;
