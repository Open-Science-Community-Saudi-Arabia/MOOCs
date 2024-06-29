const { CROWDIN_API_KEY, CROWDIN_MTS_ID } = require("./config");
const axios = require("axios");

const auth = {
  headers: {
    authorization: "Bearer " + CROWDIN_API_KEY,
    "Content-Type": "application/json",
    "Crowdin-API-FileName": "MOOCS API",
  },
};

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
  const translated_strings = res.data.data.translations;
  return translated_strings;
}

async function translateDoc(document) {
  try {
    const isMongooseObj = isMongooseDocument(document);

    let data = isMongooseObj ? document.toObject() : document;
    const string_indexes = {};
    const strings_to_translate = [];

    const translatable_fields = {
      title: "title",
      description: "description",
      question: "question",
      correctanswer: "correctanswer",
      name: "name",
      status: "status",
      role: "role",
    };

    let string_index = 0;
    for (const field in data) {
      if (translatable_fields[field]) {
        string_indexes[field] = string_index;
        string_index++;
        strings_to_translate.push(data[field]);
      }
    }
    const translated_strings = await translateStringsWithCrowdinAPI(
      strings_to_translate
    );
    for (const field in string_indexes) {
      data[field + "_tr"] = translated_strings[string_indexes[field]];
    }
    if (data.createdBy?.role) {
      const translated_role = await translateStringsWithCrowdinAPI([
        data.createdBy.role,
      ]);
      data.createdBy.role_tr = translated_role[0];
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function isMongooseDocument(obj) {
  return (
    obj && typeof obj.save === "function" && typeof obj.populate === "function"
  );
}

const translateDocArray = async (doc_Array) => {
  try {
    let translated_courseArray = await Promise.all(
      doc_Array.map(async (course) => {
        let course_translated = await translateDoc(course);
        if (course_translated.course_section !== undefined)
          await Promise.all(
            course_translated.course_section.map(async (course_section) => {
              await translateDoc(course_section);
              await Promise.all(
                course_section.resources.map(async (resource) => {
                  await translateDoc(resource);

                  if (resource.type === "quiz") {
                    await Promise.all(
                      resource.quiz.map(async (quizs) => {
                        await translateDoc(quizs);
                        await Promise.all(
                          quizs.options.map(async (option) => {
                            await translateDoc(option);
                          })
                        );
                      })
                    );
                  }
                })
              );
              return course_translated;
            })
          );
        course = course_translated;
        return course;
      })
    );

    return translated_courseArray;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  translateDocArray,
  translateDoc,
};
