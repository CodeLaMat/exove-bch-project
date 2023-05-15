import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div>
      <DropdownButton
        id="selection"
        title="Language"
        variant="secondary"
        size="sm"
      >
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          English
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("fi")}>
          Suomi
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default LanguageSwitcher;
