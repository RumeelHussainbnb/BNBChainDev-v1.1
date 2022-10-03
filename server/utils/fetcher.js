import fetch from "isomorphic-unfetch";

// eslint-disable-next-line
export default async function Fetcher(...args) {
  const res = await fetch(...args,
    {
      method: "GET",
      headers: {
        // update with your user-agent
        'Content-Type': 'application/json',
        "User-Agent": "*", 
        Accept: "application/json; charset=UTF-8",
      }
    });
  return res.json();
}
