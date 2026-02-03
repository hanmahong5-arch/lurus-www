/**
 * Portal Links Data
 * 6 categories x 8 links = 48 total links
 * Updated with the most cutting-edge and authoritative websites in each field
 */

export interface PortalLink {
  name: string
  url: string
  desc?: string
}

export interface PortalCategory {
  id: string
  name: string
  nameEn: string
  color: string
  colorClass: string
  links: PortalLink[]
}

export const portalCategories: PortalCategory[] = [
  {
    id: 'academic',
    name: '学术资源',
    nameEn: 'Academic',
    color: '#8B6B7D',
    colorClass: 'portal-academic',
    links: [
      { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', desc: 'NIH医学文献' },
      { name: 'Google Scholar', url: 'https://scholar.google.com', desc: '谷歌学术' },
      { name: 'Web of Science', url: 'https://www.webofscience.com', desc: '权威引文索引' },
      { name: 'Scopus', url: 'https://www.scopus.com', desc: '最大摘要库' },
      { name: 'arXiv', url: 'https://arxiv.org', desc: '预印本服务器' },
      { name: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org', desc: '工程技术' },
      { name: 'JSTOR', url: 'https://www.jstor.org', desc: '人文社科' },
      { name: 'ACM DL', url: 'https://dl.acm.org', desc: '计算机科学' },
    ]
  },
  {
    id: 'finance',
    name: '金融数据',
    nameEn: 'Finance',
    color: '#7D8B6A',
    colorClass: 'portal-finance',
    links: [
      { name: '东方财富', url: 'https://www.eastmoney.com', desc: '散户大本营' },
      { name: '同花顺', url: 'https://www.10jqka.com.cn', desc: '技术分析' },
      { name: 'Wind万得', url: 'https://www.wind.com.cn', desc: '专业终端' },
      { name: '新浪财经', url: 'https://finance.sina.com.cn', desc: '综合门户' },
      { name: '证监会', url: 'http://www.csrc.gov.cn', desc: '监管信息' },
      { name: '上交所', url: 'http://www.sse.com.cn', desc: '上海交易所' },
      { name: '深交所', url: 'http://www.szse.cn', desc: '深圳交易所' },
      { name: '巨潮资讯', url: 'http://www.cninfo.com.cn', desc: '公司公告' },
    ]
  },
  {
    id: 'ai',
    name: 'AI 前沿科技',
    nameEn: 'AI Tech',
    color: '#6B8BA4',
    colorClass: 'portal-ai',
    links: [
      { name: 'OpenAI', url: 'https://openai.com', desc: 'GPT系列' },
      { name: 'Anthropic', url: 'https://www.anthropic.com', desc: 'Claude' },
      { name: 'Hugging Face', url: 'https://huggingface.co', desc: '开源AI社区' },
      { name: 'Google AI', url: 'https://ai.google', desc: '谷歌AI' },
      { name: 'Papers With Code', url: 'https://paperswithcode.com', desc: '论文+代码' },
      { name: 'arXiv AI', url: 'https://arxiv.org/list/cs.AI/recent', desc: 'AI论文' },
      { name: 'DeepMind', url: 'https://deepmind.google', desc: 'AlphaGo' },
      { name: 'Kaggle', url: 'https://www.kaggle.com', desc: '数据科学竞赛' },
    ]
  },
  {
    id: 'engineering',
    name: '软件工程',
    nameEn: 'Engineering',
    color: '#C67B5C',
    colorClass: 'portal-engineering',
    links: [
      { name: 'GitHub', url: 'https://github.com', desc: '代码托管' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com', desc: '开发者问答' },
      { name: 'Dev.to', url: 'https://dev.to', desc: '开发者社区' },
      { name: 'Hacker News', url: 'https://news.ycombinator.com', desc: '技术新闻' },
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', desc: 'Web文档' },
      { name: 'VS Code', url: 'https://code.visualstudio.com', desc: '主流编辑器' },
      { name: 'npm', url: 'https://www.npmjs.com', desc: 'Node包管理' },
      { name: 'Docker Hub', url: 'https://hub.docker.com', desc: '容器镜像' },
    ]
  },
  {
    id: 'medical',
    name: '医疗健康',
    nameEn: 'Medical',
    color: '#4A8B6A',
    colorClass: 'portal-medical',
    links: [
      { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', desc: '医学文献' },
      { name: 'WHO', url: 'https://www.who.int', desc: '世卫组织' },
      { name: 'CDC', url: 'https://www.cdc.gov', desc: '美国疾控' },
      { name: 'UpToDate', url: 'https://www.uptodate.com', desc: '临床决策' },
      { name: '丁香园', url: 'https://www.dxy.cn', desc: '医疗社区' },
      { name: '丁香医生', url: 'https://dxy.com', desc: '健康科普' },
      { name: 'WebMD', url: 'https://www.webmd.com', desc: '健康信息' },
      { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org', desc: '梅奥诊所' },
    ]
  },
  {
    id: 'legal',
    name: '法律法规',
    nameEn: 'Legal',
    color: '#8B4A6A',
    colorClass: 'portal-legal',
    links: [
      { name: '北大法宝', url: 'https://www.pkulaw.com', desc: '最全法律库' },
      { name: '裁判文书网', url: 'https://wenshu.court.gov.cn', desc: '文书公开' },
      { name: '国家法规库', url: 'https://flk.npc.gov.cn', desc: '官方法规' },
      { name: '法信', url: 'https://www.faxin.cn', desc: '智能法律' },
      { name: '中国法院网', url: 'https://www.chinacourt.org', desc: '法院信息' },
      { name: 'Westlaw', url: 'https://www.westlaw.com', desc: '国际法律库' },
      { name: 'LexisNexis', url: 'https://www.lexisnexis.com', desc: '国际检索' },
      { name: 'HeinOnline', url: 'https://heinonline.org', desc: '法学期刊' },
    ]
  },
]
