import Classes from "./UserInfo.module.css";
import userIcon from "../../assets/userIcon.png";

const UserInfo = () => {
  return (
    <div className={Classes.userCont}>
      <img src={userIcon} className={Classes.icon} />
      <div>
        <div className={Classes.name}>Aravindhan</div>
        <div className={Classes.pos}>Intern</div>
      </div>
    </div>
  );
};

export default UserInfo;
