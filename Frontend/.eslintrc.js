module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ["plugin:react/recommended", "airbnb", "prettier"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": ["error"],
        "no-unused-vars": "warn",
        "react/no-unescaped-entities": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "react/button-has-type": 0,
        "react/self-closing-comp": "warn",
        "import/newline-after-import": "warn",
        "import/order": "warn"
    }
}
