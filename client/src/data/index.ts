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
import capenteries from "../images/capenteries.svg";
import openscience from "../images/open-science.svg";
import ttw from "../images/ttw.svg";
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
    icon: JavaScript,
  },
];

// Display tablist
export const tabitem = [
  {
    id: 0,
    tab: "tab1",
    name: "Overview",
  },

  {
    id: 1,
    tab: "tab2",
    name: "Certificate",
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

export const Videocontent = {
  author: "Batoool",
  course_sections: [
    {
      contents: [],
      _id: "6411dbc4d07a77d6c06a44f7",
      order: 1678891273798,
      title: "Python Syntax",
      exercises: [
        {
          title: "Introduction to Python Quiz",
          _id: "6411dbced07a77d6c06a44fc",
          order: 1678891273796,
          isCompleted: false,
          questions: [
            {
              correct_option: "blue",
              _id: "6411dbd8d07a77d6c06a4506",
              options: ["colorless", "blue", "pink", "purple"],
              question: "What is the color of the sky",
            },
            {
              correct_option: "two",
              _id: "6411dbd8d07a77d6c06a4899",
              options: ["what", "is", "two", "number"],
              question: "What is the number two",
            },
            {
              correct_option: "testing",
              _id: "6411dbd8d07a77d6c0749809",
              options: ["why", "are", "you", "testing"],
              question: "What are you doing",
            },
          ],
        },
      ],
      textmaterials: [
        {
          description: "A typescript content",
          file_url: "https://www.africau.edu/images/default/sample.pdf",
          _id: "6411dbebd07a77d6c06a4519",
          order: 1678891273798,
          title: "TypeScript ",
          type: "text file",
        },
      ],
      videos: [
        {
          description: "Introduction to Open science",
          duration: "6",
          _id: "6411dbf5d07a77d6c06a4526",
          order: 1678891273797,
          title: "Python syntax",
          type: "video",
          video_url: "https://www.youtube.com/embed/desowWgV3iU",
        },
        {
          description: "Introduction to Open science",
          duration: "7",
          _id: "6411dbf5d07a77d6c06a4456",
          order: 1678891273234,
          title: "Typescript ",
          type: "video",
          video_url: "https://www.youtube.com/embed/y81yIo1_3o8",
        },
      ],
    },
    {
      contents: [],
      _id: "6411dbc4d07a77d6c0634522",
      order: 1678891273798,
      title: "Learning Javascript",

      exercises: [
        {
          title: "Introduction to CSS Quiz",
          _id: "6411dbced07a77d6c0656a4f",
          order: 1678891273796,
          isCompleted: false,
          questions: [
            {
              correct_option: "CSS",
              _id: "6411dbd8d07a77d6c0645677",
              options: ["Javascript", "HTML", "CSS", "Next"],
              question: "What is the Your best color",
            },
            {
              correct_option: "Dog",
              _id: "6411dbd8d07a77d6c2098cc7",
              options: ["What", "Dog", "do ", "you"],
              question: "What animal do you know",
            },
            {
              correct_option: "American Dreams",
              _id: "6411dbd8d07a77d6c20990hh",
              options: ["American Dreams", "Dog", "do ", "you"],
              question: "What animal do you know",
            },
            {
              correct_option: "feathers",
              _id: "6411dbd8d07a77d6c2098okjh",
              options: ["feathers", "Chicken", "do ", "you"],
              question: "I have no questions",
            },
          ],
        },
      ],
      textmaterials: [
        {
          description: "Next js content",
          file_url:
            "https://res.cloudinary.com/dipyrsqvy/image/upload/v1678891984/course_6411dbb7d07a77d6c06a44f3/coursesection_6411dbc4d07a77d6c06a44f7/textmaterial_6411dbebd07a77d6c06a4519_RICHIE%20MOLUNO%20___%20RESUME%20%283%29.pdf.pdf",
          _id: "6411dbebd06787d6c06a4123",
          isAvailable: true,
          order: 1678891783798,
          title: "Nextjs ",
          type: "text file",
        },
        {
          description: "Text content",
          file_url:
            "https://res.cloudinary.com/dipyrsqvy/image/upload/v1678891984/course_6411dbb7d07a77d6c06a44f3/coursesection_6411dbc4d07a77d6c06a44f7/textmaterial_6411dbebd07a77d6c06a4519_RICHIE%20MOLUNO%20___%20RESUME%20%283%29.pdf.pdf",
          _id: "6411dbebd06787d6c06a4php",
          isAvailable: true,
          order: 1678891783798,
          title: "PHP",
          type: "text file",
        },
      ],
      videos: [
        {
          description: "Introduction to Javscript",
          duration: "5",
          _id: "6411dbf5d07a77c06a3422",
          order: 1678891273797,
          title: "Introduction to Javscript",
          type: "video",
          video_url: "https://www.youtube.com/embed/DYWyQ1xFQSI",
        },
        {
          description: "Introduction to Ruby",
          duration: "4",
          _id: "6411dbf5d07a77d6c123456",
          order: 1678891273797,
          title: "Introduction to Ruby and rails",
          type: "video",
          video_url: "https://www.youtube.com/embed/Hapv5VgU47Y",
        },
      ],
    },
  ],
  description: "This course is an introduction to open source",
  enrolled_users: [],
  _id: "6411dbb7d07a77d6c06a44f3",
  preview_image:
    "https://res.cloudinary.com/dipyrsqvy/image/upload/v1678891933/courses/preview_images/course_preview_6411dbb7d07a77d6c06a44f3.jpg",
  title: "Introduction to open source",
};
