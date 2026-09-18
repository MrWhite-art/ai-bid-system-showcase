/* mock-data.js —— 单一示例项目数据源 */
window.BID_MOCK = {
  project: { name:'XX市智慧政务平台采购项目', code:'ZB-2026-0018', budget:'¥12,800,000', deadline:'2026-09-30', stage:'创作阶段' },
  stats: { projects:12, scoreCoverage:'96%', pendingReview:7, exports:46 },
  tenders: [
    { name:'XX市智慧政务平台采购项目', code:'ZB-2026-0018', status:'写作中', progress:72 },
    { name:'XX区视频监控运维项目', code:'ZB-2026-0012', status:'投标报价', progress:88 },
    { name:'XX省数据中台建设', code:'ZB-2026-0007', status:'招标解析', progress:40 }
  ],
  scorePoints: [
    { id:'2.1-3', name:'架构合理性', score:8, status:'done', type:'技术', section:'2.1' },
    { id:'2.1-4', name:'技术选型先进性', score:5, status:'todo', type:'技术', section:'2.1' },
    { id:'2.1-5', name:'安全合规', score:5, status:'miss', type:'技术', section:'2.2' },
    { id:'3.2-1', name:'实施团队配置', score:6, status:'todo', type:'商务', section:'3.2' }
  ],
  outline: [
    { id:'1', title:'项目概述', words:3200, done:true, children:[] },
    { id:'2', title:'技术方案', words:12800, done:false, children:[
        { id:'2.1', title:'平台总体架构', words:4200, done:true },
        { id:'2.2', title:'核心功能设计', words:5200, done:false } ] },
    { id:'3', title:'项目实施与保障', words:7600, done:false, children:[
        { id:'3.1', title:'实施计划', words:3600, done:false },
        { id:'3.2', title:'团队配置与培训', words:4000, done:false } ] }
  ],
  kbDocs: [
    { title:'同类型项目方案.docx', section:'技术架构章节', conf:92 },
    { title:'公司资质证明.pdf', section:'安全等级保护', conf:88 },
    { title:'政务云部署规范.pdf', section:'部署架构', conf:85 }
  ],
  costs: { 人工:3200000, 材料:2100000, 设备:5600000, 其他:900000 },
  reviewIssues: [
    { type:'完整性', title:'2.2节缺少验收标准', section:'2.2', status:'open' },
    { type:'一致性', title:'术语「平台」与「系统」混用', section:'2.1', status:'open' },
    { type:'格式', title:'表格未编号', section:'3.1', status:'open' },
    { type:'错别字', title:'「资源配置」误写为「资源配值」', section:'2.1', status:'open' },
    { type:'完整性', title:'缺少项目风险分析', section:'3', status:'open' },
    { type:'一致性', title:'报价单位不一致', section:'商务', status:'open' }
  ],
  exportSteps:['生成目录','写入正文','排版校验','打包输出']
};
