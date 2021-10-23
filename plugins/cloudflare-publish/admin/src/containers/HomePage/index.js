import React, { memo, useState, useEffect, useRef } from "react";

import { Button,  Padded, Text, Separator } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import { LoadingBar } from "@buffetjs/styles";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext, request } from "strapi-helper-plugin";
import Published from '../Published';

import pluginId from "../../pluginId";

const POLL_INTERVAL = 10000;

const HomePage = () => {
  const { formatMessage } = useGlobalContext();
  const [ready, setReady] = useState(false);
  const [publishStatus, setPublishStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [publishData, setPublishData] = useState(null);

  useEffect(() => {
    let timeout;
    const checkBusy = async () => {
      const { 
        busy,
        numberOfDeploys,
        status,
        deploy
      } = await request(`/${pluginId}/check`, { method: "GET" });

      setPublishStatus(status);
      setBusy(numberOfDeploys > 0 && busy);
      setReady(true);
      setPublishData(deploy)
      if (!busy) {
        setPublishData(deploy)
      } else {
        setPublishData(null)
      }


      timeout = setTimeout(checkBusy, POLL_INTERVAL);
    };

    checkBusy();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const triggerPublish = async () => {
    setBusy(true);
    setPublishData(null)
    const resp = await request(`/${pluginId}/publish`, { method: "GET" })
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
            <Text fontWeight="bold" fontSize="md">{formatMessage({ id: `${pluginId}.home.current.status` })} <span 
              style={{color: '#e2a01d'}}>{publishStatus}
              </span></Text>
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
            <Padded top bottom size="md">
              <Separator />
            </Padded>
            {publishData && <Published {...publishData}/>}

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