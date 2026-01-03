type Place = "唐朝厅A" | "唐朝厅B" | "唐朝厅C";
type TimeKey = `${string}-${string}`; // "09:00-09:45" 这种
type SpeakerProfile = {
    name: string;
    identities: string[];
};

type SlotSpeakers = Record<Place, SpeakerProfile>;

const SCHEDULE: Record<TimeKey, Partial<SlotSpeakers>> = {
    "09:00 - 09:45": {
        "唐朝厅A": { name: "乔新亮", identities: [
            "彩食鲜终生荣誉 CTO"
        ]},
        "唐朝厅B": { name: "唐飞虎", identities: [
            "月之暗面高级研发工程师"
        ]},
        "唐朝厅C": { name: "马达", identities: [
            "NVIDIA Principal SW. Eng."
        ]},
    },

    "10:00 - 10:45": {
        "唐朝厅A": { name: "卡兹克", identities: [
            "虚实传媒 CEO"
        ]},
        "唐朝厅B": { name: "郑耀威", identities: [
            "北京航空航天大学博士"
        ]},
        "唐朝厅C": { name: "黄柏特", identities: [
            "字节跳动 AI 产品经理"
        ]},
    },

    "11:00 - 11:45": {
        "唐朝厅A": { name: "李瀚霖", identities: [
            "AI 创业公司运营负责人"
        ]},
        "唐朝厅B": { name: "井晨哲", identities: [
            "面壁智能首席科学家助理、开源负责人"
        ]},
        "唐朝厅C": { name: "安开森", identities: [
            "MemU 首席后端架构师"
        ]},
    },

    "13:30 - 14:15": {
        "唐朝厅A": { name: "侯容", identities: [
            "知乎社区生态 B 端产研负责人"
        ]},
        "唐朝厅B": { name: "陈石", identities: [
            "峰瑞资本投资合伙人"
        ]},
        "唐朝厅C": { name: "黄东敏", identities: [
            "零一万物 B&G 端设计专家"
        ]},
    },

    "14:30 - 15:15": {
        "唐朝厅A": { name: "华剑侃", identities: [
            "快手 CodeFlicker 产品负责人"
        ]},
        "唐朝厅B": { name: "尹伟铭", identities: [
            "AI Agent 开发工程师"
        ]},
        "唐朝厅C": { name: "刘佳奇", identities: [
            "滴滴出行 AI 应用负责人"
        ]},
    },

    "15:30 - 16:15": {
        "唐朝厅A": { name: "蒋宏伟", identities: [
            "愈愈心理创始人"
        ]},
        "唐朝厅B": { name: "李炳峰", identities: [
            "AI 独立开发者"
        ]},
        "唐朝厅C": { name: "李子玄", identities: [
            "智谱 AI Z.ai 负责人"
        ]},
    },

    "16:30 - 17:15": {
        "唐朝厅A": { name: "徐亮亮", identities: [
            "阿里巴巴 Qoder 技术专家"
        ]},
        "唐朝厅B": { name: "陆海倩", identities: [
            "异类 Outliers AIGC 创作者 / 监制"
        ]},
        "唐朝厅C": { name: "廖思聪", identities: [
            "OpenAgents AI 工程师"
        ]},
    },

    "17:30 - 18:15": {
        "唐朝厅A": { name: "刘亚飞", identities: [
            "微博平台架构技术专家"
        ]},
        "唐朝厅B": { name: "丁一", identities: [
            "广告片 / 纪录片导演"
        ]},
        "唐朝厅C": { name: "贾伟", identities: [
            "前智谱 AI 战略生态总监"
        ]},
    },
};

export class SummitTickets
{
    public speakerName = "";
    public speakerIdentities: string[] = [];
    public success: boolean = true;
    public errorMessage: string = "";

    constructor
    (
        public startTime: string,            
        public endTime: string, 
        public summitName: string,                 
        public place: string
    ) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.place = place;
    }

    private matchSpeakerInfo(): void
    {
        const timeKey = `${this.startTime} - ${this.endTime}` as TimeKey;
        const slot = SCHEDULE[timeKey];

        // 时间不存在
        if (!slot) {
            this.speakerName = "未找到任何发言人的相关信息。";
            this.speakerIdentities = [];
        
            return;
        }

        // 地点不存在或不是 A/B/C
        if (this.place !== "唐朝厅A" && this.place !== "唐朝厅B" && this.place !== "唐朝厅C") {
            this.speakerName = "未找到任何发言人的相关信息。";
            this.speakerIdentities = [];
        
            return;
        }

        const profile = slot[this.place as Place];
        if (!profile) {
            this.speakerName = "未找到任何发言人的相关信息。";
            this.speakerIdentities = [];
        
            return;
        }

        this.speakerName = profile.name;
        this.speakerIdentities = profile.identities;
    }

    private summitCheck(): boolean 
    {
        const timeKey = `${this.startTime} - ${this.endTime}` as TimeKey;
        const slot = SCHEDULE[timeKey];

        if (!slot) {
            return false;
        }

        if (this.place !== "唐朝厅A" && this.place !== "唐朝厅B" && this.place !== "唐朝厅C") {
            return false;
        }

        return Boolean(slot[this.place as Place]);
    }

    public resultsReview(): SummitTickets 
    {
        this.speakerName = "";
        this.speakerIdentities = [];

        if (!this.summitCheck()) {
            this.success = false;
            this.errorMessage = "场次信息无效：请检查开始时间/结束时间/地点是否正确。";

            return this;
        }

        this.matchSpeakerInfo();

        if (!this.speakerName || this.speakerName.includes("未找到")) {
            this.success = false;
            this.errorMessage = "已找到场次，但未找到对应的发言人信息（请补全日程表数据）。";
        }

        return this;
    }
}