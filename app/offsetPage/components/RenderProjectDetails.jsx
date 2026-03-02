export const renderDescription = ({ project }) => {
  if (!project.description) return null;

  const hasHtmlTags = /<[^>]+>/.test(project.description);

  if (hasHtmlTags) {
    return (
      <div
        className="prose prose-sm max-w-none overflow-hidden"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />
    );
  } else {
    const formattedText = project.description
      .split("\\n")
      .filter((line) => line.trim())
      .map((line, index) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith("•")) {
          return (
            <div key={`bullet-${index}`} className="flex gap-2 mb-3">
              <span className="text-lg leading-relaxed shrink-0">•</span>
              <span className="flex-1 leading-relaxed break-words">
                {trimmedLine.substring(1).trim()}
              </span>
            </div>
          );
        }

        const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
        if (numberedMatch) {
          const [, number, content] = numberedMatch;
          return (
            <div key={`numbered-${index}`} className="flex gap-2 mb-3">
              <span className="font-semibold leading-relaxed shrink-0">
                {number}.
              </span>
              <span className="flex-1 leading-relaxed break-words">
                {content}
              </span>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={`para-${index}`} className="mb-3 leading-relaxed break-words">
            {trimmedLine}
          </p>
        );
      });

    return (
      <div className="space-y-1 overflow-hidden w-full">{formattedText}</div>
    );
  }
};
