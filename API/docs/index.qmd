
# Welcome to JSQuarto Documentation

## About
JSQuarto is a tool designed to generate JavaScript package API reference documentation using Markdown and Quarto. It serves as an alternative to JSDoc, providing a simpler and more flexible approach for documenting JavaScript code.

## Purpose
The purpose of JSQuarto is to streamline the process of generating API reference documentation for JavaScript packages. By leveraging Markdown and Quarto, developers can easily create and maintain comprehensive documentation for their JavaScript projects.

## Inspiration
JSQuarto draws inspiration from various documentation tools and methodologies, including:  </br> 

- [JSDoc](https://jsdoc.app/): JSDoc is a popular tool for generating API documentation from JavaScript source code. </br>
- [Quarto](https://quarto.org/): Quarto is a versatile document authoring and publishing tool that supports Markdown, LaTeX, and R Markdown formats. </br>
- [Sphinx](https://www.sphinx-doc.org/): Sphinx is a documentation generation tool widely used in the Python community. </br>

## Localization and Translation
JSQuarto is committed to supporting localization and translation of generated documentation. We are planning to integrate Crowdin, a localization management platform, to facilitate translation efforts. This will enable users to present the generated QMD files in multiple languages, making documentation accessible to a wider audience.

## Getting Started
#### Prerequisites

Before testing the tool locally, ensure you have the following prerequisites installed on your system:

-   [Quarto](https://quarto.org/)
-   [Babel Quarto](https://docs.ropensci.org/babelquarto/)
-   Node.js and npm (Node Package Manager)

#### Installation

To test the tool locally, follow these steps:

1. Install the tool by running the command below

    ```bash
    npm install -g @oscsa/jsquarto  
    ```

### Usage
Once the dependencies are installed, you can navigate to the root directory of your project and follow the steps below:

1. To generate the documentation run the following command

    ```bash
    jsq doc:generate source=<path to source files> 
    ```

    This will extract the JSDoc comments from the js files and write them to their corresponding Quarto Markdown files.

    If the `source` flag is not provided, the tool will set `/source_files` as default.

    The generated `.qmd` files can be found in the `/docs` folder, you can change the output directory by providing the `output` flag.

2. To preview the generated documentation run

    ```bash
    jsq doc:preview
    ```

    This will generate the documentation, preview with quarto and open a link to preview the docs

3. The generated `.qmd` files can be found in the `/docs` folder, you can change the output directory by providing the `output` flag.

    ```bash
    jsq doc:generate source=<path to source files> output=<path to output dir>
    ```
    
4. To include tutorials in the generated documentation, provide the `tutorials` flag.

    ```bash
    jsq doc:generate source=<path to source files> tutorials=<path to tutorials directory>
    ```

For more information on how to integrate translation tools like Crowdin with JSquarto, refer to the [Crowding workflow guide](https://jsquarto.netlify.app/chapters/tutorials/how_to/workflows#doc-generation-with-crowdin-translation).

For more details on using JSquarto and to see an example of the generated documentation, visit the [JSQuarto documentation](https://jsquarto.netlify.app/)

## Contributing Organization
JSQuarto is developed and maintained by the [Open Science Community Saudi Arabia](https://github.com/Open-Science-Community-Saudi-Arabia). Our mission is to promote open science practices and foster collaboration among researchers and developers in Saudi Arabia.

## Feedback and Support
If you have any questions, feedback, or need support, please [open an issue](https://github.com/Open-Science-Community-Saudi-Arabia/JSquarto/issues) on GitHub or [join our community](https://github.com/Open-Science-Community-Saudi-Arabia) for assistance.