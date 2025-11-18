  // get plain text from description
  export const getPlainTextDescription = (project) => {
    if (!project.description) return "";
    const withoutHtml = project.description.replace(/<[^>]+>/g, " ");
    const withoutNewlines = withoutHtml.replace(/\\n/g, " ");
    return withoutNewlines.replace(/\s+/g, " ").trim();
  };