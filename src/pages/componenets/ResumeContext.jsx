// To use selected template and data in the resume
// Selected template and data are taken and passed in useResume()

import { createContext, useState, useContext } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({children}) => {

    const [resumeData, setResumeData] = useState({
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        github: "",
        summary: "",
        experience: [{
            role: "",
            company: "",
            location: "",
            year: "",
            description: [],
        }],
        education: [{
            institute: "",
            degree: "",
            location: "",
            year: "",
            gpa: "",
            honors: "",
        }],
        projects: [{
            name: "",
            year: "",
            description: "",
            tech: [],
        }],
        skills: [],
        certifications: [],
        customSections: []
    });

  const [template, setTemplate] = useState("jakes-classic");

  return (
    <ResumeContext.Provider value={{resumeData, setResumeData, template, setTemplate}}>
        {children}
    </ResumeContext.Provider>
  )
}

export const useResume = () => useContext(ResumeContext);