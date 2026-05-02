import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  Database,
  Factory,
  Gauge,
  ImageIcon,
  Layers3,
  Mail,
  MapPin,
  Network,
  Phone,
  Play,
  Radar,
  Search,
  X,
} from "lucide-react";
import "./styles.css";

type EvidenceKind = "image" | "video";
type EvidenceGroup = "结果证据";

type EvidenceItem = {
  src: string;
  label: string;
  group: EvidenceGroup;
  desc?: string;
  kind?: EvidenceKind;
  poster?: string;
};

type Project = {
  id: string;
  title: string;
  subtitle: string;
  short: string;
  accent: string;
  gradient: string;
  visual: string;
  route: string[];
  stack: string[];
  focus: string;
  resultLogic: string[];
  evidence: EvidenceItem[];
};

type ResultSection = {
  title: string;
  body: string[];
  items: EvidenceItem[];
};

const asset = (path: string) => `/public_content/${path}`;

const projects: Project[] = [
  {
    id: "01_spider2table",
    title: "spider2table",
    subtitle: "KOL 数据采集与任务编排系统",
    short: "围绕账号输入、任务拆分、异步执行、结构化表格输出和监控反馈组织成一条数据管道。",
    accent: "#4f8cff",
    gradient: "linear-gradient(135deg, #4f8cff, #00c2ff)",
    visual: asset("01_spider2table/00_project_visual/project_visual.png"),
    route: ["账号输入", "FastAPI 建任务", "PostgreSQL 状态表", "Redis/RQ 队列", "EasyKOL / Apify / DeepSeek", "Merge 汇总", "导出与监控"],
    stack: ["FastAPI", "PostgreSQL", "Redis/RQ", "Apify", "DeepSeek", "Prometheus", "Temporal", "Docker"],
    focus: "系统工程 / 异步任务 / 数据管道 / 可观测性",
    resultLogic: ["API 调度入口", "任务状态表", "Prometheus 监控", "Temporal 工作流", "关键结果视频"],
    evidence: [
      { src: asset("01_spider2table/02_technical_route/dispatch_logic_diagram.svg"), label: "任务拆分与调度逻辑", group: "结果证据" },
      { src: asset("01_spider2table/02_technical_route/dispatch_database_view.svg"), label: "provider_runs 与任务状态视图", group: "结果证据" },
      { src: asset("01_spider2table/02_technical_route/database_dependency_logic_landscape.svg"), label: "数据表依赖关系", group: "结果证据" },
      { src: asset("01_spider2table/04_results_showcase/system_results/01_fastapi_dispatch_api.png"), label: "FastAPI 接口与任务入口", group: "结果证据", desc: "系统对外暴露 dispatch / jobs / workers 等接口，任务可调用、可管理，并由后端服务统一调度。" },
      { src: asset("01_spider2table/04_results_showcase/system_results/02_prometheus_targets.png"), label: "Prometheus Targets 监控结果", group: "结果证据", desc: "API、worker 和依赖服务纳入监控，可查看服务存活状态和抓取目标。" },
      { src: asset("01_spider2table/04_results_showcase/system_results/03_temporal_workflow_ui.png"), label: "Temporal 工作流监视界面", group: "结果证据", desc: "用于展示异步任务的工作流监视入口，体现任务执行链路和失败排查能力。" },
      {
        src: asset("01_spider2table/04_results_showcase/videos/spider2table_key_results.mp4"),
        poster: asset("01_spider2table/04_results_showcase/videos/spider2table_demo_poster.jpg"),
        label: "关键结果拼接视频：表格结果与任务状态",
        desc: "从原 11 分钟录屏中截取关键段落，集中展示采集结果表、任务状态变化和结果输出，控制网页加载体积。",
        group: "结果证据" as EvidenceGroup,
        kind: "video" as EvidenceKind,
      },
    ],
  },
  {
    id: "02_smart_manufacturing",
    title: "智能制造大赛",
    subtitle: "工业互联网与系统集成平台",
    short: "以设备层、边缘层、平台层、应用层为主线，把现场设备、协议采集、数据平台和可视化控制串成闭环。",
    accent: "#19d3b0",
    gradient: "linear-gradient(135deg, #13c8a3, #2aa7ff)",
    visual: asset("02_smart_manufacturing/00_project_visual/project_visual.png"),
    route: ["PLC / HMI / RFID", "工业网络", "OPC UA 采集", "MQTT / Node-RED", "InfluxDB / MySQL", "Vue2 可视化", "控制写回"],
    stack: ["PLC", "HMI", "RFID", "OPC UA", "MQTT", "Node-RED", "EMQX", "InfluxDB", "Vue2", "ECharts"],
    focus: "工业互联网 / 系统集成 / 协议链路 / 数据闭环",
    resultLogic: ["现场数据接入", "OPC UA 采集", "Node-RED 消息流", "时序数据库", "Vue/ECharts 可视化"],
    evidence: [
      { src: asset("02_smart_manufacturing/01_project_background/01_competition_title.png"), label: "比赛方向与项目入口", group: "结果证据" },
      { src: asset("02_smart_manufacturing/01_project_background/02_industrial_network_device.jpeg"), label: "工业网络设备", group: "结果证据" },
      { src: asset("02_smart_manufacturing/01_project_background/03_competition_scene.jpeg"), label: "现场比赛与调试环境", group: "结果证据" },
      { src: asset("02_smart_manufacturing/02_technical_route/01_network_topology.png"), label: "工业网络拓扑", group: "结果证据" },
      { src: asset("02_smart_manufacturing/02_technical_route/02_opcua_data_browser.png"), label: "OPC UA 数据浏览", group: "结果证据" },
      { src: asset("02_smart_manufacturing/02_technical_route/03_node_red_flow.png"), label: "Node-RED 数据流", group: "结果证据" },
      { src: asset("02_smart_manufacturing/02_technical_route/04_process_simulate_scene.png"), label: "Process Simulate 虚拟产线", group: "结果证据" },
      { src: asset("02_smart_manufacturing/02_technical_route/05_hmi_control_panel.png"), label: "HMI 控制面板", group: "结果证据" },
      { src: asset("02_smart_manufacturing/03_tech_stack/01_opcua_python_code.png"), label: "OPC UA Python 采集代码", group: "结果证据" },
      { src: asset("02_smart_manufacturing/03_tech_stack/02_mqtt_python_code.png"), label: "MQTT Python 发布/订阅", group: "结果证据" },
      { src: asset("02_smart_manufacturing/03_tech_stack/03_node_red_function.png"), label: "Node-RED Function 节点", group: "结果证据" },
      { src: asset("02_smart_manufacturing/03_tech_stack/04_device_data_table.png"), label: "设备数据表", group: "结果证据" },
      { src: asset("02_smart_manufacturing/04_results_showcase/01_influxdb_dashboard.png"), label: "InfluxDB Dashboard", group: "结果证据", desc: "设备采集数据进入时序数据库后，在 InfluxDB 中形成可查询、可观察的生产数据面板。" },
      { src: asset("02_smart_manufacturing/04_results_showcase/02_data_explorer_curve.png"), label: "Data Explorer 曲线", group: "结果证据", desc: "单点位和多点位曲线展示 OPC UA / MQTT 链路的持续数据写入。" },
      { src: asset("02_smart_manufacturing/04_results_showcase/03_frontend_charts.jpeg"), label: "前端图表展示", group: "结果证据", desc: "Vue2 + ECharts 将设备点位、生产状态和趋势曲线整理成可读的生产监控界面。" },
    ],
  },
  {
    id: "03_microwave_signal_processing",
    title: "微波信号处理",
    subtitle: "微多普勒特征提取与参数反演",
    short: "从雷达回波、目标建模、时频谱到参数反演，展示完整的信号处理证据链。",
    accent: "#a77cff",
    gradient: "linear-gradient(135deg, #7c3aed, #25d0ff)",
    visual: asset("03_microwave_signal_processing/00_project_visual/project_visual.png"),
    route: ["实验采集", "信号预处理", "目标建模", "时频分析", "脊线跟踪", "参数反演", "结果验证"],
    stack: ["MATLAB", "FFT", "STFT", "EMD", "MUSIC", "SST", "micro-Doppler", "IQ echo"],
    focus: "雷达信号 / 时频分析 / 运动参数反演",
    resultLogic: ["硬件平台", "回波建模", "FFT / STFT / MUSIC", "SST + Ridge Tracking", "参数提取"],
    evidence: [
      { src: asset("03_microwave_signal_processing/05_ppt_story/01_radar_board_output.png"), label: "雷达板卡与输出频谱", group: "结果证据" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/02_lab_platform_overview.jpg"), label: "实验平台整体环境", group: "结果证据" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/03_rotating_blade_top_view.jpeg"), label: "旋转叶片俯视结构", group: "结果证据" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/04_experiment_platform_complete.jpeg"), label: "雷达与旋转平台搭建", group: "结果证据" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/05_capture_software_waveform.jpeg"), label: "采集软件原始波形", group: "结果证据" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/06_rotor_geometry_model.png"), label: "旋转叶片几何模型", group: "结果证据" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/07_blade_echo_component_model.png"), label: "叶片回波分量建模", group: "结果证据" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/08_frequency_domain_result.png"), label: "频域分析与转频估计", group: "结果证据", desc: "先用频域谱线估计旋转基频，作为后续时频分析和转速识别的低维验证。" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/09_stft_time_frequency_result.png"), label: "STFT 时频结果", group: "结果证据", desc: "展示旋转叶片微多普勒在时间-频率平面上的周期结构，用于观察叶尖散射轨迹。" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/10_music_spectrum_result.png"), label: "MUSIC 谱估计结果", group: "结果证据", desc: "补充高分辨谱估计结果，和 STFT 形成对照，增强频率结构识别的可信度。" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/11_cw_stft_result.png"), label: "CW 数据 STFT 结果", group: "结果证据", desc: "CW 雷达实测数据呈现稳定周期性条纹，对应叶片回波特征。" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/12_emd_component_result.png"), label: "EMD 分量提取结果", group: "结果证据", desc: "通过 EMD 分离叶片侧面反射等分量，降低混合回波对参数提取的干扰。" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/13_sst_result.png"), label: "SST 时频增强结果", group: "结果证据", desc: "用 SST 压缩时频能量，让脊线更清晰，为自动 Ridge Tracking 做准备。" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/14_parameter_extraction_result.png"), label: "脊线位置与参数提取", group: "结果证据", desc: "在时频图上定位脊线并平滑，得到可用于转速和半径反演的关键频率轨迹。" },
      { src: asset("03_microwave_signal_processing/05_ppt_story/15_radius_estimation_curve.png"), label: "半径估计误差曲线", group: "结果证据", desc: "用多组估计结果验证半径反演误差，展示算法结果的稳定性和误差范围。" },
    ],
  },
  {
    id: "04_math_modeling",
    title: "数学建模大赛",
    subtitle: "网球动量建模与比赛走势预测",
    short: "用比赛过程数据构造 momentum 指标，并通过模型结果和敏感性分析解释走势变化。",
    accent: "#ffd166",
    gradient: "linear-gradient(135deg, #eab308, #22c55e)",
    visual: asset("04_math_modeling/00_project_visual/project_visual.png"),
    route: ["比赛数据", "特征工程", "Momentum 指标", "Run test", "RandomForest / DTMM", "SHAP", "敏感性分析"],
    stack: ["Python", "RandomForest", "SHAP", "DTMM", "Run test", "Momentum"],
    focus: "数据建模 / 比赛走势 / 可解释分析",
    resultLogic: ["Momentum 序列", "DTMM 决策树", "特征选择", "比赛波动预测", "SHAP / 敏感性"],
    evidence: [
      { src: asset("04_math_modeling/05_result_story/01_momentum_time_series.png"), label: "Momentum 时间序列", group: "结果证据" },
      { src: asset("04_math_modeling/05_result_story/05_entropy_weight_table.jpeg"), label: "熵权法参数权重", group: "结果证据" },
      { src: asset("04_math_modeling/05_result_story/02_decision_tree_model.png"), label: "DTMM 决策树结构", group: "结果证据" },
      { src: asset("04_math_modeling/05_result_story/03_feature_selection_logic.png"), label: "特征选择逻辑", group: "结果证据" },
      { src: asset("04_math_modeling/05_result_story/04_prediction_bar_comparison.png"), label: "局内胜负预测对比", group: "结果证据", desc: "预测结果和真实结果在同一比赛窗口中对比，呈现局内走势变化。" },
      { src: asset("04_math_modeling/05_result_story/06_gon_prediction_match_1316.png"), label: "GON 预测曲线 match 1316", group: "结果证据", desc: "用 GON 指标验证比赛波动预测，重点展示预测值与真实走势的趋势一致性。" },
      { src: asset("04_math_modeling/05_result_story/07_factor_importance_pies.png"), label: "影响因素重要性", group: "结果证据", desc: "分析 points advantage、unforced errors、winner 等因素对 match swings 的贡献。" },
      { src: asset("04_math_modeling/05_result_story/08_us_open_transfer_prediction.png"), label: "US Open 迁移预测", group: "结果证据", desc: "把模型迁移到 US Open 数据，检验模型是否只适配单一赛事数据。" },
      { src: asset("04_math_modeling/05_result_story/09_shap_feature_contribution.png"), label: "SHAP 特征贡献", group: "结果证据", desc: "用 SHAP 解释模型决策，展示各特征对预测类别的贡献方向和强度。" },
    ],
  },
  {
    id: "05_iea_research",
    title: "IEA Research",
    subtitle: "EEG 与眼动融合的人因实验分析",
    short: "通过 eye tracking、EEG 与行为指标形成多模态实验解释链。",
    accent: "#5fd9ff",
    gradient: "linear-gradient(135deg, #0891b2, #a78bfa)",
    visual: asset("05_iea_research/00_project_visual/project_visual.png"),
    route: ["实验设计", "被试任务", "眼动采集", "EEG 采集", "行为指标", "统计分析", "状态解释"],
    stack: ["EEG", "Eye tracking", "Heatmap", "Theta", "Statistics", "Human factors"],
    focus: "人因实验 / 多模态数据 / 认知状态解释",
    resultLogic: ["实验流程", "EEG 电极布局", "眼动实验场景", "箱线图统计", "脑地形图"],
    evidence: [
      { src: asset("05_iea_research/05_result_story/01_experiment_design_flow.png"), label: "实验设计流程", group: "结果证据" },
      { src: asset("05_iea_research/05_result_story/02_eeg_channel_layout.png"), label: "EEG 电极布局", group: "结果证据" },
      { src: asset("05_iea_research/05_result_story/03_experiment_scene_front.png"), label: "实验场景正面", group: "结果证据" },
      { src: asset("05_iea_research/05_result_story/04_eye_tracking_experiment.png"), label: "Eye tracking 实验场景", group: "结果证据" },
      { src: asset("05_iea_research/05_result_story/05_mood_boxplot.png"), label: "Mood 指标箱线图", group: "结果证据", desc: "从主观量表角度比较不同实验条件下的情绪状态差异。" },
      { src: asset("05_iea_research/05_result_story/06_distance_boxplot.png"), label: "Distance 指标箱线图", group: "结果证据", desc: "用眼动距离指标观察注意分布差异，补充行为层面的解释。" },
      { src: asset("05_iea_research/05_result_story/07_theta_boxplot.png"), label: "Theta 指标箱线图", group: "结果证据", desc: "Theta 频段用于反映认知负荷和注意状态变化，和眼动指标形成交叉验证。" },
      { src: asset("05_iea_research/05_result_story/08_eeg_raw_signal.png"), label: "EEG 原始信号展示", group: "结果证据", desc: "实验采集到的 EEG 信号质量和通道信息为后续统计提供数据基础。" },
      { src: asset("05_iea_research/05_result_story/09_brain_topography.png"), label: "脑地形图结果", group: "结果证据", desc: "用脑地形图呈现不同条件下的脑区活动差异，作为最终可视化结果。" },
    ],
  },
  {
    id: "06_binder_3d_printing",
    title: "Binder Jet 3D Printing",
    subtitle: "成形缺陷分割与评估",
    short: "以分割模型识别成形缺陷，通过预测图、曲线和混淆矩阵验证质量评估效果。",
    accent: "#ff63b5",
    gradient: "linear-gradient(135deg, #db2777, #f97316)",
    visual: asset("06_binder_3d_printing/00_project_visual/project_visual.png"),
    route: ["样件图像", "预处理", "U-Net / SE-UNet", "Mask 重建", "Pred vs GT", "Accuracy", "Confusion matrix"],
    stack: ["U-Net", "SE-UNet", "Segmentation", "Mask", "Confusion matrix"],
    focus: "制造 AI / 缺陷分割 / 质量评估",
    resultLogic: ["训练过程", "预测对比", "收敛曲线", "类别误差"],
    evidence: [
      { src: asset("06_binder_3d_printing/02_technical_route/01_training_curve_viz.png"), label: "训练路线可视化", group: "结果证据" },
      { src: asset("06_binder_3d_printing/03_tech_stack/01_eval_matrix_viz.png"), label: "评估矩阵说明", group: "结果证据" },
      { src: asset("06_binder_3d_printing/04_results_showcase/01_pred_vs_gt_epoch10.png"), label: "Pred vs GT epoch 10", group: "结果证据", desc: "早期训练阶段的预测与标注对比，用于观察模型是否已经学到孔洞、裂纹等基本区域。" },
      { src: asset("06_binder_3d_printing/04_results_showcase/02_pred_vs_gt_epoch30.png"), label: "Pred vs GT epoch 30", group: "结果证据", desc: "训练后期预测结果更接近 Ground Truth，用于展示模型收敛后的分割质量。" },
      { src: asset("06_binder_3d_printing/04_results_showcase/03_accuracy_curve.png"), label: "Accuracy 曲线", group: "结果证据", desc: "通过训练/验证曲线观察模型收敛趋势，判断是否存在明显欠拟合或过拟合。" },
      { src: asset("06_binder_3d_printing/04_results_showcase/04_confusion_matrix.png"), label: "Confusion matrix", group: "结果证据", desc: "按类别检查误分布，定位模型在哪些缺陷类型上更容易混淆。" },
    ],
  },
  {
    id: "07_emblem_quality_detection",
    title: "徽标外观质量检测",
    subtitle: "YOLO 检测与 CNN 分类",
    short: "先检测候选区域，再进行 ROI 处理与分类，通过 PR 曲线和混淆矩阵验证效果。",
    accent: "#ff8a3d",
    gradient: "linear-gradient(135deg, #ea580c, #2563eb)",
    visual: asset("07_emblem_quality_detection/00_project_visual/project_visual.png"),
    route: ["待检图像", "YOLO 定位", "ROI 裁剪", "CNN 分类", "批量输出", "PR curve", "Confusion matrix"],
    stack: ["YOLO", "CNN", "OpenCV", "ROI", "PR curve", "Confusion matrix"],
    focus: "计算机视觉 / 目标检测 / 工业质检",
    resultLogic: ["检测场景", "YOLO 定位", "批量预测", "PR 曲线", "混淆矩阵"],
    evidence: [
      { src: asset("07_emblem_quality_detection/01_project_background/01_inspection_scene.jpg"), label: "检测场景", group: "结果证据" },
      { src: asset("07_emblem_quality_detection/02_technical_route/01_cnn_structure.png"), label: "CNN 结构", group: "结果证据" },
      { src: asset("07_emblem_quality_detection/04_results_showcase/01_yolo_results.png"), label: "YOLO 检测结果", group: "结果证据", desc: "展示模型在单张工件图中的定位和类别输出，验证能识别徽标缺陷区域。" },
      { src: asset("07_emblem_quality_detection/04_results_showcase/02_yolo_batch_prediction.jpg"), label: "批量预测结果", group: "结果证据", desc: "多张样本在同一批预测图中输出，呈现批量检测效果。" },
      { src: asset("07_emblem_quality_detection/04_results_showcase/03_confusion_matrix.png"), label: "Confusion matrix", group: "结果证据", desc: "用混淆矩阵查看 OK、磨损、缺失、破洞等类别之间的识别误差。" },
      { src: asset("07_emblem_quality_detection/04_results_showcase/04_pr_curve.png"), label: "PR curve", group: "结果证据", desc: "用 Precision-Recall 曲线评估检测模型阈值变化下的整体表现。" },
    ],
  },
];

const projectIcons = [Database, Factory, Radar, Gauge, BrainCircuit, Layers3, Search];

const showcaseItems = [
  {
    title: "首页",
    subtitle: "综合能力总览",
    src: asset("technical_overview_hero.png"),
    accent: "#7dd3fc",
  },
  ...projects.map((project) => ({
    title: project.title,
    subtitle: project.subtitle,
    src: project.visual,
    accent: project.accent,
  })),
];

const resultStories: Record<string, ResultSection[]> = {
  "01_spider2table": [
    {
      title: "从账号输入到任务运行",
      body: [
        "演示视频按真实操作链路剪辑：输入 creator handle，提交采集任务，进入 Operation Runs 查看运行状态，保留关键操作与结果节点。",
        "FastAPI 接收任务后，系统进入异步执行流程；前端负责提交与查看，后端负责任务创建、状态记录和 worker 调度。",
      ],
      items: [
        { src: asset("01_spider2table/04_results_showcase/videos/spider2table_key_results.mp4"), poster: asset("01_spider2table/04_results_showcase/videos/spider2table_demo_poster.jpg"), label: "关键流程视频：输入 handle、运行任务、查看结果", group: "结果证据", kind: "video" },
        { src: asset("01_spider2table/04_results_showcase/system_results/01_fastapi_dispatch_api.png"), label: "FastAPI 任务接口", group: "结果证据" },
      ],
    },
    {
      title: "多 Provider 执行状态",
      body: [
        "任务会拆分到 EasyKOL、Apify、DeepSeek、Merge 等 provider 或 worker。provider_runs 状态表记录每个环节的开始、结束、成功、失败与错误信息。",
        "Prometheus 和 Temporal 提供运行监视入口，覆盖服务存活、任务链路、失败排查和最终合并状态。",
      ],
      items: [
        { src: asset("01_spider2table/02_technical_route/dispatch_database_view.svg"), label: "provider_runs 状态视图", group: "结果证据" },
        { src: asset("01_spider2table/04_results_showcase/system_results/02_prometheus_targets.png"), label: "Prometheus 服务监控", group: "结果证据" },
        { src: asset("01_spider2table/04_results_showcase/system_results/03_temporal_workflow_ui.png"), label: "Temporal 工作流监视", group: "结果证据" },
      ],
    },
    {
      title: "数据表与最终结果合并",
      body: [
        "数据库结果覆盖账号、任务、provider_runs、creator_profiles、creator_videos、content_labels、final_results 等表。",
        "多来源采集结果在落库后完成合并，形成可查询、可复用、可导出的 KOL 数据资产。",
      ],
      items: [
        { src: asset("01_spider2table/02_technical_route/database_dependency_logic_landscape.svg"), label: "数据库依赖关系", group: "结果证据" },
        { src: asset("01_spider2table/02_technical_route/dispatch_logic_diagram.svg"), label: "任务拆分与合并逻辑", group: "结果证据" },
      ],
    },
  ],
  "02_smart_manufacturing": [
    {
      title: "设备数据进入平台",
      body: [
        "现场设备、HMI 和虚拟产线产生生产数据，经 OPC UA 读取后进入边缘处理链路。网络拓扑、OPC UA 浏览器、Node-RED 流程和 HMI 面板对应数据接入的四个关键环节。",
        "这条链路展示设备层、边缘层和平台层之间的数据流向：设备点位可被读取，消息可被转换，状态可进入后续存储和展示。",
      ],
      items: [
        { src: asset("02_smart_manufacturing/02_technical_route/01_network_topology.png"), label: "工业网络拓扑", group: "结果证据" },
        { src: asset("02_smart_manufacturing/02_technical_route/02_opcua_data_browser.png"), label: "OPC UA 数据浏览", group: "结果证据" },
        { src: asset("02_smart_manufacturing/02_technical_route/03_node_red_flow.png"), label: "Node-RED 数据流", group: "结果证据" },
        { src: asset("02_smart_manufacturing/02_technical_route/05_hmi_control_panel.png"), label: "HMI 控制面板", group: "结果证据" },
      ],
    },
    {
      title: "时序数据与前端可视化",
      body: [
        "InfluxDB Dashboard 和 Data Explorer 曲线展示设备数据的持续写入；Vue/ECharts 前端图表将点位趋势、状态变化和生产指标组织成页面输出。",
        "这一组结果对应平台层到应用层：数据完成落库后，可以被查询、可视化，并服务于生产现场的状态监控。",
      ],
      items: [
        { src: asset("02_smart_manufacturing/04_results_showcase/01_influxdb_dashboard.png"), label: "InfluxDB Dashboard", group: "结果证据" },
        { src: asset("02_smart_manufacturing/04_results_showcase/02_data_explorer_curve.png"), label: "Data Explorer 曲线", group: "结果证据" },
        { src: asset("02_smart_manufacturing/04_results_showcase/03_frontend_charts.jpeg"), label: "Vue/ECharts 前端图表", group: "结果证据" },
      ],
    },
  ],
  "03_microwave_signal_processing": [
    {
      title: "实验平台与数据来源",
      body: [
        "雷达板卡、实验平台、旋转叶片和采集软件构成实测数据链路。雷达采集旋转叶片回波，原始波形进入后续频域和时频分析。",
        "这一组结果对应数据来源：硬件平台提供回波信号，旋转目标提供微多普勒特征，采集软件记录原始波形。",
      ],
      items: [
        { src: asset("03_microwave_signal_processing/05_ppt_story/01_radar_board_output.png"), label: "雷达板卡与频谱输出", group: "结果证据" },
        { src: asset("03_microwave_signal_processing/05_ppt_story/02_lab_platform_overview.jpg"), label: "实验平台整体环境", group: "结果证据" },
        { src: asset("03_microwave_signal_processing/05_ppt_story/04_experiment_platform_complete.jpeg"), label: "雷达与旋转平台搭建", group: "结果证据" },
        { src: asset("03_microwave_signal_processing/05_ppt_story/05_capture_software_waveform.jpeg"), label: "采集软件波形", group: "结果证据" },
      ],
    },
    {
      title: "回波建模与算法链",
      body: [
        "然后展示旋转叶片的几何关系和回波分量建模。叶盘、叶根、叶片侧面、叶尖等散射分量被拆开后，后续 FFT、STFT、MUSIC、EMD、SST 才有明确处理对象。",
        "模型链路为：目标几何建模、回波分量拆解、频域分析、时频增强、脊线跟踪、参数反演。",
      ],
      items: [
        { src: asset("03_microwave_signal_processing/05_ppt_story/06_rotor_geometry_model.png"), label: "旋转叶片几何模型", group: "结果证据" },
        { src: asset("03_microwave_signal_processing/05_ppt_story/07_blade_echo_component_model.png"), label: "叶片回波分量建模", group: "结果证据" },
      ],
    },
    {
      title: "频域、时频与参数反演结果",
      body: [
        "结果展示按算法输出排序：频域谱线用于估计转频；STFT/MUSIC 展示微多普勒结构；EMD 和 SST 提高脊线可读性；最后通过 Ridge Tracking 得到关键频率轨迹并进行半径估计。",
        "最终输出从实测回波推进到时频结构，再得到可量化的转速、脊线和半径估计结果。",
      ],
      items: [
        { src: asset("03_microwave_signal_processing/05_ppt_story/08_frequency_domain_result.png"), label: "频域分析与转频估计", group: "结果证据" },
        { src: asset("03_microwave_signal_processing/05_ppt_story/09_stft_time_frequency_result.png"), label: "STFT 时频结果", group: "结果证据" },
        { src: asset("03_microwave_signal_processing/05_ppt_story/10_music_spectrum_result.png"), label: "MUSIC 谱估计结果", group: "结果证据" },
        { src: asset("03_microwave_signal_processing/05_ppt_story/13_sst_result.png"), label: "SST 时频增强结果", group: "结果证据" },
        { src: asset("03_microwave_signal_processing/05_ppt_story/14_parameter_extraction_result.png"), label: "脊线位置与参数提取", group: "结果证据" },
        { src: asset("03_microwave_signal_processing/05_ppt_story/15_radius_estimation_curve.png"), label: "半径估计误差曲线", group: "结果证据" },
      ],
    },
  ],
  "04_math_modeling": [
    {
      title: "Momentum 指标构造",
      body: [
        "论文将 momentum 从主观概念转成可计算变量：选取 points_advantage、break_points、unforced_errors、winner、net_pt_won 和 serve_advantage 六个指标，再用熵权法得到各指标权重。",
        "该指标用于描述球员在比赛窗口内的场上势能。它把比分优势、破发、制胜分、非受迫失误和发球优势统一到同一个量化表达式中，作为后续模型的核心输入。",
      ],
      items: [
        { src: asset("04_math_modeling/05_result_story/clean_momentum_model.svg"), label: "Momentum 指标构造与熵权法权重", group: "结果证据" },
      ],
    },
    {
      title: "Run Test 与 DTMM",
      body: [
        "Run Test 对 29 场比赛进行随机性检验：两名球员的 momentum p-value 均为 0，呈现 momentum 变化的结构性；胜负窗口波动的 p-value 大多高于 0.05，更接近随机过程。",
        "DTMM 将 momentum difference 与 run distance、serve width、speed mph 等客观特征结合，使用决策树进行得分预测，并通过后剪枝控制模型复杂度。",
      ],
      items: [
        { src: asset("04_math_modeling/05_result_story/clean_run_test_dtmm.svg"), label: "Run Test 与 DTMM 建模链路", group: "结果证据" },
      ],
    },
    {
      title: "得分走势预测验证",
      body: [
        "在 Wimbledon-1701 的测试中，DTMM 的整场 match rate 达到 80%；进一步缩小到 20-point 时间窗后，预测 wins 与真实 wins 的 Pearson correlation 达到 0.9192。",
        "逐点胜负向量的 cosine similarity 为 95.898%。去除 momentum 后，1701 的 match rate 降至 59%，20-point wins 的相关系数降至 5.9%，体现 momentum 对预测结果的核心作用。",
      ],
      items: [
        { src: asset("04_math_modeling/05_result_story/clean_prediction_validation.svg"), label: "DTMM 预测指标与验证结果", group: "结果证据" },
      ],
    },
    {
      title: "Match Swing、SHAP 与迁移",
      body: [
        "论文将连续 20 points 内的赢球数定义为 S，并将 GON 设为 1、0、-1，用于描述窗口内比赛走势是否有利。Random Forest 用于优化 GON 预测，并分析 Djokovic 相关比赛的波动。",
        "SHAP 结果显示 momentum 对 match swings 的贡献最高，达到 51%。模型迁移到 2023 US Open 后，预测序列与真实序列的 Pearson correlation 为 0.6760，体现模型具备迁移能力，同时也受到赛事、场地和天气差异影响。",
      ],
      items: [
        { src: asset("04_math_modeling/05_result_story/clean_gon_shap_migration.svg"), label: "GON、SHAP 与 US Open 迁移验证", group: "结果证据" },
        { src: asset("04_math_modeling/05_result_story/clean_sensitivity.svg"), label: "敏感性分析", group: "结果证据" },
      ],
    },
  ],
  "05_iea_research": [
    {
      title: "实验数据从哪里来",
      body: [
        "实验框架包含在线学习任务、短时冥想干预、EEG 和 eye tracking。流程图、电极布局、实验场景和眼动采集图对应数据采集的完整过程。",
        "被试完成学习任务时同步产生主观量表、眼动距离、Theta 频段和脑区活动数据，后续统计结果来自同一实验链路。",
      ],
      items: [
        { src: asset("05_iea_research/05_result_story/01_experiment_design_flow.png"), label: "实验设计流程", group: "结果证据" },
        { src: asset("05_iea_research/05_result_story/02_eeg_channel_layout.png"), label: "EEG 电极布局", group: "结果证据" },
        { src: asset("05_iea_research/05_result_story/03_experiment_scene_front.png"), label: "实验场景正面", group: "结果证据" },
        { src: asset("05_iea_research/05_result_story/04_eye_tracking_experiment.png"), label: "Eye tracking 采集场景", group: "结果证据" },
      ],
    },
    {
      title: "情绪、注意与认知负荷指标",
      body: [
        "结果展示从主观状态到客观生理指标逐层推进。Mood 箱线图用于比较短时冥想前后的情绪变化；Distance 指标反映眼动注意分布；Theta 指标进一步对应认知负荷和注意状态。",
        "行为、眼动和 EEG 指标共同支撑实验解释，展示冥想干预与情绪、注意状态之间的关系。",
      ],
      items: [
        { src: asset("05_iea_research/05_result_story/05_mood_boxplot.png"), label: "Mood 指标箱线图", group: "结果证据" },
        { src: asset("05_iea_research/05_result_story/06_distance_boxplot.png"), label: "Distance 指标箱线图", group: "结果证据" },
        { src: asset("05_iea_research/05_result_story/07_theta_boxplot.png"), label: "Theta 指标箱线图", group: "结果证据" },
      ],
    },
    {
      title: "EEG 信号与脑区可视化",
      body: [
        "EEG 原始信号和脑地形图分别呈现采集质量与脑区活动差异。",
        "脑区可视化将统计结果落到神经信号层面，呈现不同实验条件下的脑活动差异。",
      ],
      items: [
        { src: asset("05_iea_research/05_result_story/08_eeg_raw_signal.png"), label: "EEG 原始信号", group: "结果证据" },
        { src: asset("05_iea_research/05_result_story/09_brain_topography.png"), label: "脑地形图结果", group: "结果证据" },
      ],
    },
  ],
  "06_binder_3d_printing": [
    {
      title: "训练过程与评价口径",
      body: [
        "Binder Jet 项目先展示模型训练和评估口径。训练曲线反映收敛状态，评估矩阵给出缺陷分割质量的判断依据。",
        "分割任务同时关注像素区域、类别误差和训练稳定性，后续预测图基于这一评价体系展开。",
      ],
      items: [
        { src: asset("06_binder_3d_printing/02_technical_route/01_training_curve_viz.png"), label: "训练曲线与收敛趋势", group: "结果证据" },
        { src: asset("06_binder_3d_printing/03_tech_stack/01_eval_matrix_viz.png"), label: "评估矩阵说明", group: "结果证据" },
        { src: asset("06_binder_3d_printing/04_results_showcase/03_accuracy_curve.png"), label: "Accuracy 曲线", group: "结果证据" },
      ],
    },
    {
      title: "分割预测从早期到收敛",
      body: [
        "Pred vs GT 需要成对展示。epoch 10 用来观察模型早期是否已经捕捉缺陷轮廓，epoch 30 用来展示训练后期与 Ground Truth 的贴合程度。",
        "两组结果展示训练推进过程中的分割质量变化：早期关注轮廓捕捉，后期关注缺陷区域与 Ground Truth 的贴合。",
      ],
      items: [
        { src: asset("06_binder_3d_printing/04_results_showcase/01_pred_vs_gt_epoch10.png"), label: "Pred vs GT epoch 10", group: "结果证据" },
        { src: asset("06_binder_3d_printing/04_results_showcase/02_pred_vs_gt_epoch30.png"), label: "Pred vs GT epoch 30", group: "结果证据" },
      ],
    },
    {
      title: "类别误差定位",
      body: [
        "混淆矩阵用于定位误分类别。孔洞、裂纹、边界缺陷等类别之间的误分布，可以反映模型在实际质量评估中的风险点。",
      ],
      items: [
        { src: asset("06_binder_3d_printing/04_results_showcase/04_confusion_matrix.png"), label: "Confusion matrix", group: "结果证据" },
      ],
    },
  ],
  "07_emblem_quality_detection": [
    {
      title: "从待检图像到候选区域",
      body: [
        "徽标质检项目先展示检测对象和候选区域定位。检测场景图呈现任务来源，YOLO 输出图展示徽标缺陷区域在整张工件图中的定位结果。",
        "检测结果展示系统识别对象、定位区域和分类入口，后续 ROI 裁剪与 CNN 分类基于 YOLO 候选框展开。",
      ],
      items: [
        { src: asset("07_emblem_quality_detection/01_project_background/01_inspection_scene.jpg"), label: "检测场景", group: "结果证据" },
        { src: asset("07_emblem_quality_detection/04_results_showcase/01_yolo_results.png"), label: "YOLO 检测结果", group: "结果证据" },
      ],
    },
    {
      title: "批量预测与分类结构",
      body: [
        "批量预测图展示多样本检测输出。CNN 结构图对应检测后的 ROI 分类，形成定位加分类的两段式结果。",
        "这一链路覆盖待检图像、YOLO 定位、ROI 裁剪、CNN 分类和批量输出。",
      ],
      items: [
        { src: asset("07_emblem_quality_detection/04_results_showcase/02_yolo_batch_prediction.jpg"), label: "批量预测结果", group: "结果证据" },
        { src: asset("07_emblem_quality_detection/02_technical_route/01_cnn_structure.png"), label: "CNN 分类结构", group: "结果证据" },
      ],
    },
    {
      title: "误差与阈值表现",
      body: [
        "最后用 Confusion matrix 和 PR curve 检查模型质量。混淆矩阵展示不同缺陷类别之间的误判关系，PR 曲线展示阈值变化下 precision 和 recall 的权衡。",
        "误差矩阵和 PR 曲线共同给出模型可靠性边界：类别混淆、阈值选择和召回能力都能被量化查看。",
      ],
      items: [
        { src: asset("07_emblem_quality_detection/04_results_showcase/03_confusion_matrix.png"), label: "Confusion matrix", group: "结果证据" },
        { src: asset("07_emblem_quality_detection/04_results_showcase/04_pr_curve.png"), label: "PR curve", group: "结果证据" },
      ],
    },
  ],
};

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles = Array.from({ length: 128 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.35 + Math.random() * 1.55,
      speed: 0.00022 + Math.random() * 0.00072,
      phase: i * 0.37,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (event: PointerEvent) => {
      pointer.current = { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight };
    };
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const px = pointer.current.x - 0.5;
      const py = pointer.current.y - 0.5;
      particles.forEach((p, i) => {
        p.y += p.speed * p.z;
        if (p.y > 1.08) p.y = -0.08;
        const x = p.x * width + Math.sin(time * 0.00052 + p.phase) * 22 + px * 70 * p.z;
        const y = p.y * height + Math.cos(time * 0.00042 + p.phase) * 16 + py * 48 * p.z;
        ctx.beginPath();
        ctx.arc(x, y, 1.1 + p.z * 1.65, 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? "rgba(95, 217, 255, .72)" : "rgba(255,255,255,.30)";
        ctx.fill();
        for (let j = i + 1; j < particles.length; j += 11) {
          const q = particles[j];
          const qx = q.x * width + px * 70 * q.z;
          const qy = q.y * height + py * 48 * q.z;
          const dist = Math.hypot(x - qx, y - qy);
          if (dist < 126) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(qx, qy);
            ctx.strokeStyle = `rgba(115, 190, 255, ${0.11 * (1 - dist / 126)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />;
}

function App() {
  const [light, setLight] = useState({ x: 50, y: 35 });
  const [page, setPage] = useState<"intro" | "home" | "project" | "contact">("intro");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [modal, setModal] = useState<EvidenceItem | null>(null);
  const selectedProject = projects[selectedIndex];
  const currentShowcase = showcaseItems[showcaseIndex];
  const storySections = useMemo<ResultSection[]>(() => {
    return resultStories[selectedProject.id] ?? [
      {
        title: "结果展示",
        body: ["本项目按结果链路展示关键输出、系统结果和验证图表。"],
        items: selectedProject.evidence,
      },
    ];
  }, [selectedProject]);
  const ActiveIcon = projectIcons[selectedIndex] ?? Cpu;
  const evidenceCount = selectedProject.evidence.length;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setPage("project");
        setSelectedIndex((value) => Math.min(projects.length - 1, value + 1));
      }
      if (event.key === "ArrowLeft") {
        setPage("project");
        setSelectedIndex((value) => Math.max(0, value - 1));
      }
      if (event.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    setLight({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
  };

  const onTiltMove = (event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.setProperty("--tilt-ry", `${px * 14}deg`);
    target.style.setProperty("--tilt-rx", `${-py * 12}deg`);
    target.style.setProperty("--tilt-glow-x", `${(px + 0.5) * 100}%`);
    target.style.setProperty("--tilt-glow-y", `${(py + 0.5) * 100}%`);
  };

  const onTiltLeave = (event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--tilt-ry", "0deg");
    target.style.setProperty("--tilt-rx", "0deg");
    target.style.setProperty("--tilt-glow-x", "50%");
    target.style.setProperty("--tilt-glow-y", "50%");
  };

  return (
    <div
      className="app"
      onPointerMove={onPointerMove}
      style={{
        "--spot-x": `${light.x}%`,
        "--spot-y": `${light.y}%`,
        "--eye-x": `${((light.x - 50) / 50) * 18}px`,
        "--eye-y": `${((light.y - 50) / 50) * 14}px`,
        "--active": page === "home" ? currentShowcase.accent : selectedProject.accent,
      } as React.CSSProperties}
    >
      <ParticleField />
      <div className="circuit-layer" aria-hidden="true" />
      <header className="site-header">
        <button className="brand" onClick={() => setPage("home")} type="button">
          <span className="brand-mark">Z</span>
          <span>赵艺博</span>
        </button>
        <nav>
          <button className={page === "intro" ? "active" : ""} onClick={() => setPage("intro")} type="button">起始</button>
          <button className={page === "home" ? "active" : ""} onClick={() => setPage("home")} type="button">首页</button>
          <button className={page === "project" ? "active" : ""} onClick={() => setPage("project")} type="button">项目</button>
          <button className={page === "contact" ? "active" : ""} onClick={() => setPage("contact")} type="button">联系</button>
        </nav>
      </header>

      <main>
        {page === "intro" ? (
          <section className="intro-page page-shell">
            <div className="intro-orbit" aria-hidden="true">
              <div className="sentinel">
                <div className="sentinel-head">
                  <div className="sentinel-eye">
                    <span />
                  </div>
                  <i />
                </div>
                <div className="sentinel-body">
                  <b />
                  <b />
                  <b />
                </div>
              </div>
            </div>

            <div className="intro-copy">
              <p className="intro-mark">YIBO ZHAO</p>
              <h1>
                <span>个人主页</span>
                <span>项目索引</span>
              </h1>
              <p>前后端开发、数据分析、雷达、机器学习与深度学习、Agent 开发。</p>
              <div className="intro-actions">
                <button className="primary-action" onClick={() => setPage("home")} type="button">
                  进入首页 <ArrowUpRight size={18} />
                </button>
                <button className="secondary-action" onClick={() => setPage("project")} type="button">
                  查看项目 <CircuitBoard size={18} />
                </button>
              </div>
            </div>
          </section>
        ) : page === "home" ? (
          <section className="home-page page-shell">
            <div className="home-copy">
              <p className="home-kicker">PERSONAL HOMEPAGE</p>
              <h1 className="art-title" data-text="赵艺博">赵艺博</h1>
              <p className="home-role">前后端开发 / 数据分析 / 雷达 / 机器学习与深度学习 / Agent 开发</p>
              <div className="resume-snapshot" aria-label="简历摘要">
                <div><strong>西安交通大学</strong><span>智能制造工程本科</span></div>
                <div><strong>综合排名 10/119</strong><span>工业互联网、数据系统、智能感知方向</span></div>
                <div><strong>国家一等奖</strong><span>智能制造大赛两个赛道</span></div>
                <div><strong>MCM/ICM M 奖</strong><span>全球前约 9%</span></div>
              </div>
              <div className="home-actions">
                <button className="primary-action" onClick={() => setPage("project")} type="button">
                  进入项目分页 <ArrowUpRight size={18} />
                </button>
                <button className="secondary-action" onClick={() => setPage("contact")} type="button">
                  联系我 <Mail size={18} />
                </button>
              </div>
            </div>

            <section className="home-showcase" aria-label="首页与项目预览">
              <div className="showcase-label">
                <span>{String(showcaseIndex).padStart(2, "0")}</span>
                <strong>{currentShowcase.title}</strong>
                <small>{currentShowcase.subtitle}</small>
              </div>
              <img src={currentShowcase.src} alt={`${currentShowcase.title} 预览图`} />
              <div className="showcase-strip">
                {showcaseItems.map((item, index) => (
                  <button
                    key={item.title}
                    className={index === showcaseIndex ? "active" : ""}
                    onMouseEnter={() => setShowcaseIndex(index)}
                    onFocus={() => setShowcaseIndex(index)}
                    onClick={() => setShowcaseIndex(index)}
                    type="button"
                  >
                    {index === 0 ? "首页" : String(index).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </section>

            <section className="project-dial" aria-label="项目入口">
              {projects.map((project, index) => {
                const ProjectIcon = projectIcons[index] ?? CircuitBoard;
                return (
                  <button
                    key={project.id}
                    className="dial-card"
                    onClick={() => {
                      setSelectedIndex(index);
                      setPage("project");
                    }}
                    style={{ "--card-accent": project.accent } as React.CSSProperties}
                    type="button"
                  >
                    <ProjectIcon size={22} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{project.title}</strong>
                    <small>{project.focus}</small>
                  </button>
                );
              })}
            </section>
          </section>
        ) : page === "contact" ? (
          <section className="contact-page page-shell">
            <div className="contact-panel">
              <div>
                <h1>联系我</h1>
                <p>如果你希望进一步了解项目细节、实习经历或技术方向，可以通过以下方式联系。</p>
              </div>
              <div className="contact-grid">
                <a href="tel:18710360951" className="tilt-surface" onPointerMove={onTiltMove} onPointerLeave={onTiltLeave}>
                  <Phone size={22} />
                  <span>电话</span>
                  <strong>18710360951</strong>
                </a>
                <a href="mailto:zhaoyibo927@stu.xjtu.edu.cn" className="tilt-surface" onPointerMove={onTiltMove} onPointerLeave={onTiltLeave}>
                  <Mail size={22} />
                  <span>邮箱</span>
                  <strong>zhaoyibo927@stu.xjtu.edu.cn</strong>
                </a>
                <div className="tilt-surface" onPointerMove={onTiltMove} onPointerLeave={onTiltLeave}>
                  <MapPin size={22} />
                  <span>学校</span>
                  <strong>西安交通大学 · 智能制造工程</strong>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section
            className="project-page page-shell"
            style={{ "--project-accent": selectedProject.accent, "--project-gradient": selectedProject.gradient } as React.CSSProperties}
          >
            <aside className="project-sidebar">
              <div className="pager-label">项目分页</div>
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  className={index === selectedIndex ? "active" : ""}
                  onClick={() => setSelectedIndex(index)}
                  type="button"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.title}
                </button>
              ))}
            </aside>

            <section className="project-stage">
              <div className="stage-header">
                <button className="ghost-button" onClick={() => setPage("home")} type="button">
                  <ArrowLeft size={18} /> 主页
                </button>
                <div className="project-counter">{selectedIndex + 1} / {projects.length}</div>
              </div>

              <div className="project-layout">
                <section className="visual-frame">
                  <img src={selectedProject.visual} alt={`${selectedProject.title} 综合图`} />
                  <div className="scanline" aria-hidden="true" />
                </section>

                <section className="project-brief">
                  <div className="project-index">
                    <ActiveIcon size={24} />
                    <span>{String(selectedIndex + 1).padStart(2, "0")}</span>
                  </div>
                  <h2>{selectedProject.title}</h2>
                  <p className="subtitle">{selectedProject.subtitle}</p>
                  <p className="summary">{selectedProject.short}</p>

                  <div className="logic-list" aria-label="结果逻辑">
                    {selectedProject.resultLogic.map((item) => <span key={item}>{item}</span>)}
                  </div>

                  <div className="route-strip" aria-label="项目关键词">
                    {selectedProject.route.map((step, index) => (
                      <span key={`${step}-${index}`}>{step}</span>
                    ))}
                  </div>

                  <div className="stack-list" aria-label="工具与方法关键词">
                    {selectedProject.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>

                  <p className="focus-line">{selectedProject.focus} · {evidenceCount} 个结果证据按链路展示</p>
                </section>
              </div>

              <section className="evidence-workbench">
                <div className="evidence-head">
                  <div>
                    <h3>结果展示</h3>
                    <p>按结果产生顺序阅读：先看输入和过程，再看模型、系统或实验输出，最后看验证与误差。</p>
                  </div>
                </div>

                <div className="story-board">
                  {storySections.map((section, sectionIndex) => (
                    <article className="story-section" key={section.title}>
                      <div className="story-copy">
                        <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                        <h4>{section.title}</h4>
                        {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                      <div className="story-media-grid">
                        {section.items.map((item) => (
                          <button key={item.src} className="story-media-card" onClick={() => setModal(item)} type="button">
                            {item.kind === "video" ? (
                              <video src={item.src} poster={item.poster} muted playsInline preload="metadata" />
                            ) : (
                              <img src={item.src} alt={item.label} loading="lazy" />
                            )}
                            <strong>
                              {item.kind === "video" ? <Play size={15} /> : <ImageIcon size={15} />}
                              {item.label}
                            </strong>
                          </button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <div className="bottom-pager">
                <button disabled={selectedIndex === 0} onClick={() => setSelectedIndex((value) => Math.max(0, value - 1))} type="button">
                  <ArrowLeft size={18} /> 上一个
                </button>
                <button disabled={selectedIndex === projects.length - 1} onClick={() => setSelectedIndex((value) => Math.min(projects.length - 1, value + 1))} type="button">
                  下一个 <ArrowRight size={18} />
                </button>
              </div>
            </section>
          </section>
        )}
      </main>

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)} role="presentation">
          <div className="media-modal tilt-surface" onPointerMove={onTiltMove} onPointerLeave={onTiltLeave} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setModal(null)} type="button" aria-label="关闭">
              <X size={20} />
            </button>
            {modal.kind === "video" ? <video src={modal.src} controls autoPlay /> : <img src={modal.src} alt={modal.label} />}
            <p>{modal.label}</p>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);


