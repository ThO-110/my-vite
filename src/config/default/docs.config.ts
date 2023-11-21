/*
 * @Description:
 * @Author: huhaonan@sics.ac.cn
 * @Date: 2022-02-07 17:44:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-05 11:06:22
 */
interface SubMenu {
  name: string
  title: string
  filePath: string
  next?: string
  before?: string
  children?: Record<string, SubMenu>
}
export default {
  'product-introduce': {
    name: 'product-introduce',
    title: '产品简介',
    filePath: 'product-introduce/product-introduction.md',
    next: 'product-introduce_key-features',
    children: {
      'product-introduce_key-features': {
        name: 'product-introduce_key-features',
        title: '产品关键特性和关键技术',
        filePath: 'product-introduce/key-features.md',
        next: 'product-introduce_main-application',
        before: 'product-introduce'
      },
      'product-introduce_main-application': {
        name: 'product-introduce_main-application',
        title: '产品主要应用场景',
        filePath: 'product-introduce/main-application.md',
        next: 'product-introduce_architecture-description',
        before: 'product-introduce_key-features'
      },
      'product-introduce_architecture-description': {
        name: 'product-introduce_architecture-description',
        title: '产品架构说明',
        filePath: 'product-introduce/architecture-description.md',
        next: 'product-introduce_deployment-environment',
        before: 'product-introduce_main-application'
      },
      'product-introduce_deployment-environment': {
        name: 'product-introduce_deployment-environment',
        title: '产品部署和运行环境',
        filePath: 'product-introduce/deployment-environment.md',
        before: 'product-introduce_architecture-description'
      }
    }
  },
  'quick-start': {
    name: 'quick-start',
    title: '快速入门',
    filePath: 'quick-start/quick-start.md',
    next: 'quick-start_datasource',
    children: {
      'quick-start_datasource': {
        name: 'quick-start_datasource',
        title: '数据源管理',
        filePath: 'quick-start/datasource.md',
        next: 'quick-start_rule-discovery',
        before: 'quick-start'
      },
      'quick-start_rule-discovery': {
        name: 'quick-start_rule-discovery',
        title: '规则发现',
        filePath: 'quick-start/rule-discovery.md',
        next: 'quick-start_rule-apply',
        before: 'quick-start_datasource'
      },
      'quick-start_rule-apply': {
        name: 'quick-start_rule-apply',
        title: '规则应用',
        filePath: 'quick-start/rule-apply.md',
        before: 'quick-start_rule-discovery'
      }
    }
  },
  'user-guide': {
    name: 'user-guide',
    title: '用户指南',
    filePath: 'user-guide/user-guide.md',
    next: 'user-guide_project-background',
    children: {
      'user-guide_project-background': {
        name: 'user-guide_project-background',
        title: '项目背景',
        filePath: 'user-guide/project-background.md',
        next: 'user-guide_create-account',
        before: 'user-guide'
      },
      'user-guide_create-account': {
        name: 'user-guide_create-account',
        title: '创建账号',
        filePath: 'user-guide/create-account.md',
        next: 'user-guide_datasource',
        before: 'user-guide_project-background'
      },
      'user-guide_datasource': {
        name: 'user-guide_datasource',
        title: '数据源管理',
        filePath: 'user-guide/datasource.md',
        next: 'user-guide_rule-discovery',
        before: 'user-guide_create-account'
      },
      'user-guide_rule-discovery': {
        name: 'user-guide_rule-discovery',
        title: '规则发现',
        filePath: 'user-guide/rule-discovery.md',
        next: 'user-guide_rule-base',
        before: 'user-guide_datasource'
      },
      'user-guide_rule-base': {
        name: 'user-guide_rule-base',
        title: '规则库',
        filePath: 'user-guide/rule-base.md',
        next: 'user-guide_rule-apply',
        before: 'user-guide_rule-discovery'
      },
      'user-guide_rule-apply': {
        name: 'user-guide_rule-apply',
        title: '规则应用',
        filePath: 'user-guide/rule-apply.md',
        next: 'user-guide_appendix1-types-data',
        before: 'user-guide_rule-base'
      },
      'user-guide_appendix1-types-data': {
        name: 'user-guide_appendix1-types-data',
        title: '附录',
        filePath: 'user-guide/appendix1-types-data.md',
        before: 'user-guide_rule-apply'
      }
    }
  },
  glossary: {
    name: 'glossary',
    title: '术语表',
    filePath: 'glossary/00-glossary.md',
    children: {}
  },
  FAQ: {
    name: 'FAQ',
    title: 'FAQ',
    filePath: 'FAQ/00-faq.md',
    children: {
      'FAQ_01-datasource': {
        name: 'FAQ_01-datasource',
        title: '数据源管理',
        filePath: 'FAQ/01-datasource.md',
        next: 'FAQ_02-rulediscovery'
      },
      'FAQ_02-rulediscovery': {
        name: 'FAQ_02-rulediscovery',
        title: '规则发现',
        filePath: 'FAQ/02-rulediscovery.md',
        next: 'FAQ_03-ruleapply',
        before: 'FAQ_01-datasource'
      },
      'FAQ_03-ruleapply': {
        name: 'FAQ_03-ruleapply',
        title: '规则执行',
        filePath: 'FAQ/03-ruleapply.md',
        next: 'FAQ_04-model',
        before: 'FAQ_02-rulediscovery'
      },
      'FAQ_04-model': {
        name: 'FAQ_04-model',
        title: '模型',
        filePath: 'FAQ/04-model.md',
        before: 'FAQ_03-ruleapply'
      }
    }
  }
} as Record<string, SubMenu>
