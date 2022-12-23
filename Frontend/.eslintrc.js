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
        "import/order": "warn",
        "no-console": "warn",
        "camelcase":"off",
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key':'off',
        'import/prefer-default-export':'off',
        'jsx-a11y/click-events-have-key-events':'off',
        'jsx-a11y/no-static-element-interactions':'off',
        'react/prop-types': ['off'],
        'react/jsx-no-constructed-context-values': 'off'
    }
}
