import React, { useState } from "react";
import yaml from "js-yaml";
import "./AlertGroup.css";
import { FaQuestionCircle } from "react-icons/fa"; // Fallback icon
import "bootstrap/dist/css/bootstrap.min.css";
import puzzle from "./assests/puzzle-icon.svg";
import headerIcon from "./assests/modal-header-icon.svg";
import close from "./assests/close.svg";
import button from "./assests/button.svg";

import {
  SiPrometheus,
  SiDocker,
  SiWindows,
  SiVmware,
  SiNetdata,
  SiMysql,
  SiPostgresql,
  SiMicrosoftsqlserver,
  SiPatreon, // No Patroni icon, using Patreon as placeholder
  SiPlex, // No PGBouncer icon, using Plex as placeholder
  SiRedis,
  SiMongodb,
  SiRabbitmq,
  SiElasticsearch,
  SiMeilisearch,
  SiApachecassandra,
} from "react-icons/si";
import {
  SiClickhouse,
  SiZookeeper,
  SiApachekafka,
  // SiApachenifi, // Placeholder for Pulsar
  SiNginx,
  SiApache,
  // SiHaproxy,
  SiTraefikmesh,
  SiPhp,
  // SiJava,
  SiKubernetes,
  SiHashicorp,
  SiConsul,
  SiElasticstack, // Placeholder for Etcd
  SiLinktree, // Placeholder for Linkerd
  SiIstio,
  SiArgo,
  SiCeph,
  SiSpeedtest,
  // SiOpenebs,
  SiMinutemailer, // Placeholder for Minio
  SiLetsencrypt, // For SSL/TLS
  // SiJuniper,
  // SiCoredns,
  SiGrafana, // Placeholder for Graph Node
  SiJenkins,
  // SiCortex,
  SiThymeleaf, // Placeholder for Thanos
  SiCloudflare,
} from "react-icons/si";

function AlertGroup({ group }) {
  const [alertRules, setAlertRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Safeguard: Ensure services exist and are an array.
  const services = group?.services || [];

  // Fetch alert rules on button click
  const fetchAlertRules = (slug) => {
    setLoading(true);
    setError(null);

    const url =
      "https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/prometheus-self-monitoring/embedded-exporter.yml";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch alert rules.");
        }
        return response.text();
      })
      .then((yamlText) => {
        const data = yaml.load(yamlText);
        setAlertRules(data.groups ? data.groups[0]?.rules : []);
        setIsModalOpen(true); // Open modal when alert rules are fetched
        console.log(data, "modal data");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setAlertRules([]);
  };

  // Mapping service names to icons
  const serviceIcons = {
    "Prometheus self-monitoring": <SiPrometheus />,
    "Docker containers": <SiDocker />,
    "Windows Server": <SiWindows />,
    VMware: <SiVmware />,
    Netdata: <SiNetdata />,
    MySQL: <SiMysql />,
    PostgreSQL: <SiPostgresql />,
    "SQL Server": <SiMicrosoftsqlserver />,
    Patroni: <SiPatreon />, // Placeholder for Patroni
    PGBouncer: <SiPlex />, // Placeholder for PGBouncer
    Redis: <SiRedis />,
    MongoDB: <SiMongodb />,
    RabbitMQ: <SiRabbitmq />,
    Elasticsearch: <SiElasticsearch />,
    Meilisearch: <SiMeilisearch />,
    Cassandra: <SiApachecassandra />,
    Clickhouse: <SiClickhouse />,
    // SiZookeeper: <SiZookeeper />,
    Kafka: <SiApachekafka />,
    // Pulsar: <SiApachenifi />, // Placeholder
    // Nats: <SiApachenifi />, // Placeholder
    Solr: <SiApache />, // Placeholder
    Hadoop: <SiApache />,
    Nginx: <SiNginx />,
    Apache: <SiApache />,
    // HaProxy: <SiHaproxy />,
    Traefik: <SiTraefikmesh />,
    "PHP-FPM": <SiPhp />,
    // JVM: <SiJava />,
    Sidekiq: <SiGrafana />, // Placeholder
    Kubernetes: <SiKubernetes />,
    Nomad: <SiHashicorp />,
    Consul: <SiConsul />,
    Etcd: <SiElasticstack />, // Placeholder
    Linkerd: <SiLinktree />, // Placeholder
    Istio: <SiIstio />,
    ArgoCD: <SiArgo />,
    Ceph: <SiCeph />,
    SpeedTest: <SiSpeedtest />,
    ZFS: <SiSpeedtest />, // Placeholder
    // OpenEBS: <SiOpenebs />,
    Minio: <SiMinutemailer />, // Placeholder
    "SSL/TLS": <SiLetsencrypt />,
    // Juniper: <SiJuniper />,
    // CoreDNS: <SiCoredns />,
    Freeswitch: <SiGrafana />, // Placeholder
    "Graph Node": <SiGrafana />, // Placeholder
    // "APC UPS": <SiApachenifi />, // Placeholder
    Jenkins: <SiJenkins />,
    // Cortex: <SiCortex />,
    Promtail: <SiPrometheus />, // Placeholder
    Loki: <SiPrometheus />, // Placeholder
    Thanos: <SiThymeleaf />, // Placeholder
    Cloudflare: <SiCloudflare />,
  };
  // Define colors for each service
  const serviceColors = {
    "Prometheus self-monitoring": "text-red-500",
    "Docker containers": "text-blue-500",
    "Windows Server": "text-blue-500",
    VMware: "text-yellow-500",
    Netdata: "text-green-500",
    MySQL: "text-blue-600",
    PostgreSQL: "text-blue-700",
    "SQL Server": "text-red-700",
    Patroni: "text-gray-500",
    PGBouncer: "text-indigo-500",
    Redis: "text-red-600",
    MongoDB: "text-green-600",
    RabbitMQ: "text-orange-500",
    Elasticsearch: "text-yellow-400",
    Meilisearch: "text-gray-600",
    Cassandra: "text-purple-600",
    Clickhouse: "text-yellow-500",
    // SiZookeeper: "text-orange-500",
    Kafka: "text-black",
    Pulsar: "text-purple-600",
    Nats: "text-blue-400",
    Solr: "text-orange-600",
    Hadoop: "text-blue-700",
    Nginx: "text-green-500",
    Apache: "text-red-500",
    HaProxy: "text-green-600",
    Traefik: "text-blue-600",
    "PHP-FPM": "text-purple-400",
    JVM: "text-orange-700",
    Sidekiq: "text-red-600",
    Kubernetes: "text-blue-500",
    Nomad: "text-gray-700",
    Consul: "text-pink-500",
    Etcd: "text-blue-400",
    Linkerd: "text-cyan-500",
    Istio: "text-blue-600",
    ArgoCD: "text-red-600",
    Ceph: "text-red-700",
    SpeedTest: "text-green-400",
    ZFS: "text-gray-500",
    OpenEBS: "text-blue-600",
    Minio: "text-yellow-600",
    "SSL/TLS": "text-gray-400",
    Juniper: "text-green-600",
    CoreDNS: "text-gray-600",
    Freeswitch: "text-blue-600",
    "Graph Node": "text-purple-500",
    "APC UPS": "text-gray-700",
    Jenkins: "text-blue-600",
    Cortex: "text-orange-600",
    Promtail: "text-green-500",
    Loki: "text-purple-600",
    Thanos: "text-gray-400",
    Cloudflare: "text-orange-500",
  };
  if (services.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-slate-400 font-bold text-3 uppercase !mb-4">
        {group?.name || "Unnamed Group"}
      </h2>
      <div className="grid gap-4 grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="border-[1px] border-slate-100 border-solid rounded-[4px] p-6"
          >
            <div className="flex items-center gap-2 mb-[18px]">
              <div
                className={`${serviceColors[service?.name]} w-6 h-6 icon-div`}
              >
                {serviceIcons[service?.name] || (
                  <img src={puzzle} className="w-full h-full" />
                )}
              </div>
              <h3 className="text-slate-600 font-bold text-[14px] leading-5 mb-0">
                {service?.name || "Unnamed Service"}
              </h3>
            </div>
            <p className="text-slate-400 text-[14px] font-medium line-clamp-3 mb-4">
              <span className="text-slate-400 font-bold text-3 px-[6px] py-[2px] bg-slate-100 rounded-full w-fit mb-0 inline mr-2">
                {service?.exporters[0]?.rules?.length || 0} RULES
              </span>

              {service?.exporters[0]?.rules
                ?.map((rule) => rule.name)
                .join(", ")}
            </p>
            {/* Only enable "View Alert Rules" button for the first card */}
            {index === 0 ? (
              <button
                className="border-[1px] border-slate-200 border-solid rounded-[4px] p-[6px] text-slate-600 font-semibold text-3 w-full leading-1"
                onClick={() => fetchAlertRules(service?.exporters[0]?.slug)}
              >
                {loading ? "Loading..." : "View Alert Rules"}
              </button>
            ) : (
              <button className="border-[1px] border-slate-200 border-solid rounded-[4px] p-[6px] text-slate-600 font-semibold text-3 w-full leading-1">
                View Alert Rules
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      {isModalOpen && (
        <div
          className="modal fade show d-block mx-h-[100vh] overflow-hidden"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="alertRulesModal"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="m-auto md:w-[784px] flex items-center justify-center min-h-[100vh]"
            role="document"
          >
            <div className="modal-content w-full max-h-[70%] xl:max-h-[556px] overflow-auto relative">
              {/* Modal Header */}
              <div className="py-4 px-6 flex justify-between border-b-[1px] border-slate-200 border-solid">
                <div className="flex items-center gap-2">
                  <img src={headerIcon} /> Prometheus Self-Monitoring
                  <h5
                    className="text-slate-600 text-4 leading-6 font-semibold"
                    id="alertRulesModal"
                  ></h5>
                  <span className="text-slate-400 font-bold text-3 px-[6px] py-[2px] bg-slate-100 rounded-full w-fit mb-0 inline mr-2">
                    {alertRules.length} RULES
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    className=""
                    aria-label="Close"
                    onClick={closeModal}
                  >
                    <img src={close} alt="" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="">
                {alertRules && alertRules.length > 0 ? (
                  <div className="">
                    {alertRules.map((rule, idx) => (
                      <div key={idx} className="mb-6 px-6 pt-6">
                        <div className="d-flex mb-4">
                          <span className="text-slate-500 justify-center font-bold text-3 px-[6px] py-[2px] bg-slate-100 rounded-full mb-0  mr-4 h-10 w-10 flex items-center">
                            0{idx + 1}
                          </span>

                          <div>
                            <h6 className="text-slate-600 text-4 font-medium leading-5 m-0">
                              {rule.alert}
                            </h6>
                            <p className="text-slate-500 text-3 font-medium leading-5 m-0">
                              {rule.annotations?.summary}
                            </p>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded ml-13 relative overflow-hidden">
                          <button className="border-none bg-none absolute right-0 top-0">
                            <img src={button} alt="copy-btn" className="" />
                          </button>

                          <pre className="font-jetbrains text-slate-600 overflow-hidden">
                            <span className="text-green-1">- alert:</span>{" "}
                            {rule.alert}
                            {`\n`}
                            <span className="text-green-1"> expr:</span>{" "}
                            {rule.expr}
                            {`\n`}
                            <span className="text-green-1"> for:</span>{" "}
                            {rule.for}
                            {`\n`}
                            <span className="text-green-1"> labels:</span>
                            {`\n`}
                            <span className="text-green-1">
                              {" "}
                              severity:
                            </span>{" "}
                            {rule.labels.severity}
                            {`\n`}
                            <span className="text-green-1"> annotations:</span>
                            {`\n`}
                            <span className="text-green-1"> summary:</span>{" "}
                            {rule.annotations.summary}
                            {`\n`}
                            <span className="text-green-1">
                              {" "}
                              description:
                            </span>{" "}
                            {rule.annotations.description}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No alert rules found.</p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertGroup;
