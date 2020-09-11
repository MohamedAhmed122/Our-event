import React from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from './AboutTab/AboutTab'
import PhotosTab from './PhotosTab/PhotoTab'
import EventsTab from "./EventsTab/EventTab";
import FollowerTab from "./FollowerTab/FollowerTab";
import { useState } from "react";

const ProfileContent = ({profile , isCurrentUser}) => {
  const [activeTab, setActiveTab] = useState(0)
  const panes = [
    { menuItem: "About", render: () => <AboutTab profile={profile} isCurrentUser={isCurrentUser}/> },
    { menuItem: "Photos", render: () => <PhotosTab  profile={profile} isCurrentUser={isCurrentUser} /> },
    { menuItem: "Events", render: () => <EventsTab profile={profile} isCurrentUser={isCurrentUser}/> },
    { menuItem: "Followers", render: () => <FollowerTab profile={profile} activeTab={activeTab} />},
    { menuItem: "Following", render: () => <FollowerTab profile={profile} activeTab={activeTab}/> },
  ];

  return (
        <Tab
        menu={{ fluid: false, vertical: false }}
        menuPosition="right"
        panes={panes}
        onTabChange={(e,data)=>setActiveTab(data.activeIndex)}
        />
  );
};
export default ProfileContent;
