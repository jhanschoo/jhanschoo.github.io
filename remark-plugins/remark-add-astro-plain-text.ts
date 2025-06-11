import { toString } from "mdast-util-to-string";
import type { RemarkPlugin } from "@astrojs/markdown-remark";

const remarkAddAstroPlainText: RemarkPlugin = () => (tree, file) => {
  if (file.data.astro?.frontmatter) {
    file.data.astro.frontmatter.plainText = toString(tree);
  }
};

export default remarkAddAstroPlainText;
