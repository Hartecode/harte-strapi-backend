import React, { memo, useState, useEffect, useRef } from "react";

import { Button, Padded, Text } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import { LoadingBar } from "@buffetjs/styles";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext, request } from "strapi-helper-plugin";

import pluginId from "../../pluginId";

const POLL_INTERVAL = 10000;

const HomePage = () => {
  const { formatMessage } = useGlobalContext();
  const [ready, setReady] = useState(true);
  const [busy, setBusy] = useState(false);

  // useEffect(() => {
  //   let timeout;
  //   const checkBusy = async () => {
  //     const { busy } = await request(`/${pluginId}/check`, { method: "GET" });

  //     setBusy(busy);
  //     setReady(true);

  //     timeout = setTimeout(checkBusy, POLL_INTERVAL);
  //   };

  //   checkBusy();

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  const triggerPublish = async () => {
    setBusy(true);

    await request(`/${pluginId}/publish`, { method: "GET" });
  };

  const handleClick = () => {
    const ok = confirm(
      formatMessage({ id: `${pluginId}.home.prompt.confirm` })
    );
    if (ok) triggerPublish();
  };

  return (
    <Padded size="md" top left bottom right>
      <Header
        title={{ label: formatMessage({ id: `${pluginId}.home.title` }) }}
        content={formatMessage({ id: `${pluginId}.home.description` })}
      />
      {ready ? (
        busy ? (
          <>
            <LoadingBar />
            <Text>{formatMessage({ id: `${pluginId}.home.busy` })}</Text>
          </>
        ) : (
          <>
            <Padded size="md" bottom>
              <Text>{formatMessage({ id: `${pluginId}.home.prompt` })}</Text>
            </Padded>
            <Button
              color="primary"
              icon={<FontAwesomeIcon icon={faUpload} />}
              onClick={handleClick}
            >
              {formatMessage({ id: `${pluginId}.home.button.publish` })}
            </Button>
          </>
        )
      ) : (
        <>
          <LoadingBar />
          <Text>{formatMessage({ id: `${pluginId}.home.notready` })}</Text>
        </>
      )}
    </Padded>
  );
};

export default memo(HomePage);