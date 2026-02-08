// To use selected template and data in the resume
// Selected template and data are taken and passed in useResume()

import { createContext, useState, useContext } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({children}) => {

    const [resumeData, setResumeData] = useState({
        name: "Name",
        title: "Professional Title",
        email: "Email",
        phone: "Phone",
        location: "Location (City, Country)",
        linkedin: "LinkedIn URL",
        github: "GitHub URL",
        summary: "This is a professional summary that highlights key acheivements and career goals.",
        experience: [{
            role: "",
            company: "",
            location: "",
            year: "",
            description: [],
        }],
        education: [{
            institute: "Name of Institute",
            degree: "Degree",
            location: "Location",
            year: "Year of Graduation",
            gpa: "GPA",
            honors: "Honors",
        }],
        projects: [{
            name: "Name of Project",
            year: "Year",
            description: "Write a short description of your project here",
            tech: ['Tech stack used'],
        }],
        skills: ['Your skills'],
        certifications: ['Your certifications'],
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