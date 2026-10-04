/* =====================================================================
   Zhang Lab website data
   Edit this file to update the site. You never need to touch index.html.
   Newest items go at the TOP of each list.
   ===================================================================== */

/* ---------- News ----------
   type: "paper"    -> "Congratulations to {student} on the paper "{title}" being accepted to {venue}!"
   type: "workshop" -> "{student} presented the poster "{title}" at the {venue}."
   date: any text shown on the left, e.g. "2026", "Sep 5, 2025"
   tag:  optional, "new" or "award"; label is the badge text            */
const NEWS = [
  {date:"2026", type:"paper", student:"Jing Zou", title:"CoSFR: Cosine-Guided Sample-Wise Feature Restoration for Robust Zero-Shot Vision-Language Models", venue:"BMVC 2026", tag:"new", label:"New"},
  {date:"2026", type:"paper", student:"Prajwal Basnet", title:"FlushSync: The Hidden Synchronization Bottleneck in LSM-tree based Stream Processing", venue:"ACM DEBS 2026"},
  {date:"2026", type:"paper", student:"Jing Zou", title:"HAD: Hybrid Adversarial Distillation Against Adversarial Attacks", venue:"IEEE ICASSP 2026"},
  {date:"Nov 21, 2025", type:"workshop", student:"Jing Zou", title:"DARD: Dice Adversarial Robustness Distillation Against Adversarial Attacks", venue:"AI in Research and Education (AIRE) Workshop"},
  {date:"Sep 5, 2025", type:"workshop", student:"Prajwal Basnet", title:"FlushSync: Hardware Resource Stalling caused by Asynchronous Services in LSM-tree based Stateful Streaming Processing Engine", venue:"Cyber-Physical Systems Innovation Symposium 2025"},
  {date:"2025", type:"paper", student:"Jing Zou", title:"DARD: Dice Adversarial Robustness Distillation Against Adversarial Attacks", venue:"SecureComm 2025", tag:"award", label:"Best Student Paper"}
];

/* ---------- PhD students ----------
   Listed in this order. Names here are also underlined in the publication list.
   photo: optional, e.g. "assets/jing.jpg" (otherwise initials are shown)   */
const STUDENTS = [
  {name:"Prajwal Basnet", since:"Spring 2024", topics:"Stream processing systems, LSM-tree storage, performance bottlenecks"},
  {name:"Jing Zou", since:"Summer 2024", topics:"Adversarial robustness, robustness distillation, vision-language models"}
];

/* ---------- Publications ----------
   y: year   k: "conf" (conference) or "jour" (journal)
   t: title  a: authors, separated by ", "   v: venue (<b>..</b> for bold)
   url: optional link   award: optional badge text                          */
const PUBS = [
 {y:2026,k:"conf",t:"CoSFR: Cosine-Guided Sample-Wise Feature Restoration for Robust Zero-Shot Vision-Language Models",a:"Jing Zou, Shungeng Zhang, Prajwal Basnet, Meikang Qiu",v:"British Machine Vision Conference (<b>BMVC 2026</b>)"},
 {y:2026,k:"conf",t:"FlushSync: The Hidden Synchronization Bottleneck in LSM-tree based Stream Processing",a:"Prajwal Basnet, Shungeng Zhang, Jianshu Liu, Jing Zou",v:"ACM International Conference on Distributed and Event-Based Systems (<b>DEBS 2026</b>)"},
 {y:2026,k:"conf",t:"HAD: Hybrid Adversarial Distillation Against Adversarial Attacks",a:"Jing Zou, Shungeng Zhang, Meikang Qiu",v:"IEEE International Conference on Acoustics, Speech, and Signal Processing (<b>ICASSP 2026</b>), Barcelona, Spain"},
 {y:2025,k:"conf",t:"DARD: Dice Adversarial Robustness Distillation Against Adversarial Attacks",a:"Jing Zou, Shungeng Zhang, Meikang Qiu",v:"EAI International Conference on Security and Privacy in Communication Networks (<b>SecureComm 2025</b>), Xiangtan, China",award:"Best Student Paper"},
 {y:2024,k:"conf",t:"Different Attack and Defense Types for AI Cybersecurity",a:"Jing Zou, Shungeng Zhang, Meikang Qiu",v:"International Conference on Knowledge Science, Engineering and Management (<b>KSEM 2024</b>), Birmingham, UK"},
 {y:2024,k:"conf",t:"Adversarial Attacks on Large Language Models",a:"Jing Zou, Shungeng Zhang, Meikang Qiu",v:"International Conference on Knowledge Science, Engineering and Management (<b>KSEM 2024</b>), Birmingham, UK"},
 {y:2023,k:"conf",t:"μConAdapter: Reinforcement Learning-based Fast Concurrency Adaptation for Microservices in Cloud",a:"Jianshu Liu, Shungeng Zhang, Qingyang Wang",v:"ACM Symposium on Cloud Computing (<b>SoCC 2023</b>), Santa Cruz, CA, USA"},
 {y:2023,k:"conf",t:"Sora: A Latency Sensitive Approach for Microservice Soft Resource Adaptation",a:"Jianshu Liu, Qingyang Wang, Shungeng Zhang, Liting Hu, Dilma Da Silva",v:"ACM/IFIP International Middleware Conference (<b>Middleware 2023</b>), Bologna, Italy"},
 {y:2022,k:"conf",t:"ShadowSync: Latency Long Tail caused by Hidden Synchronization in Real-time LSM-tree based Stream Processing Systems",a:"Shungeng Zhang, Qingyang Wang, Yasuhiko Kanemasa, Julius Michaelis, Jianshu Liu, Calton Pu",v:"ACM/IFIP International Middleware Conference (<b>Middleware 2022</b>), Quebec, Canada",url:"https://doi.org/10.1145/3528535.3565251"},
 {y:2022,k:"jour",t:"Coordinating Fast Concurrency Adapting with Autoscaling for SLO-Oriented Web Applications",a:"Jianshu Liu, Shungeng Zhang, Qingyang Wang, Jinpeng Wei",v:"IEEE Transactions on Parallel and Distributed Systems (<b>IEEE TPDS</b>)"},
 {y:2021,k:"conf",t:"A Functional Model and Analysis of Next Generation Malware Attacks and Defenses",a:"Calton Pu, Qingyang Wang, Yasuhiko Kanemasa, Rodrigo Alves Lima, Joshua Kimball, Shungeng Zhang, Jianshu Liu, Xuhang Gu",v:"IEEE International Conference on Trust, Privacy and Security in Intelligent Systems and Applications (<b>TPS-ISA 2021</b>), Atlanta, USA"},
 {y:2020,k:"conf",t:"DoubleFaceAD: A New Datastore Driver Architecture to Optimize Fanout Query Performance",a:"Shungeng Zhang, Qingyang Wang, Yasuhiko Kanemasa, Jianshu Liu, Calton Pu",v:"ACM/IFIP International Middleware Conference (<b>Middleware 2020</b>), Delft, Netherlands"},
 {y:2020,k:"conf",t:"Mitigating Large Response Time Fluctuations through Fast Concurrency Adapting in the Cloud",a:"Jianshu Liu, Shungeng Zhang, Qingyang Wang, Jinpeng Wei",v:"IEEE International Parallel &amp; Distributed Processing Symposium (<b>IPDPS 2020</b>), New Orleans, LA, USA"},
 {y:2019,k:"conf",t:"Tail Amplification in n-Tier Systems: A Study of Transient Cross-Resource Contention Attacks",a:"Shungeng Zhang, Huasong Shan, Qingyang Wang, Jianshu Liu, Qiben Yan, Jinpeng Wei",v:"IEEE International Conference on Distributed Computing Systems (<b>ICDCS 2019</b>), Dallas, TX, USA"},
 {y:2019,k:"jour",t:"The Impact of Event Processing Flow on Asynchronous Server Efficiency",a:"Shungeng Zhang, Qingyang Wang, Yasuhiko Kanemasa, Huasong Shan, Liting Hu",v:"IEEE Transactions on Parallel and Distributed Systems (<b>IEEE TPDS</b>), vol. 31, no. 3"},
 {y:2019,k:"jour",t:"Optimizing N-Tier Application Scalability in the Cloud: A Study of Soft Resource Allocation",a:"Qingyang Wang§, Shungeng Zhang§, Yasuhiko Kanemasa, Calton Pu, Balaji Palanisamy, Lilian Harada, Motoyuki Kawaba",v:"ACM Transactions on Modeling and Performance Evaluation of Computing Systems (<b>ACM TOMPECS</b>), vol. 4, no. 2 (§ equal contribution)"},
 {y:2019,k:"jour",t:"Mitigating Tail Response Time of n-Tier Applications: The Impact of Asynchronous Invocations",a:"Qingyang Wang, Shungeng Zhang, Yasuhiko Kanemasa, Calton Pu",v:"ACM Transactions on Internet Technology (<b>ACM TOIT</b>), vol. 19, no. 3"},
 {y:2019,k:"jour",t:"Integrating Concurrency Control in n-Tier Application Scaling Management in the Cloud",a:"Qingyang Wang, Hui Chen, Shungeng Zhang, Liting Hu, Balaji Palanisamy",v:"IEEE Transactions on Parallel and Distributed Systems (<b>IEEE TPDS</b>), vol. 30, no. 4, pp. 855–869"},
 {y:2018,k:"conf",t:"Improving Asynchronous Invocation Performance in Client-server Systems",a:"Shungeng Zhang, Qingyang Wang, Yasuhiko Kanemasa",v:"IEEE International Conference on Distributed Computing Systems (<b>ICDCS 2018</b>), Vienna, Austria"},
 {y:2017,k:"conf",t:"A Study of Long-Tail Latency in n-Tier Systems: RPC vs. Asynchronous Invocations",a:"Qingyang Wang, Chien-An Lai, Yasuhiko Kanemasa, Shungeng Zhang, Calton Pu",v:"IEEE International Conference on Distributed Computing Systems (<b>ICDCS 2017</b>), Atlanta, GA, USA"}
];
