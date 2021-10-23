import React from "react";
import { useGlobalContext } from "strapi-helper-plugin";
import { Flex, Padded, Text, Separator } from "@buffetjs/core";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pluginId from "../../pluginId";

const Published = ({
    shortId,
    siteUrl,
    previewURl,
    deploymentTime
}) => {
    const { formatMessage } = useGlobalContext();
    return (
        <div style={{
            backgroundColor: "rgb(255 252 252)",
            borderRadius: "2px",
            boxShadow: "0 2px 4px #e3e9f3",
            borderLeft: "4px solid green"
            }}>
            <Padded top bottom left right size="md">
                <Flex justifyContent='space-between' alignItems="center">
                    <Text fontWeight="bold" fontSize="lg">
                    {formatMessage({ id: `${pluginId}.home.current.deploy` })}
                    </Text>
                    <Text fontWeight="bold">
                        {formatMessage({ id: `${pluginId}.home.publish.visit` })} <a href={siteUrl} 
                        target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a> 
                    </Text>
                </Flex>
                
                <Padded top size="sm">
                    <Text>
                        {formatMessage({ id: `${pluginId}.home.publish.code` })} - {shortId}
                    </Text>
                </Padded>
                <Padded top bottom size="xs">
                    {formatMessage({ id: `${pluginId}.home.publish.on` })} <time datetime={deploymentTime.raw}>
                        <strong>{deploymentTime.date}</strong> {formatMessage({ id: `${pluginId}.home.publish.at` })} <strong>{deploymentTime.time}</strong>
                    </time>
                </Padded>
                <Text fontWeight="bold">
                    {formatMessage({ id: `${pluginId}.home.publish.preview` })} <a href={previewURl} 
                    target="_blank" rel="noopener noreferrer">
                        {previewURl} <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                </Text>
            </Padded>
        </div> 
  );
}

export default Published;