import { EleventyRenderPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "content/media": "media" });

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("newestFirst", (arr) => [...(arr || [])].sort((a, b) => b.date - a.date));

  return {
    dir: {
      input: "content",
      includes: "../site/_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}
