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

// Display Course List
export const Courses = [
  {
    id: 0,
    name: "Unlock the secrets of Open Science.",
    description:
      "A beginner-friendly course to introduce the concepts and practices of Open Science.",
    icon: Github,
    members: "5000",
  },
  {
    id: 2,
    name: "Your Open Science Journey Begins Here.",
    description:
      "Learn the basics of Open Science and start your journey towards more open and transparent research and education.",
    icon: JavaScript,
    members: "660",
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
    name: "OPEN SOURCE",
    color: "#ededed",
    content:
      "Open source software is a code that is designed to be publicly accessible. Prime examples include Linux, Firefox & Android",
  },
  {
    id: 1,
    icon: knowledge,
    name: "OPEN LICENSE",
    color: "#fff3d4",
    content:
      "Open Work is protected by Open License, which states how the work can be used, modified, adopted and commercialised.",
  },
  {
    id: 2,
    icon: brain,
    name: "OPEN HARDWARE",
    color: "#d4f1ff",
    content:
      "Open source hardware is a hardware that is built based on principles analogous to open source software.",
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
];
