const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

type LinkifyProps = {
  text: string;
};

const Linkify = ({ text }: LinkifyProps) => {
  const elements: React.ReactNode[] = [];

  let lastIndex = 0;

  // Find markdown links and push content before/after them
  const matches = [...text.matchAll(MARKDOWN_LINK_REGEX)];

  for (const match of matches) {
    const [fullMatch, label, url] = match;
    const matchIndex = match.index ?? 0;

    // Push any text before the match
    if (lastIndex < matchIndex) {
      const beforeText = text.slice(lastIndex, matchIndex);
      elements.push(...splitAndLinkifyPlainUrls(beforeText));
    }

    // Push the markdown link
    elements.push(
      <a key={elements.length} href={url} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  // Push the remaining text
  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    elements.push(...splitAndLinkifyPlainUrls(remaining));
  }

  return <>{elements}</>;
};

// Helper to convert plain URLs to <a> links
const splitAndLinkifyPlainUrls = (text: string): React.ReactNode[] => {
  return text.split(URL_REGEX).map((part, i) =>
    URL_REGEX.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

export default Linkify;
