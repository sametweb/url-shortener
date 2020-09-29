export default function validateUrl(url) {
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;
  return regex.test(url);
}
