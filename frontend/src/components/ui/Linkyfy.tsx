import React from "react";

const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

type LinkifyProps = {
  text: string;
};

const Linkify = ({ text }: LinkifyProps) => {
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  const matches = [...text.matchAll(MARKDOWN_LINK_REGEX)];

  for (const match of matches) {
    const [fullMatch, label, url] = match;
    const matchIndex = match.index ?? 0;

    // Push text before the markdown link, including any plain URLs in it
    if (lastIndex < matchIndex) {
      const before = text.slice(lastIndex, matchIndex);
      elements.push(...linkifyPlainUrls(before));
    }

    // Push the markdown link
    elements.push(
      <a key={elements.length} href={url} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  // Push the rest of the text (also linkify it)
  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    elements.push(...linkifyPlainUrls(remaining));
  }

  return <>{elements}</>;
};

const linkifyPlainUrls = (text: string): React.ReactNode[] => {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
      // Separate URL and any trailing punctuation
      const match = part.match(/^(https?:\/\/[^\s]+?)([.,!?)]*)$/);
      const url = match?.[1] ?? part;
      const trailing = match?.[2] ?? "";

      return (
        <React.Fragment key={i}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
          {trailing}
        </React.Fragment>
      );
    } else {
      return <span key={i}>{part}</span>;
    }
  });
};

export default Linkify