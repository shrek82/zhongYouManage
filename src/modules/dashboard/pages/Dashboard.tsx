
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend
} from 'recharts';
import { 
  FileText, DollarSign, Clock, CheckCircle2, AlertTriangle, 
  ArrowUpRight, Activity, Calendar, Zap, ShieldCheck, 
  FileSearch, UserCheck, Timer, TrendingUp, RefreshCw
} from 'lucide-react';

const visitData = [
  { name: '1月', count: 120, sales: 90 }, { name: '2月', count: 150, sales: 110 }, 
  { name: '3月', count: 180, sales: 130 }, { name: '4月', count: 140, sales: 100 }, 
  { name: '5月', count: 210, sales: 160 }, { name: '6月', count: 190, sales: 150 },
];

const healthData = [
  { name: 'GSP合规', value: 95, fill: '#10b981' },
  { name: '履约率', value: 88, fill: '#3b82f6' },
  { name: '审批效能', value: 75, fill: '#f59e0b' },
];

const categoryData = [
  { name: '中药材采购', value: 45 }, { name: '西药分销', value: 30 },
  { name: '医疗器械', value: 15 }, { name: '物流服务', value: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* 顶部标题与快速入口 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            管理控制台
            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] rounded uppercase">Professional</span>
          </h2>
          <p className="text-slate-500 text-xs mt-1">兰州众友健康药业 - 实时合同大数据看板</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                U{i}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
              +12
            </div>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
            <Zap className="w-3.5 h-3.5" />
            智能分析请求
          </button>
        </div>
      </div>

      {/* 第一行：关键指标磁贴 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '本月新增合同', val: '458', icon: FileText, color: 'blue', trend: '+12.5%' },
          { label: '涉及年度金额', val: '¥142.8M', icon: DollarSign, color: 'emerald', trend: '+8.2%' },
          { label: '平均审批周期', val: '1.4 Days', icon: Timer, color: 'amber', trend: '-0.2d' },
          { label: '合规健康度', val: '94.2', icon: ShieldCheck, color: 'indigo', trend: 'Excellent' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div className={`p-2.5 rounded-xl bg-${s.color}-50 text-${s.color}-600`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {s.trend}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</h3>
                <p className="text-2xl font-black text-slate-800 mt-1">{s.val}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 第二行：业务分析模块 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左侧：趋势分析 (7/12) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-black text-slate-800 flex items-center gap-2">
                  合同效能趋势分析
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </h3>
                <p className="text-[11px] text-slate-400">对比采购合共与销售合同的增长曲线</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-[10px] font-bold text-slate-600">采购项</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span className="text-[10px] font-bold text-slate-600">销售项</span>
                </div>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitData}>
                  <defs>
                    <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorBlue)" />
                  <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorGreen)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 快捷操作磁贴 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '合同在线比对', icon: FileSearch, color: 'blue' },
              { label: '对方资质查验', icon: UserCheck, color: 'emerald' },
              { label: 'AI 条款纠错', icon: Zap, color: 'amber' },
              { label: '归档数字化', icon: Activity, color: 'indigo' },
            ].map((btn, i) => (
              <button key={i} className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200/60 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all group">
                <div className={`p-3 rounded-xl bg-${btn.color}-50 text-${btn.color}-600 mb-2 group-hover:scale-110 transition-transform`}>
                  <btn.icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-600">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 右侧：健康度与动态 (5/12) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 合规仪表盘 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <h3 className="font-black text-slate-800 mb-6 flex justify-between items-center">
              合规健康度监控
              <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">实时分值</span>
            </h3>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  innerRadius="30%" 
                  outerRadius="100%" 
                  data={healthData} 
                  startAngle={180} 
                  endAngle={0}
                >
                  <RadialBar background dataKey="value" cornerRadius={10} />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-800">94.2</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Health Score</span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {healthData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-[11px] font-bold text-slate-600">{item.name}</span>
                  </div>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.fill }}></div>
                  </div>
                  <span className="text-[11px] font-black text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 系统实时快讯 - 优化后的浅色专业版 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col h-[340px]">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
              <RefreshCw className="w-32 h-32 text-blue-600" />
            </div>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                全系统实时动态
              </h4>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Live Monitor</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
              {[
                { user: '法务部-李晨', action: '完成了', target: '中药材框架合同', time: '1分钟前', type: 'approve' },
                { user: '采购部-张伟', action: '发起了', target: '供应商资质审查', time: '5分钟前', type: 'create' },
                { user: '智能助手', action: '识别了', target: '3处合规风险点', time: '12分钟前', type: 'ai' },
                { user: '质检中心', action: '更新了', target: '甘肃欣龙资质文件', time: '24分钟前', type: 'update' },
              ].map((news, i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-[3px] before:top-2 before:bottom-[-20px] before:w-[1px] before:bg-slate-100 last:before:hidden">
                  <div className={`absolute left-0 top-1.5 w-2 h-2 rounded-full border-2 border-white ring-1 ${
                    news.type === 'approve' ? 'ring-emerald-400 bg-emerald-400' : 
                    news.type === 'create' ? 'ring-blue-400 bg-blue-400' :
                    news.type === 'ai' ? 'ring-amber-400 bg-amber-400' : 'ring-slate-300 bg-slate-300'
                  }`}></div>
                  <div className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50 group hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all">
                    <div className="text-[11px] leading-relaxed">
                      <span className="font-black text-slate-800">{news.user}</span>
                      <span className="text-slate-500 mx-1">{news.action}</span>
                      <span className={`font-bold ${
                        news.type === 'ai' ? 'text-amber-600' : 'text-blue-600'
                      }`}>{news.target}</span>
                    </div>
                    <p className="text-[9px] text-slate-400 mt-1.5 flex items-center gap-1 font-medium">
                      <Clock className="w-2.5 h-2.5" />
                      {news.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-xl text-[10px] font-bold border border-slate-100 transition-all">
              查看历史动态
            </button>
          </div>
        </div>
      </div>

      {/* 第三行：待办与风险监控 (Bottom Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden text-slate-800">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
             <div>
                <h3 className="font-black text-slate-800">高优先级履约监控</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">涉及金额 &gt; ¥500k 或 剩余天数 &lt; 15天</p>
             </div>
             <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-100">
                  <Calendar className="w-4 h-4 text-slate-400" />
                </button>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">合同标题 / 编号</th>
                  <th className="px-6 py-4">风险级别</th>
                  <th className="px-6 py-4">金额</th>
                  <th className="px-6 py-4">截止倒计时</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { name: '兰州新区医药冷链二期协议', id: 'CT-9902', level: '紧急', amount: '¥2.4M', days: '3天' },
                  { name: '2024甘草提取物采购总包', id: 'CT-8812', level: '预警', amount: '¥0.8M', days: '12天' },
                  { name: '众友健康ERP升级二期', id: 'CT-7741', level: '正常', amount: '¥1.2M', days: '45天' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{row.name}</div>
                      <div className="text-[10px] text-slate-400">{row.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        row.level === '紧急' ? 'bg-red-50 text-red-600' : row.level === '预警' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {row.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-700">{row.amount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div className={`h-full rounded-full ${row.level === '紧急' ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: row.level === '紧急' ? '90%' : '40%' }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{row.days}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:underline font-bold text-xs">催办</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 分类饼图 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col">
          <h3 className="font-black text-slate-800 mb-6">合同板块构成</h3>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value">
                  {categoryData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categoryData.map((item, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-[10px] font-bold text-slate-500 truncate">{item.name}</span>
                </div>
                <div className="text-xs font-black text-slate-800">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
