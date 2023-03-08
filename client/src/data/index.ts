import Github from "../images/github-image.png";
import JavaScript from "../images/javascript.png";
import Outreachy from "../images/outreachy.png";
import Unesco from "../images/unesco.webp";
import CSS from "../images/css.png";
import creativecommon from "../images/creative-common.png";
import githublogo from "../images/github-logo.png";
import nextflow from "../images/nextflow.png";
import rlogo from "../images/r-logo.png";
import web3 from "../images/web3.png";
import openbook from "../images/openbook.svg";
import knowledge from "../images/knowledge.svg";
import brain from "../images/brain.svg";
import youtube from "../images/dashboard/youtube.png";
import capenteries from "../images/capenteries.svg";
import openscience from "../images/open-science.svg";
import ttw from "../images/ttw.svg";
import { t } from "@lingui/macro";

// Display Course List
export const Courses = [
  {
    id: 0,
    name: t`Unlock the secrets of Open Science.`,
    description: t`A beginner-friendly course to introduce the concepts and practices of Open Science.`,
    icon: Github,
  },
  {
    id: 2,
    name: t`Your Open Science Journey Begins Here.`,
    description: t`Learn the basics of Open Science and start your journey towards more open and transparent research and education.`,
    icon: JavaScript,
  },
];

// All Course List
export const CourseList = [
  {
    id: 0,
    icon: creativecommon,
    name: "creative-common",
  },
  {
    id: 1,
    icon: githublogo,
    name: "github",
  },
  {
    id: 2,
    icon: nextflow,
    name: "nextflow",
  },
  {
    id: 3,
    icon: rlogo,
    name: "rlogo",
  },
  {
    id: 4,
    icon: web3,
    name: "web3",
  },
];

// Open practice
export const OpenPractice = [
  {
    id: 0,
    icon: openbook,
    name: t`OPEN SOURCE`,
    color: "#ededed",
    content: t`Open source software is a code that is designed to be publicly accessible. Prime examples include Linux, Firefox & Android`,
  },
  {
    id: 1,
    icon: knowledge,
    name: t`OPEN LICENSE`,
    color: "#fff3d4",
    content: t`Open Work is protected by Open License, which states how the work can be used, modified, adopted and commercialised.`,
  },
  {
    id: 2,
    icon: brain,
    name: t`OPEN HARDWARE`,
    color: "#d4f1ff",
    content: t`Open source hardware is a hardware that is built based on principles analogous to open source software.`,
  },
];

// Supporters
export const Supporter = [
  {
    id: 0,
    icon: Unesco,
    name: "UNESCO",
  },
  {
    id: 1,
    icon: Outreachy,
    name: "Outreachy",
  },
  {
    id: 2,
    icon: CSS,
    name: "CSS",
  },
  {
    id: 3,
    icon: capenteries,
    name: "carpenteries",
  },
  {
    id: 4,
    icon: ttw,
    name: "the turning way",
  },
  {
    id: 5,
    icon: openscience,
    name: "open science",
  },
];

export const Videocontent = [
  {
    id: 0,
    url: "https://www.youtube.com/embed/xcTwm7D1XsQ",
    description:
      "This is an intro to Open Life Sciences program by Malvika Sharon in OLS3. The Open Life Science (OLS) program is a mentoring & training program for Open Science ambassadors.",
    title: "Introduction to Open Life Sciences",
    language: "English",
    duration: "7 mins",
    skillslevel: " All Levels",
    Students: "425149",
    image: youtube,
    author: "Malvika Sharan, Hao Ye",
    quiz: {
      completed: false,
      quiz_no: 10,
      questions: [
        {
          id: 0,
          question: "What is open science",
          options: ["incorrect", "incorrect", "incorrect", "correct"],
          correct_answer: "correct",
        },
      ],
    },
  },
];
