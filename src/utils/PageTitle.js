import { useEffect } from "react";

function PageTitle({ title }) {
  useEffect(() => {
    document.title = `${title} | Level Up`;
  }, [title]);

  return null;
}

export default PageTitle;