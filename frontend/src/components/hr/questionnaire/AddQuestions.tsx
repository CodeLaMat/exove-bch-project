import React, { useState } from 'react';
import PageHeading from '../../pageHeading/PageHeading';
import classes from './AddQuestions.module.css'
import axios from 'axios';

type FormData = {
    question: string;
    type: string;
  }

const AddQuestion: React.FC = () => {
    const [formData, setFormData] = useState({
        category: "",
        question: "",
        description: "",
        isFreeForm: false,
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted", formData);
        
        axios.post('http://localhost:5010/addquestion', formData)
        .then(response => {
        console.log(response);
        // Add logic to handle the response if needed
        })
        .catch(error => {
        console.error(error);
        // Add logic to handle the error if needed
        });
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="Quality focus">Quality focus</option>
              <option value="People skills">People skills</option>
              <option value="Self guidance">Self guidance</option>
              <option value="Leadership">Leadership</option>
              <option value="Readiness for change">Readiness for change</option>
              <option value="Creativity">Creativity</option>
              <option value="General Evaluation">General Evaluation</option>
            </select>
          </label>
    
          <label>
            Question:
            <input type="text" name="question" value={formData.question} onChange={handleChange} />
          </label>
    
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
    
          <label>
            Is free-form:
            <input type="checkbox" name="isFreeForm" checked={formData.isFreeForm} onChange={handleChange} />
          </label>
    
          <button type="submit">Submit</button>
        </form>
      );
    };

export default AddQuestion;