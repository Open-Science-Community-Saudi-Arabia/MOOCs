/**
 * @fileoverview Manage API translations.
 *
 * @category API
 * @subcategory Utilities
 *
 * @module Crowdin
 *
 * @description  The Moocs APIs are translated by sending request to Crowdin APIs.
 *
 * @requires ../utils/config
 * @requires axios
 *
 */

const { CROWDIN_API_KEY, CROWDIN_MTS_ID } = require("./config");
const axios = require("axios");

const auth = {
  headers: {
    authorization: "Bearer " + CROWDIN_API_KEY,
    "Content-Type": "application/json",
    "Crowdin-API-FileName": "MOOCS API",
  },
};

/**
 * Handles translation request from Crowdin
 *
 * @description This function makes a POST request to crowdin APIs with the source language and words to translate.
 *
 * @param {array} str_arr - Array of strings from the source language
 * @returns {array}  - Array of strings for the target language
 */

async function translateStringsWithCrowdinAPI(str_arr) {
  const url = `https://api.crowdin.com/api/v2/mts/${CROWDIN_MTS_ID}/translations`;
  const res = await axios.post(
    url,
    {
      languageRecognitionProvider: "crowdin",
      targetLanguageId: "ar",
      sourceLanguageId: "en",
      strings: str_arr,
    },
    auth
  );

  // Replace the strings with their translations
  const translated_strings = res.data.data.translations;

  return translated_strings;
}

/**
 * Handles source and target translation data
 *
 * @description This function makes array of strings to translate
 *
 * @param {any} document - data from the source language
 * @returns {any}  - translated data
 */
async function translateDoc(document) {
  try {
    let data = document;

    // An object that holds the indexes of strings to translate
    const string_indexes = {};

    // An array of strings to translate
    const strings_to_translate = [];

    // Fields that we want to translate
    const translatable_fields = {
      title: "title",
      description: "description",
      question: "question",
      correct_option: "correct_option",
    };

    // Get the indexes of the strings to translate
    let string_index = 0;
    for (const field in data.toObject()) {
      if (translatable_fields[field]) {
        // Add the field index to the string_indexes object
        string_indexes[field] = string_index;
        string_index++;
        strings_to_translate.push(data[field]);
      }
    }

    // Use the Crowdin API to translate the strings
    const translated_strings = await translateStringsWithCrowdinAPI(
      strings_to_translate
    );

    // Replace the strings with their translations
    for (const field in string_indexes) {
      // Add the translated string to the data object
      data[field + "_tr"] = translated_strings[string_indexes[field]];
    }

    // If the document is a question, also translate the options and correct option
    if (data.type === "question") {
      data.options_tr = await translateStringsWithCrowdinAPI(data.options);

      const translated_correct_option = data.options_tr[data.correct_option];
      data.correct_option = translated_correct_option[0];
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  translateDoc,
  translateStringsWithCrowdinAPI,
};
