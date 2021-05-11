export default (input: string) =>
  input.replace(/(?:[-_\s]|^)(.)/g, (text) =>
    text.length > 1
      ? " " + text.substr(1).toUpperCase()
      : text.substr(0).toUpperCase()
  );
