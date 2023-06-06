
The Open Innovation MOOCs is a biligual Application supporting translation in English and Arabic. 

### Tools and technologies
- [LinguiJs](https://lingui.dev/)
- [Crowdin](https://crowdin.com/)


### Set up for Internalization
- LinguiJs is installed and set up according to the guide in the [documentation](https://lingui.dev/tutorials/setup-vite).
- The `i18n.ts` file loads the locales based on language selection.
- `linguric` for lingui configuration.
- The `Trans` and `t` modules are imported from "@lingui/macro" for text translation. Example: `<Trans>Join us now!</Trans>`
- Run `yarn extract` to extract the English content to the `en.json` file

### Using Crowdin for translation
- The Github respository is integrated into crowdin to monitor changes made to the locale file.
- The English file can be translated using the crowdin `Editor` or using `MT Translation`
- The translated changes are added to the `ar.json` file and  Github creates a Pull Request to merge the changes

### Compilation
- The updated file is compile using `yarn compile` to load the added Arabic files.


