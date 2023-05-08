import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const changeHandler = (e) => {
    if (e.target.value === "en") {
     changeLanguage('en');
    }  else {
      changeLanguage('fi');
    }
  };

  return (
    <div>
      <select
          name="selection"
          id="selection"
          onChange={(e) =>
            changeHandler(e)
          }
        >
          <option value="en">English</option>
          <option value="fi">Finnish</option>
          
        </select>

    </div>

    
  );
}

export default LanguageSwitcher;