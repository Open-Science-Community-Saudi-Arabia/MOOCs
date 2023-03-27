## Guide for contributors to the MOOCs API (less technical)

As a non-technical contributor, adding courses to the MOOCs platform can seem daunting. However, this guide provides easy steps to follow for adding new courses to the platform.

Before you begin, there are a few required steps to take, they include the environment setup for teh MOOCs API and the installation of the MOOCs API. To setup your local environment please go through the [Environment setup guide](../environment_setup.md) it will help install the necessary tools and packages to run the MOOCs API locally.

## Overview of course structure and components

In this system, a course can have multiple sections, each of which contains a variety of materials such as exercises, videos, and text. The relationship between courses, sections, and materials is hierarchical, with a course containing one or more sections and each section containing one or more materials.

A course is the highest level of organization in the system. It is an umbrella term for a collection of related sections that teach a specific subject or skill. Each course is comprised of one or more sections.

A section is a smaller unit of organization within a course. It is typically focused on a particular topic or subtopic and contains a set of materials that help teach that topic. Sections may contain videos, exercises, or text materials. A course can have multiple sections, each covering a different topic or subtopic.

Materials are the individual components that make up a section. They are the building blocks of a course and can take the form of videos, exercises, or text. Videos are instructional videos that teach a specific concept or skill. Exercises are interactive activities that help learners practice what they have learned. Text materials are written content, such as articles or reading assignments.

Overall, the course > section > materials relationship allows for a clear and organized way to structure course content and present it to learners in a logical sequence. By breaking down a course into smaller sections and materials, learners can better understand and retain the information presented.
Here are the steps to follow:

### Adding a new course to MOOCs Platform

If you are a contributor with little to no technical know-how, adding courses to the MOOCs platform can be intimidating. However, with this guide, you will be able to edit the settings.js file to add new courses to the platform.

First, you'll need to add the data for the course in this order

- Course data
- Course sections
- Videos exercises and questions

Note: Before you can add a course to the platform, you should first raise an issue on the MOOCs API repository. This will help us keep track of the courses that are being added to the platform. To do this use the [Add Course Issue Template](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/blob/.github/ISSUE_TEMPLATE/new_course.md) and follow the instructions in the template. Once you have raised the issue, you can begin adding the course to the platform.

#### Adding a course

1.  To begin, first navigate to the `/API/src` and create a new file `.env.dev` this file will contain the connection URL to your MongoDB database. You can use the `.env.example` file as a template.
    **Note:** _If you are using a cloud-based MongoDB database, you can find the connection URL in the database's connection settings._ For more information on how to find the connection URL, please refer to the [MongoDB documentation](https://docs.mongodb.com/manual/reference/connection-string/). or [this guide](https://www.mongodb.com/docs/compass/current/connect/#connect)

    Open the `.env.dev` file in your text editor and add the following line:

        MONGO_URI_DEV = <MongoDB connection URL>
        PORT = 5000

        JWT_ACCESS_SECRET = X5hyeNLbpVpsJ5v52og8_cwb41AeVtcPMsaguWXvql7X5h
        JWT_ACCESS_EXP = 1h
        JWT_REFRESH_SECRET = yeNLbpVpsJ5v52og8_cwb41AeVtcPMsaguWXvql
        JWT_REFRESH_EXP = 7d

        OAUTH_CLIENT_ID = <Google Client ID>
        OAUTH_CLIENT_SECRET = <Google Client Secret>
        OAUTH_REFRESH_TOKEN = <Google Refresh Token>
        OAUTH_ACCESS_TOKEN = <Google Access Token>

        GITHUB_CLIENT_ID = <Github Client ID>
        GITHUB_CLIENT_SECRET = <Github Client Secret>

        CLIENT_APP_URL = https://localhost://5173

    Note: The current `.env.dev` file does not contain all the neccessary environment variables. You can find the complete list of environment variables in the `.env.example` file. This version of the `.env.dev` file is only for the purpose of adding a course to the platform. So it only supports fetching courses and manual login feature and does not support Google or Github login.

    The `settings.js` located in the `/API/src/seeders` folder where you will add the course data.

#

2.  Open the `settings.js` file and look for the "const course" object and update the following properties with the details of your course:

    ```javascript
    const course = {
      title: "Course title",
      description: "Course description",
      author: "Your name",
      preview_image: "/course_files/preview_images/preview_image.png",
    };
    ```

    - title - The title of your course
    - description: A brief description of the course.
    - author: Your name or the author's name.
    - preview_image: The URL of the course preview image.

    You can also add a course image by adding the image to the `/API/src/seeders/course_files/preview_images` directory and updating the preview_image property to the path of the image. An alternative is to use an image URL from an external source.

#

3.  **Course sections**: Look for the **const course_sections** array and add new course sections as required. For each course section, provide a title and description.

    ```javascript
    const course_sections = [
      {
        title: "Course Section 1",
        description: "Section 1 description",
      },
      {
        title: "Course Section 2",
        description: "Section 2 description",
      },
    ];
    ```

#

4.  **Videos**: Look for the **const videos** array and add new videos as required. For each video, provide a title, author, video_url, description, duration, category, and course_section. Make sure to set the course_section value to the index of the course section you want the video to appear in.

    ```javascript
    const videos = [
      {
        title: "Video 1",
        author: "Author of video 1",
        video_url: "https://www.youtube.com/embed/video1",
        description: "Video 1 description",
        duration: "1",
        category: "Video",
        course_section: 0,
      },
      {
        title: "Video 2",
        author: "Author of video 2",
        video_url: "https://www.youtube.com/embed/video1",
        description: "Video 2 description",
        duration: "10",
        category: "Video",
        course_section: 0,
      },
      {
        title: "Video 3",
        author: "Author of video 3",
        video_url: "https://www.youtube.com/embed/video1",
        description: "Video 3 description",
        duration: "15",
        category: "Video",
        course_section: 1,
      },
      {
        title: "Video 4",
        author: "Author of video 4",
        video_url: "https://www.youtube.com/embed/video1",
        description: "Video 1 description",
        duration: "5",
        category: "Video",
        course_section: 1,
      },
    ];
    ```

    **Note:** _The duration property is the length of the video in minutes. The course_section property is the index of the course section you want the video to appear in. For example, if you want the video to appear in the first course section, set the course_section property to 0. You can read more about array indexes [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)_.
    All videos must be hosted on YouTube. You can find the video URL by clicking on the **Share** button on the video and copying the URL from the **Embed** tab.

#

5.  **Exercises**: Look for the **const exercises** array and add new exercises as required. For each exercise, provide a title, description, course_section, category, and duration. Make sure to set the course_section value to the index of the course section you want the exercise to appear in.

    ```javascript
    const exercises = [
      {
        title: "Exercise 1",
        description: "Exercise 1 description",
        course_section: 0,
        duration: "5",
      },
      {
        title: "Exercise 2",
        description: "Exercise 2 description",
        course_section: 0,
        duration: "10",
      },
      {
        title: "Exercise 3",
        description: "Exercise 3 description",
        course_section: 1,
        duration: "15",
      },
      {
        title: "Exercise 4",
        description: "Exercise 4 description",
        course_section: 1,
        duration: "20",
      },
    ];
    ```

    Each exercise has a duration property that is the length of the exercise in minutes. The course_section property is the index of the course section you want the exercise to appear in. For example, if you want the exercise to appear in the first course section, set the course_section property to 0. You can read more about array indexes [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#

6.  **Questions**: Each exercise should have a corresponding set of questions. To add questions to an exercise, add a new object to the **const questions** array. For each question, provide a title, description, exercise_id, and category. Make sure to set the exercise_id value to the index of the exercise you want the question to appear in.

    ```javascript
    const questions = [
      {
        title: "Question 1",
        question: "Question 1 description",
        exercise: 0,
        options: ['blue', 'red', 'green', 'yellow'],
        correct_option: 'blue',
      },
      {
        title: "Question 2",
        question: "Question 2 description",
        exercise: 0,
        options: ['blue', 'red', 'green', 'yellow'],
        correct_option: 'blue',
      },
      {
        title: "Question 3",
        question: "Question 3 description",
        exercise: 1,
        options: ['blue', 'red', 'green', 'yellow']
        correct_option: 'blue',
      },
      {
        title: "Question 4",
        question: "Question 4 description",
        exercise: 1,
        options: ['blue', 'red', 'green', 'yellow']
        correct_option: 'blue',
      },
    ];
    ```

    The `exercise` property is the index of the exercise you want the question to appear in. For example, if you want the question to appear in the first exercise, set the `exercise` property to 0, if you want it to appear in the second exercise set the value to 1. The exercises are zero-indexed, so the first exercise is 0, the second is 1, and so on. You can read more about array indexes [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

    The `options` property is an array of strings that contain the options for the question. The `correct_option` property is the correct option for the question. The `correct_option` property should be one of the strings in the `options` array.

#

7.  **Text materials**: The text materials are written course contents, they can be PDF's, text files or DOCX, they are stored in the **const text_materials** array.The textmaterials can be saved locally or externally, if stored externally by any cloud service, the url to the text material will be used in teh `file_url` field, but in a case where the file is stored locally, it should be placed in the `/API/src/seeders/course_files/textmaterials`directory, then the `file_url` value should be set to the path where the textmaterial is located. To add new text materials, add a new object to the **const text_materials** array. For each text material, provide a title, description, course_section, and category. Make sure to set the course_section value to the index of the course section you want the text material to appear in.

    ```javascript
    const text_materials = [
      {
        title: "Text Material 1",
        description: "Text Material 1 description",
        course_section: 0,
      },
      {
        title: "Text Material 2",
        description: "Text Material 2 description",
        course_section: 0,
      },
      {
        title: "Text Material 3",
        description: "Text Material 3 description",
        course_section: 1,
      },
      {
        title: "Text Material 4",
        description: "Text Material 4 description",
        course_section: 1,
      },
    ];
    ```

The `course_section` property is the index of the course section you want the text material to appear in. For example, if you want the text material to appear in the first course section, set the `course_section` property to 0, if you want it to appear in the second course section set the value to 1. The course sections are zero-indexed, so the first course section is 0, the second is 1, and so on. You can read more about array indexes [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

Save the changes to the settings.js file.

Now your have added all the properties to the settings.js file, you can now run the seeders to add the courses to the database.

## Running Seeders

The seeders will add the courses to the database. To run the seeders, make sure you are still within the `/API` folder then run following command:

```bash
npm run seed
```

This will add the courses to the database. And create a new user for testing purposes. The user details will be displayed in the terminal after the seeders have run.
For example:

```bash
            User created successfully

            Email: <email>
            Password: <password>

            Use the above credentials to log into the client app

```

The credentials displayed on your terminal will be used to login to the client app.

## Running the Application

To preview the newly added course, you will need to will need to startup the API and the client. Note that the client will run on port 5173, and the API will run on 5000 so make sure that port is not in use.

To start the API, navigate the `/API` folder and run the following command:

```bash
npm run dev
```

To start the client, from the root directory navigate the `/Frontend/` folder and run the following command:

```bash
yarn run dev
```

You can now preview the course you added by navigating to the following URL:

```bash
http://localhost:5173/dashboard/
```

You should see the course you added in the dashboard.

That's it! You have successfully added a new course to the moocs platform.
