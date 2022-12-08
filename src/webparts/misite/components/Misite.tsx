import * as React from "react";
import styles from "./Misite.module.scss";
import { IMisiteProps } from "./IMisiteProps";

import { SPHttpClientResponse, SPHttpClient } from "@microsoft/sp-http";

const Misite: React.FC<IMisiteProps> = (props) => {
  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    fetchsp();
  }, []);

  const fetchsp = () => {
    props.context.spHttpClient
      .get(
        `${props.context.pageContext.web.absoluteUrl}/_api/web/Lists/GetbyTitle('teamlist')/Items`,
        SPHttpClient.configurations.v1
      )
      .then((res: SPHttpClientResponse): Promise<{ value: any }> => {
        return res.json();
      })
      .then((response) => setData(response.value));
  };

  return (
    <section className={`${styles.misite} `}>
      <div> HELLO WORLD</div>

      {data ? data.map((d: any) => <div>{d.Title}</div>) : "nothing to show"}
    </section>
  );
};

export default Misite;
