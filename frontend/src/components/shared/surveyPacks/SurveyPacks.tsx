import React from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { UserRole } from "../../../enum";

import SurveyPacks from "../../user/surveys/mySurveyPacks/MySurveyPacks";

const Inbox = () => {
  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  if (role === UserRole.HR) {
    return <div>HR Inbox</div>;
  } else if (role === UserRole.User) {
    return (
      <div>
        <SurveyPacks />
      </div>
    );
  } else if (role === UserRole.Manager) {
    return <div>Component for manager role</div>;
  } else return null;
};

export default Inbox;
