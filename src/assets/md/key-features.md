# 产品关键特性和关键技术

### 关键特性

1. **可解释**

   关河因果团队以图理论为基础研发图谱因果分析平台，进行逻辑规则推导，相比传统的机器学习模型结果拥有可解释的优势，不但可以对未来趋势做出预测， 还可以对预测的结果进行解释， 帮助找到数据中隐藏的因果关系，解决机器学习模型结果难以应用的问题。

2. **精准度提升**

   基于可满足性、蕴含性、关联推导、增量关联等基础理论，关河因果系统结合已发现规则与机器学习模型，进而预测新数据的关联关系，以及融合逻辑规则的模型，有效提高了关联推断的准确性，在链路预测和属性预测方面，较单个模型精准度提升约 30%。

3. **实时响应**

   采用自研的图分割、图压缩、增强图计算等图并行算法，不仅支持百亿级数据全量分析，而且能够应对业务实时流式数据处理，迭代计算学习新数据特征，持续挖掘新价值，能够应对不同来源、不同类型的复杂数据。支持对流式数据进行规则匹配，实时输出预测结果。

4. **规则积累**

   持续发现并积累“惊喜”规则，发现常人看不到的线索。

5. **云原生**

   关河因果系统利用云原生技术降低应用部署难度，提高部署自动化程度，支持在公有云、私有云和混合云等新型动态环境中高效运行。可弹性扩展，提高服务器硬件资源利用率，降低客户使用成本。

6. **安全**

   关河因果系统是基于数据特征进行逻辑计算的系统，不关心数据实际内容，客户可对涉及用户隐私的数据进行加密处理，加密后的数据仍可参与计算。关河因果系统支持内网部署，客户数据不必流出，无需担心数据安全合规问题。

### 关键技术

1. **图计算**

   以图作为数据模型，采用频繁子图挖掘，频繁项集挖掘，图分割，图压缩，增强图计算等图相关算法技术，分布式并行计算挖掘图数据中存在的关联规则。

2. **逻辑规则和机器学习融合**

   关河因果分析系统融合了创新图关联规则理论与人工智能领域的最新成果，既解決了传统专家人工制定规则的高成本、准确性、一致性问题，也解決了机器学习输出结果无法解释问题和可应用性问题。

3. **自动特征工程**

   关河因果分析系统预构建了多领域成熟的机器学习模型，对客户数据中的信息进行数据校验、数据清洗、特征提取，从而获取更好的数据特征，将原始数据自动转换成高质量的图数据，降低数据挖掘的工作量并提高计算结果的质量。

4. **分布式计算**

   自研分布式图计算系统，实现分布式计算事务拆分，多节点并行计算动态扩容，可靠识别异常节点，实现任务调度、任务分发、负载均衡，支持实时监控各节点的状态信息，多副本协议保证系统的可靠性。

5. **离线加密**

   支持用户在本地对数据进行加密，在不影响计算效果的情况下最大程度保护用户数据隐私，从处理流程上避免数据合规问题。
