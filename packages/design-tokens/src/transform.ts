// import { registerTransforms } from "@tokens-studio/sd-transforms";
import { register } from "@tokens-studio/sd-transforms";
import signale from "signale";
import StyleDictionary from "style-dictionary";
import {
  logBrokenReferenceLevels,
  logVerbosityLevels,
  logWarningLevels,
} from "style-dictionary/enums";

register(StyleDictionary);

StyleDictionary.registerTransform({
  name: "semantic/core/dollar-to-curly",
  type: "value",
  transitive: false,
  filter: (token) => {
    if (typeof token.value !== "string") return false;
    return !!token.value.match(/[^.]*\$[a-zA-z0-9-_.$]/g);
  },
  transform: (token) => {
    // replaces the preceding dollar sign, wrapping the word in curly braces, but not the whole string.
    return token.value.replace(/([^.]*\$[a-zA-z0-9-_.$]+)/g, (match: string) =>
      match.replace(/^\$/, "{").concat("}")
    );
  },
});

const mathChars = ["+", "-", "*", "/"];
StyleDictionary.registerTransform({
  name: "ts/mathToCssCalc",
  type: "value",
  transitive: false,
  filter: (token) => {
    if (typeof token.value !== "string") return false;
    const hasMathChars = mathChars.some((char) => token.value.includes(char));
    return hasMathChars;
  },
  transform: (token) => {
    if (typeof token.value !== "string") return token;
    const newToken = token.value
      // replace all multi spaces with single space
      .replace(/\s\s+/g, " ")
      // removes all the space between math chars and other chars
      .replace(/\s*([+\-*/()])\s*/g, "$1");

    const expressions = newToken.split(" ").map((expression) => {
      // adds space between math chars and other chars
      expression = expression.replace(/([+\-*/()])/g, " $1 ");
      // wraps whole expression in calc()
      expression = `calc(${expression})`;
      return expression;
    });

    // readd multi values
    return expressions.join(" ");
  },
});

StyleDictionary.registerTransform({
  name: "ts/name/prefix",
  type: "name",
  transform: (token) => {
    // adds the prefix 'vl-' to every key
    return `vl-${token.path.join("-")}`;
  },
});

const sd = new StyleDictionary({
  source: ["input/**/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    tokens: {
      buildPath: "dist/",
      transformGroup: "tokens-studio",
      transforms: [
        "semantic/core/dollar-to-curly",
        "ts/mathToCssCalc",
        "ts/color/modifiers",
        "ts/color/css/hexrgba",
        // "ts/shadow/css/shorthand",
        // "ts/border/css/shorthand",
        "ts/resolveMath",
        "ts/size/px",
        // "ts/type/fontWeight",
        "ts/size/lineheight",
        "ts/size/css/letterspacing",
        "ts/opacity",
        "ts/descriptionToComment",
        "size/rem",
        // "name/cti/kebab",
      ],
      files: [
        {
          destination: "pandacss.js",
          format: "javascript/module",
        },
        {
          destination: "pandacss.d.ts",
          format: "typescript/module-declarations",
        },
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
  },
  log: {
    warnings: logWarningLevels.warn, // 'warn' | 'error' | 'disabled'
    verbosity: logVerbosityLevels.verbose, // 'default' | 'silent' | 'verbose'
    errors: {
      brokenReferences: logBrokenReferenceLevels.console, // 'throw' | 'console'
    },
  },
});

export const transform = async () => {
  signale.pending("Transforming input…");

  try {
    await sd.hasInitialized;
    await sd.cleanAllPlatforms();
    await sd.buildAllPlatforms();
  } catch (error) {
    console.error(error);
  }

  signale.pending("Build ended!");
};
