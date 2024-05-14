import Github from "../images/github-image.png";
import cc from "../images/cc.png";
import Outreachy from "../images/outreachy.png";
import creativecommon from "../images/creative-common.png";
import githublogo from "../images/github-logo.png";
import nextflow from "../images/next-flow.png";
import rlogo from "../images/r-logo.png";
import web3 from "../images/web3.png";
import openbook from "../images/openbook.svg";
import knowledge from "../images/knowledge.svg";
import brain from "../images/brain.svg";
import { t } from "@lingui/macro";

// Display Course List
export const Courses = [
  {
    id: 0,
    name: () => t`Unlock the secrets of Open Science.`,
    description: () =>
      t`A beginner-friendly course to introduce the concepts and practices of Open Science.`,
    icon: Github,
  },
  {
    id: 2,
    name: () => t`Your Open Science Journey Begins Here.`,
    description: () =>
      t`Learn the basics of Open Science and start your journey towards more open and transparent research and education.`,
    icon: cc,
  },
];

// Display tablist
export const tabitem = [
  {
    id: 0,
    tab: "tab1",
    name:() => t`Overview`,
  },

  {
    id: 1,
    tab: "tab2",
    name:  () => t`Useful links`,
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
    name: () => t`OPEN SOURCE`,
    color: "#ededed",
    content: () =>
      t`Open source software is a code that is designed to be publicly accessible. Prime examples include Linux, Firefox & Android`,
  },
  {
    id: 1,
    icon: knowledge,
    name: () => t`OPEN LICENSE`,
    color: "#fff3d4",
    content: () =>
      t`Open Work is protected by Open License, which states how the work can be used, modified, adopted and commercialised.`,
  },
  {
    id: 2,
    icon: brain,
    name: () => t`OPEN HARDWARE`,
    color: "#d4f1ff",
    content: () =>
      t`Open source hardware is a hardware that is built based on principles analogous to open source software.`,
  },
];

// Supporters
export const Supporter = [
  {
    id: 0,
    // icon: Unesco,
    icon:  Outreachy,
    name: "UNESCO",
  },
  // {
  //   id: 1,
  //   icon: Outreachy,
  //   name: "Outreachy",
  // },
  // {
  //   id: 2,
  //   icon: CSS,
  //   name: "CSS",
  // },
  // {
  //   id: 3,
  //   icon: capenteries,
  //   name: "carpenteries",
  // },
  // {
  //   id: 4,
  //   icon: ttw,
  //   name: "the turning way",
  // },
  // {
  //   id: 5,
  //   icon: openscience,
  //   name: "open science",
  // },
];
