import React from "react";
import markdownit from "markdown-it";
import DOMPurify from "dompurify";
import Classes from "./BotMsg.module.css";
import botIcon from "../../assets/botIcon.png";

const md = markdownit();

const Markdown = ({ text, image }) => {
  const htmlcontent = md.render(text);
  const sanitized = DOMPurify.sanitize(htmlcontent);
  return (
    <div className={Classes.botMsgCont}>
      <div className={Classes.bottext}>
        <img src={botIcon} alt="Bot Icon" className={Classes.botIcon} />
        <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>
      </div>
      <div>
        {image && (
          <div className={Classes.imageContainer}>
            <img
              src={
                "https://storage.googleapis.com/store-graph.appspot.com/graphs/b1cd3bd40b07432488634402d5a2b797.png"
              }
              alt="Content Image"
              className={Classes.contentImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Markdown;

//https://storage.googleapis.com/store-graph.appspot.com/graphs/b1cd3bd40b07432488634402d5a2b797.png
