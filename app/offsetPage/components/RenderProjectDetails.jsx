  export const renderDescription = ({project}) => {
    if (!project.description) return null;

    const hasHtmlTags = /<[^>]+>/.test(project.description);
    
    if (hasHtmlTags) {
      return (
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      );
    } else {
      const formattedText = project.description
        .split('\\n')
        .filter(line => line.trim())
        .map((line, index) => {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('•')) {
            return (
              <div key={index} className="flex gap-2 mb-3">
                <span className="text-lg leading-relaxed">•</span>
                <span className="flex-1 leading-relaxed">{trimmedLine.substring(1).trim()}</span>
              </div>
            );
          }
          
          const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
          if (numberedMatch) {
            const [, number, content] = numberedMatch;
            return (
              <div key={index} className="flex gap-2 mb-3">
                <span className="font-semibold leading-relaxed">{number}.</span>
                <span className="flex-1 leading-relaxed">{content}</span>
              </div>
            );
          }
          
          // Regular paragraph
          return <p key={index} className="mb-3 leading-relaxed">{trimmedLine}</p>;
        });
      
      return <div className="space-y-1">{formattedText}</div>;
    }
  };