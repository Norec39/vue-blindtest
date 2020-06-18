module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@vue/airbnb'
  ],
  rules: {
    "indent": [
      "error",
      "tab"
    ],
    "no-tabs": "off",
    "no-console": "off",
    "no-mixed-spaces-and-tabs": "off"
  }
}
