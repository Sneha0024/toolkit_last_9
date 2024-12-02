import React, { useState, useEffect } from "react";
import yaml from "js-yaml";
import "./App.css";
import AlertGroup from "./AlertGroup";
import logo from "./assests/logo.svg";
import nav from "./assests/github-header-icon.svg";
import search from "./assests/search.svg"
import last from "./assests/last.svg"
function App() {
  const [alertGroups, setAlertGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/_data/rules.yml"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch YAML file.");
        }
        return response.text();
      })
      .then((yamlText) => {
        const data = yaml.load(yamlText);
        setAlertGroups(Array.isArray(data.groups) ? data.groups : []);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Filter alerts based on search
  const filteredGroups = alertGroups.map((group) => ({
    ...group,
    services: group.services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <>
      <header className="flex justify-between container">
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="flex items-center"><img src={nav} alt="" className="mr-1"/><span className="text-slate-500 font-medium text-3">125 stars</span></div>
      </header>
      <div className="border-t-[1px] border-slate-200 border-solid mb-12"></div>
      <div className="container">
        <div className="">
          <h1 className="text-slate-600 font-medium text-5 mb-4">Browse Library</h1>
          <div className="mb-4 border-[1px] border-slate-200 border-solid rounded-md py-2 pr-3 pl-8 relative">
            <img src={search} alt="" className="w-5 absolute left-[9px] top-[9px]"/>
            <input
            type="text"
            placeholder="Search for a component"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
      
          </div>
        </div>

        <div className="alert-groups">
          {error && <p className="error">{error}</p>}
          {filteredGroups.map((group, index) => (
            <AlertGroup key={index} group={group} />
          ))}
        </div>
      </div>
      <div className="border-t-[1px] border-slate-200 border-solid mt-12"></div>
      <footer className="container flex justify-between !py-5">
        <span className="text-slate-400 font-medium text-[14px]">Contribute on GitHub</span>
        <span className="flex items-center"><span className="text-slate-400 font-medium text-[14px]">Maintained by Last9</span><img src={last} alt="" className="ml-2"/></span>
      </footer>
    </>
  );
}

export default App;
