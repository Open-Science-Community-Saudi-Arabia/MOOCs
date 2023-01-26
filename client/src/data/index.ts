import Github from "../images/github-image.png";
import JavaScript from "../images/javascript.png";
import Outreachy from "../images/outreachy.png";
import Unesco from "../images/unesco.webp";
import CSS from "../images/css.png";
import {
  SiHtml5,
  SiCss3,
  SiReact,
  SiTypescript,
  SiNextdotjs,
} from "react-icons/si";

import {
  FaOsi,
  FaMicrochip,
  FaLockOpen,
  FaDatabase,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { RiCreativeCommonsFill } from "react-icons/ri";

// Display Course List
export const Courses = [
  {
    id: 0,
    name: " Learn Git and GitHub for team collaboration",
    description:
      "Lorem ipsum dolor sit amet consectetur. Proin amet ac nunc portavolutpat semper donec eget.",
    icon: Github,
    members: "5000",
  },
  {
    id: 2,
    name: "Javascript fundamentals for software development",
    description:
      "Lorem ipsum dolor sit amet consectetur. Proin amet ac nunc portavolutpat semper donec eget.",
    icon: JavaScript,
    members: "660",
  },
];

// All Course List
export const CourseList = [
  {
    id: 0,
    icon: SiHtml5,
    name: "HTML",
  },
  {
    id: 1,
    icon: SiCss3,
    name: "CSS",
  },
  {
    id: 2,
    icon: SiReact,
    name: "REACT",
  },
  {
    id: 3,
    icon: SiTypescript,
    name: "TYPESCRIPT",
  },
  {
    id: 4,
    icon: SiNextdotjs,
    name: "NEXTJS",
  },
];

// Open practice
export const OpenPractice = [
  {
    id: 0,
    icon: FaOsi,
    name: "OPEN SOURCE",
    color: "#ededed",
    content:
      "Open source software is a code that is designed to be publicly accessible. Prime examples include Linux, Firefox & Android",
  },
  {
    id: 1,
    icon: RiCreativeCommonsFill,
    name: "OPEN LICENSE",
    color: "#fff3d4",
    content:
      "Open Work is protected by Open License, which states how the work can be used, modified, adopted and commercialised.",
  },
  {
    id: 2,
    icon: FaMicrochip,
    name: "OPEN HARDWARE",
    color: "#d4f1ff",
    content:
      "Open source hardware is a hardware that is built based on principles analogous to open source software",
  },
  {
    id: 3,
    icon: FaDatabase,
    name: "FAIR PRINCIPLES",
    color: "#ffe0d4",
    content:
      "The FAIR principles describe how research outputs should be organised so they can be more easily accessed, understood, exchanged and reused.",
  },
  {
    id: 4,
    icon: FaChalkboardTeacher,
    name: "OPEN EDUCATIONAL RESOURCES",
    color: "#ededed",
    content:
      "They are any learning and research materials that reside in the public domain or under an open license",
  },
  {
    id: 5,
    icon: FaLockOpen,
    name: "OPEN ACCESS",
    color: "#d4f1ff",
    content:
      "Open Access refers to online, free of cost access to peer reviewed scientific content with limited copyright and licensing restrictions.",
  },
];

// Supporters
export const Supporter = [
  {
    id: 0,
    icon: Unesco,
    name: "UNESCO"
  },
  {
    id: 1,
    icon: Outreachy,
    name: "Outreachy"
  },
  {
    id: 2,
    icon: CSS,
    name: "CSS"
  },
];
