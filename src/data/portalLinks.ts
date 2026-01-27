/**
 * Portal Links Data
 * 6 categories x 8 links = 48 total links
 */

export interface PortalLink {
  name: string
  url: string
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
    nameEn: 'Academic Resources',
    color: '#8B6B7D',
    colorClass: 'portal-academic',
    links: [
      { name: 'Nature', url: 'https://www.nature.com' },
      { name: 'Science', url: 'https://www.science.org' },
      { name: 'IEEE', url: 'https://ieeexplore.ieee.org' },
      { name: 'arXiv', url: 'https://arxiv.org' },
      { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' },
      { name: 'Web of Science', url: 'https://www.webofscience.com' },
      { name: 'Google Scholar', url: 'https://scholar.google.com' },
      { name: 'Springer', url: 'https://link.springer.com' },
    ]
  },
  {
    id: 'finance',
    name: '金融数据',
    nameEn: 'Financial Data',
    color: '#7D8B6A',
    colorClass: 'portal-finance',
    links: [
      { name: '证监会', url: 'http://www.csrc.gov.cn' },
      { name: '上交所', url: 'http://www.sse.com.cn' },
      { name: '深交所', url: 'http://www.szse.cn' },
      { name: '东方财富', url: 'https://www.eastmoney.com' },
      { name: '同花顺', url: 'https://www.10jqka.com.cn' },
      { name: 'Wind', url: 'https://www.wind.com.cn' },
      { name: '巨潮资讯', url: 'http://www.cninfo.com.cn' },
      { name: '中国基金网', url: 'https://www.chinafund.cn' },
    ]
  },
  {
    id: 'ai',
    name: 'AI 前沿科技',
    nameEn: 'AI & Frontier Tech',
    color: '#6B8BA4',
    colorClass: 'portal-ai',
    links: [
      { name: 'OpenAI', url: 'https://openai.com' },
      { name: 'Anthropic', url: 'https://www.anthropic.com' },
      { name: 'Google AI', url: 'https://ai.google' },
      { name: 'Hugging Face', url: 'https://huggingface.co' },
      { name: 'Papers With Code', url: 'https://paperswithcode.com' },
      { name: 'AI Alignment Forum', url: 'https://www.alignmentforum.org' },
      { name: 'LessWrong', url: 'https://www.lesswrong.com' },
      { name: 'Distill.pub', url: 'https://distill.pub' },
    ]
  },
  {
    id: 'engineering',
    name: '软件硬件工程',
    nameEn: 'Software & Hardware',
    color: '#C67B5C',
    colorClass: 'portal-engineering',
    links: [
      { name: 'GitHub', url: 'https://github.com' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
      { name: 'Hacker News', url: 'https://news.ycombinator.com' },
      { name: 'Dev.to', url: 'https://dev.to' },
      { name: 'Nvidia Developer', url: 'https://developer.nvidia.com' },
      { name: 'Intel Developer', url: 'https://www.intel.com/content/www/us/en/developer/overview.html' },
      { name: 'AWS', url: 'https://aws.amazon.com' },
      { name: 'Azure', url: 'https://azure.microsoft.com' },
    ]
  },
  {
    id: 'medical',
    name: '医疗健康',
    nameEn: 'Medical & Health',
    color: '#4A8B6A',
    colorClass: 'portal-medical',
    links: [
      { name: 'WHO', url: 'https://www.who.int' },
      { name: 'CDC', url: 'https://www.cdc.gov' },
      { name: 'NCBI', url: 'https://www.ncbi.nlm.nih.gov' },
      { name: 'MedlinePlus', url: 'https://medlineplus.gov' },
      { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org' },
      { name: 'WebMD', url: 'https://www.webmd.com' },
      { name: '丁香园', url: 'https://www.dxy.cn' },
      { name: 'CNKI医学', url: 'https://med.cnki.net' },
    ]
  },
  {
    id: 'legal',
    name: '法律法规',
    nameEn: 'Legal Resources',
    color: '#8B4A6A',
    colorClass: 'portal-legal',
    links: [
      { name: '中国法院网', url: 'https://www.chinacourt.org' },
      { name: '北大法宝', url: 'https://www.pkulaw.com' },
      { name: '法信', url: 'https://www.faxin.cn' },
      { name: '裁判文书网', url: 'https://wenshu.court.gov.cn' },
      { name: 'Westlaw', url: 'https://www.westlaw.com' },
      { name: 'LexisNexis', url: 'https://www.lexisnexis.com' },
      { name: '司法部', url: 'http://www.moj.gov.cn' },
      { name: '全国人大法规', url: 'http://www.npc.gov.cn/npc/c2/c183/flfgk.shtml' },
    ]
  },
]
