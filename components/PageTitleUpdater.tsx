import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function PageTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "VCET";

    if (path === "/") title = "Home | VCET";
    else {
      const parts = path.split("/").filter(Boolean);
      if (parts.length > 0) {
        const pageName = parts[parts.length - 1].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        title = `${pageName} | VCET`;
      }
    }
    
    document.title = title;
  }, [location]);

  return null;
}
