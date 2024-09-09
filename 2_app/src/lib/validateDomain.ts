export const validateDomainOrSubdomain = ({ name }: { name: string }) => {
  if (typeof name !== "string") {
    return false;
  }

  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)+.*)$/;

  if (!domainRegex.test(name)) {
    return false;
  }

  return true;
};
