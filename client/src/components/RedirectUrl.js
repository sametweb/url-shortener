import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";

function RedirectUrl(props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const {
    params: { id },
  } = useRouteMatch();

  const getUrl = (id) => {
    axios
      .get(`http://localhost:4000/${id}`)
      .then((res) => setUrl(res.data.url))
      .catch(() => setError("This URL is not valid."));
  };

  useEffect(() => {
    getUrl(id);
  }, [id]);

  useEffect(() => {
    url && window.location.replace(url);
  }, [url]);

  return !error ? (
    <span>
      Wait while we are fetching your URL...
      <br />
      You will be redirected automatically...
    </span>
  ) : (
    <span>URL you requested does not exist! :(</span>
  );
}

export default RedirectUrl;
