import React, { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import styles from  "./tabs.module.css";

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const handleActiveTab = useCallback(label => setActiveTab(label), []);

  const tabs = children.map(child => (
    <button
      onClick={e => {
        e.preventDefault();
        handleActiveTab(child.props.label);
      }}
      className={
        child.props.label === activeTab
          ? `${styles.tabs__tab} ${styles["tabs__tab-active"]}`
          : styles.tabs__tab
      }
      key={child.props.label}
    >
      {child.props.tabName}
    </button>
  ));
  const tabContent = children.filter(child => child.props.label === activeTab);
  return (
    <div>
      <div className={styles.tabs__box}>{tabs}</div>
      <div className={styles.tabs__wrapper}>{tabContent}</div>
    </div>
  );
}

function Tab({children}) {
  return  <div>{children}</div>;
}

export { Tabs, Tab };

Tabs.propTypes = {
  children: PropTypes.node.isRequired
}

Tab.propTypes = {
  children: PropTypes.node.isRequired
}