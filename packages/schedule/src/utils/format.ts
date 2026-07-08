export const formatLocation = (detalle: string): { text: string; url?: string } => {
  const match = detalle.match(/(https?:\/\/[^\s]+)/);
  if (match) {
    const [_, url] = match;
    const text = detalle.split(':')[0];
    return { text, url };
  }
  return { text: detalle };
};
