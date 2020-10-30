import React, { useEffect } from "react";
import { HeaderPage } from "../../components";
import { ROUTES_HOME } from "../../constants";
import { useLayout } from "../../contexts";

export default function HomePage() {
  const layoutContext = useLayout();

  useEffect(() => {
    layoutContext.setNavigationSelected(ROUTES_HOME())

    return () => {
      layoutContext.setNavigationSelected('')
    }
}, []);

  return (
    <div>
      <HeaderPage title="Home Page" />
    </div>
  )
}
